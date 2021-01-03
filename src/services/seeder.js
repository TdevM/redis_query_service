require('dotenv').config()
const Redis = require('../services/redis')
const csvtojsonV2 = require("csvtojson");
const readStream = require('fs').createReadStream(process.cwd() + '/SegmentData.csv');
const pipeline = Redis.pipeline();

const onError = (error) => {
    console.log('Error writing to database', error)
    process.exit(1)
}

const onComplete = (message) => {
    pipeline.exec((err, results) => {
        if (err) {
            console.log('Error pipelining to redis', err)
            process.exit(1)
        }
        console.log('Seeding complete')
        process.exit(0)
    });

}

csvtojsonV2()
    .fromStream(readStream)
    .subscribe((json) => {
        return new Promise((resolve, reject) => {
            pipeline.hmset(json.user_id, json)
            resolve(json)
            // long operation for each json e.g. transform / write into database.
        })
    }, onError, onComplete).then(r => () => {

}).catch((error) => {
    console.log('Error seeding csv database to redis', error)
    process.exit(1)
})

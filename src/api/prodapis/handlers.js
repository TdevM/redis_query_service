import Redis from '../../services/redis'
import _ from 'lodash'

export const evaluate = async (request, h) => {
    const payload = request.payload
    console.log(payload.expression)
    return 'This thing needs to be evaluated'
}


export const get = async (request, h) => {
    try {
        const record = await Redis.hgetall(request.params.id)
        if (_.isEmpty(record)) {
            return h.response(404).code(404)
        }
        return record
    } catch (e) {
        console.log(e)
        return h.response({status: 'badRequest error'}).code(400)
    }

};


export const patch = async (request, h) => {
    try {
        const user_id = request.params.id
        const record = await Redis.hgetall(user_id)
        if (_.isEmpty(record)) {
            return h.response({status: 'notFound error'}).code(404)
        }
        const updatedRecord = _.merge(record, request.payload);
        await Redis.hmset(user_id, updatedRecord)
        return {status: 'success', message: 'updated'}
    } catch (e) {
        console.log(e)
        return h.response({status: 'badRequest error'}).code(400)
    }
}

export const del = async (request, h) => {
    try {
        await Redis.del(request.params.id)
        return {status: 'success', message: 'deleted'}
    } catch (e) {
        return h.response({status: 'badRequest error'}).code(400)
    }

}

export const post = async (request, h) => {
    try {
        const {user_id} = request.payload
        const record = await Redis.hgetall(user_id)
        if (!_.isEmpty(record)) {
            return {status: 'error', message: 'duplicate insert failed'}
        }
        await Redis.hmset(user_id, request.payload)
        return {status: 'success', message: 'inserted'}
    } catch (e) {
        return h.response({status: 'badRequest error'}).code(400)
    }
}

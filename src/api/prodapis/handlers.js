import Redis from '../../services/redis'
import {getParseTree, processExpression} from '../../services/expressionParser'
import _ from 'lodash'



export const evaluate = async (request, h) => {
    try {
        const payload = request.payload
        // console.log(getParseTree(payload.expression))
        console.log(payload.expression)
        const record = await Redis.get(request.payload.user_id)

        processExpression(payload.expression, JSON.parse(record))
        return 'This thing needs to be evaluated'
    } catch (e) {
        return h.response({status: 'badRequest error', error: e}).code(400)
    }
}


export const get = async (request, h) => {
    try {
        const record = await Redis.get(request.params.id)
        return record ? JSON.parse(record) : h.response(404).code(404)
    } catch (e) {
        return h.response({status: 'badRequest error'}).code(400)
    }

};


export const patch = async (request, h) => {
    try {
        const user_id = request.params.id
        const record = await Redis.get(user_id)
        if (record) {
            const updatedRecord = _.merge(JSON.parse(record), request.payload);
            await Redis.set(user_id, JSON.stringify(updatedRecord))
            return {status: 'success', message: 'updated'}
        } else {
            return h.response({status: 'notFound error'}).code(404)
        }

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
        const record = await Redis.get(user_id)
        if (record) {
            return {status: 'error', message: 'duplicate insert failed'}
        }
        await Redis.set(user_id, JSON.stringify(request.payload))
        return {status: 'success', message: 'inserted'}
    } catch (e) {
        return h.response({status: 'badRequest error'}).code(400)
    }
}

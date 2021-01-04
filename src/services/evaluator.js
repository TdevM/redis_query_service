import jsep from "jsep";
import {parse, eval as evaluate} from 'expression-eval';

const operatorAliases = {
    'AND': '&&',
    'OR': '||',
}

jsep.addBinaryOp("AND", 10);
jsep.addBinaryOp("OR", 10);

const processDataType = (type) => {
    if (type === String('TRUE')) {
        return true
    } else if (type === String('FALSE')) {
        return false
    }
    return parseInt(type) || String(type)
}

const processExpression = (inputString, userRecord) => {
    const tokens = inputString.split(' ')
    const processedTokens = tokens.map((token) => {
        return operatorAliases[token] || processDataType(token)
    })
    return processedTokens.join(' ')
}

export const evaluateQuery = (inputString, userRecord) => {
    return evaluate(jsep(processExpression(inputString, userRecord)), userRecord);
}

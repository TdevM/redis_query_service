const jsep = require("jsep");

import {parse, eval as evaluated} from 'expression-eval';


jsep.addBinaryOp("AND", 10);
jsep.addBinaryOp("OR", 10);
export const getParseTree = (inputString, userRecord) => {
    return evaluated(jsep(processExpression(inputString, userRecord)), {});
}
const operators = {
    'AND': function (a, b) {
        return a && b
    },
    '<': function (a, b) {
        return a < b
    },
    '>': function (a, b) {
        return a > b
    },
    'OR': function (a, b) {
        return a || b
    },
    '==': function (a, b) {
        return a === b
    }
};

const operatorMap = {
    'AND': '&&',
    'OR': '||',
}


const processDataType = (type) => {
    if (type === String('TRUE')) {
        return true
    } else if (type === String('FALSE')) {
        return false
    }
    return parseInt(type) || String(type)
}


export const processExpression = (inputString, userRecord) => {
    const tokens = inputString.split(' ')
    const processedTokens = tokens.map((token) => {
        return (userRecord[token]) ? processDataType(userRecord[token]) : operatorMap[token] || processDataType(token)
    })
    return processedTokens.join(' ')
}

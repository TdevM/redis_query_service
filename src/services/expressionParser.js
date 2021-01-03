const jsep = require("jsep");

jsep.addBinaryOp("AND", 10);
jsep.addBinaryOp("OR", 10);
export const getParseTree = (inputString) => {
    return jsep(inputString);
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
        return (userRecord[token]) ? processDataType(userRecord[token]) : operators[token] || processDataType(token)
    })
    console.log(tokens)
    console.log(processedTokens)
    console.log(userRecord)
    let evaluated = []
    for (let i = 0; i < processedTokens.length; i++) {
        if (typeof processedTokens[i] === "function") {
            evaluated.push(processedTokens[i](processedTokens[i - 1], [i + 1]))
        }
    }
    console.log(evaluated)
}

/**
 * Examples:
 * ============================================
 * 2*3-4/5 = 23*45/-
 * 5+3*2 = 5 3 2*+
 * 10 + 3 * 5 / (16 - 4) = 10 3 5 * 16 4 - / +
 * 2 * 5 + 3 - 2 * (8 / (4 / 2)) + (3 * 3) = 2 5 * 3 + 2 8 4 2 / / * - 3 3 * + 
 */ 

var Infix = (function () {
    var postfix,
        stack;

    var precedence = function (operator) {
        switch (operator) {
            case '*':
            case '/':
                return 3;
            case '+':
            case '-':
                return 2;
            case '(':
                return 1;
        }
    };

    var processOperand = function (char) {
        postfix += char + ' ';
    };

    var processOperator = function (char) {
        while (stack.length > 0 &&
            (precedence(stack[stack.length - 1]) >= precedence(char))) {
            postfix += stack.pop() + ' ';
        }
        stack.push(char);
    };

    var processLeftPar = function (char) {
        stack.push(char);
    };

    var processRightPar = function (char) {
        var j = stack.length - 1,
            ce;
        while (true) {
            ce = stack.pop();
            if (ce == '(') break;

            postfix += ce + ' ';
        }
    };

    var processToken = function (char) {
        var type = Common.determineToken(char);

        switch (type) {
            case Common.tokenType.operand:
                processOperand(char);
                break;
            case Common.tokenType.operator:
                processOperator(char);
                break;
            case Common.tokenType.leftPar:
                processLeftPar(char);
                break;
            case Common.tokenType.rightPar:
                processRightPar(char);
                break;
        }
    };

    var start = function (infix) {
        var tokens = Common.tokenize(infix);
        for (var i = 0; i < tokens.length; i++) {
            processToken(tokens[i]);
        }
        return postfix;
    };

    var toPostfix = function (infix) {
        postfix = '';
        stack = [];
        stack.push('(');
        return start(infix + ')');
    };

    return {
        toPostfix: toPostfix
    }

})();


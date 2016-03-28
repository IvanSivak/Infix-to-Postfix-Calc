var Postfix = (function () {
    var stack = [];
    
    var processOperand = function (char) {
        stack.push(parseFloat(char));
    };

    var processOperator = function (char) {
        var right = (stack.pop()),
            left = (stack.pop());
            
        switch (char) {
            case '+':
                stack.push(left + right);
                break;
            case '-':
                stack.push(left - right);
                break;
            case '*':
                stack.push(left * right);
                break;
            case '/':
                stack.push(left / right);
                break;
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
        }
    };
    
    var calc = function (postfix) {
        var tokens;
        
        stack = [];
        tokens = postfix.split(' ');
        tokens.splice(tokens.length - 1, 1);
        
        for (var i = 0; i < tokens.length; i++) {
            processToken(tokens[i]);
        }
        
        return stack.pop();
    };
    
    return {
        calc: calc
    }
})();
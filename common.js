var Common = (function(){
    
	var tokenType = { operand: 1, operator: 2, leftPar: 3, rightPar: 4 },
        operators = ['+', '-', '*', '/'];
    
    var determineToken = function (char) {
        if (~operators.indexOf(char)) return tokenType.operator;

        switch (char) {
            case '(':
                return tokenType.leftPar;
            case ')':
                return tokenType.rightPar;
            default:
                return tokenType.operand;
        }
    };
    
    var trimSpaces = function (str) {
        return str.replace(/\s+/g, '');
    };
    
    var tokenize = function (str) {
        var num = '',
            res = [];
        
        for (var i = 0; i < str.length; i++){
            switch (Common.determineToken(str[i])) {
                case Common.tokenType.operand:
                    num += $.trim(str[i]);
                    break;
                case Common.tokenType.operator:
                    if ($.isNumeric(num)) res.push(parseFloat(num));
                    res.push(str[i]);
                    num = '';
                    break;
                case Common.tokenType.leftPar:
                case Common.tokenType.rightPar:
                    if ($.isNumeric(num)) res.push(parseFloat(num));
                    res.push(str[i]);
                    num = '';
                    break;
            }
        }
        if (num != '') res.push(num);
        return res;
    }
    
    return {
        tokenType: tokenType,
        determineToken: determineToken,
        trimSpaces: trimSpaces,
        tokenize: tokenize
    }
})();
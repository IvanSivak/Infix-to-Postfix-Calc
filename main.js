$(document).ready(function () {
    $('#btnCalc').click(function () {
        var infix = $('#expression').val(),
            postfix = Infix.toPostfix(infix);
            
        $('#spanPostfix').text(postfix).parent().fadeIn();
        $('#spanResult').text(Postfix.calc(postfix));
    });
});
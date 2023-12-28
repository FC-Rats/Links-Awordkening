$(function () {
    $("#connection-button").click(function () {
        var test = {
            username: $("#username").val(),
            password: $("#password").val(),
        };
        $.ajax({
            url: "../Includes/test.php",
            type: "POST",
            dataType: "JSON",
            data: { test: JSON.stringify(test) },
            success: function (data) {
                if (data.Test) {
                    console.log(data.Test);
                    console.log(data.Test.password);
                    console.log(data.Test.scores[0].score);
                }
            },
            error: function (data) {
                console.log(data);
            },
        });
    });
});

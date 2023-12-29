var username = "";
var birthYear = "";
var email = "";

$(function () {
    $("#modifyProfilButton").on("click", function () {
        fetchDataForm();
        modifyUser();
    });
});

function fetchDataForm() {
    username = $('#pseudo').val();
    birthYear = $('#dateNaissance').val();
    email = $('#mail').val();
}

function modifyUser() {
    $.ajax({
        url: "../Includes/modifyUser.php",
        type: "POST",
        dataType: "JSON",
        data: { "username": username, "birthYear": birthYear, "email": email },
        success: function (data) {
            var result = data.modifyUser;
            console.log(result);
        },
        error: function (data) {
            console.log(data);
        },
    });
    location.reload();
}
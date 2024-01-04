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
            debugger;
            console.log(data);
            if (data.Error) {
                alert(data.Error);
            } else if (data.Success) {
                alert(data.Success);
            } else {
                alert("Une erreur est survenue");
            }
            location.reload();
        },
        error: function (data) {
            console.log(data);
            if (data.Error) {
                alert(data.Error);
            } else if (data.Success) {
                alert(data.Success);
            } else {
                alert("Une erreur est survenue");
            }
            location.reload();
        },
    });
}
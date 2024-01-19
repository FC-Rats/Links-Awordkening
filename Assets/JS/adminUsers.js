var adminUsersTable;

$(function () {
    listDatas();
});

function listDatas() {
    $.ajax({
        url: '../Includes/getAdminListUsers.php',
        type: 'POST',
        dataType: "JSON",
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            listAdminUsers = data.Users;

            $("#UsersTable").dataTable().fnDestroy();
            adminUsersTable = $("#UsersTable").DataTable({
                data: listAdminUsers,
                clientSide: true,
                responsive: true,
                stateSave: true,
                columns: [
                    { data: 'id', render: renderText('id') },
                    { data: 'username', render: renderText('username') },
                    { data: 'birthYear', render: renderText('birthYear') },
                    { data: 'email', render: renderText('email') },
                    { data: 'verified', render: renderText('verified', booleanToText) },
                    { data: 'admin', render: renderText('admin', booleanToText) },
                    { data: 'id', render: renderText('id') } //to change
                ],
                order: [[0, 'asc']],
                dom:
                    '<"row mx-2"' +
                    '<"col-md-2"<"me-3"l>>' +
                    '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
                    '>t' +
                    '<"row mx-2"' +
                    '<"col-sm-12 col-md-6"i>' +
                    '<"col-sm-12 col-md-6"p>' +
                    '>',
                language: {
                    url: "../Assets/json/table.json",
                },
            });
        }
    });
}
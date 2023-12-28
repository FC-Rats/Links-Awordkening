var logsTable;

$(function () {
    listDatas();
});

function listDatas() {
    $.ajax({
        url: '../Includes/getLogs.php',
        type: 'POST',
        dataType: "JSON",
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            listLogs = data.Logs;

            $("#LogsTable").dataTable().fnDestroy();
            logsTable = $("#LogsTable").DataTable({
                data: listLogs,
                clientSide: true,
                responsive: true,
                stateSave: true,
                columns: [
                    { data: 'idUser', render: renderText('idUser') },
                    { data: 'username', render: renderText('username') },
                    { data: 'dateTime', render: renderText('dateTime', formatDate) },
                    { data: 'ip', render: renderText('ip') },
                    { data: 'log', render: renderText('log') }
                ],
                order: [[2, 'desc']],
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
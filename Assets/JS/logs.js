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
                stateSave: false,
                columns: [
                    { data: 'idUser' },
                    { data: 'username' },
                    { data: 'dateTime' },
                    { data: 'ip' },
                    { data: 'log' }
                ],
                columnDefs: [
                    {
                        targets: 0,
                        responsivePriority: 1,
                        data: "idUser",
                        render: function (data, type, row, meta) {
                            var $row_output = '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + row.idUser + '</span></div>';
                            return $row_output;
                        }
                    },
                    {
                        targets: 1,
                        responsivePriority: 1,
                        data: "username",
                        render: function (data, type, row, meta) {
                            var $row_output = '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + row.username + '</span></div>';
                            return $row_output;
                        }
                    },
                    {
                        targets: 2,
                        responsivePriority: 1,
                        data: "dateTime",
                        render: function (data, type, row, meta) {
                            var date = new Date(row.dateTime);
                            var formattedDate = padNumber(date.getDate()) + '/' + padNumber(date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + padNumber(date.getHours()) + ':' + padNumber(date.getMinutes()) + ':' + padNumber(date.getSeconds());
                            var $row_output = '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + formattedDate + '</span></div>';
                            return $row_output;
                        }
                    },
                    {
                        targets: 3,
                        responsivePriority: 1,
                        data: "ip",
                        render: function (data, type, row, meta) {
                            var $row_output = '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + row.ip + '</span></div>';
                            return $row_output;
                        }
                    },
                    {
                        targets: 4,
                        responsivePriority: 1,
                        data: "log",
                        render: function (data, type, row, meta) {
                            var $row_output = '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + row.log + '</span></div>';
                            return $row_output;
                        }
                    }
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

function padNumber(number) {
    return (number < 10 ? '0' : '') + number;
}
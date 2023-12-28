var historyTable;

$(function () {
    listDatas();
});

function listDatas() {
    $.ajax({
        url: '../Includes/getHistory.php',
        type: 'POST',
        dataType: "JSON",
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            listLogs = data.History;

            $("#HistoryTable").dataTable().fnDestroy();
            historyTable = $("#HistoryTable").DataTable({
                data: listLogs,
                clientSide: true,
                responsive: true,
                stateSave: false,
                columns: [
                    { data: 'name' },
                    { data: 'type' },
                    { data: 'dateTime' },
                    { data: 'score' }
                ],
                columnDefs: [
                    {
                        targets: 0,
                        responsivePriority: 1,
                        data: "name",
                        render: function (data, type, row, meta) {
                            var $row_output = '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + row.name + '</span></div>';
                            return $row_output;
                        }
                    },
                    {
                        targets: 1,
                        responsivePriority: 1,
                        data: "type",
                        render: function (data, type, row, meta) {
                            var $row_output = '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + typeGame(row.type) + '</span></div>';
                            return $row_output;
                        }
                    },
                    {
                        targets: 2,
                        responsivePriority: 1,
                        data: "dateTime",
                        render: function (data, type, row, meta) {
                            var $row_output = '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + formatDate(row.dateTime) + '</span></div>';
                            return $row_output;
                        }
                    },
                    {
                        targets: 3,
                        responsivePriority: 1,
                        data: "score",
                        render: function (data, type, row, meta) {
                            var $row_output = '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + row.score + '</span></div>';
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

function typeGame(type) {
    return (type === "SinglePlayer") ? "Solo" : (type === "MultiPlayer") ? "Multi" : "Autre";
}
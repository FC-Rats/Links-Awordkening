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
                stateSave: true,
                columns: [
                    { data: 'name', render: renderText('name') },
                    { data: 'type', render: renderText('type', typeGame) },
                    { data: 'dateTime', render: renderText('dateTime', formatDate) },
                    { data: 'score', render: renderText('score') }
                ],
                order: [[2, 'desc']],
                dom:
                    '<"row mx-2"' +
                    '<"col-12"<"me-3"l>>' +
                    '<"col-12 mb-2"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-2 mb-md-0"fB>>' +
                    '>t' +
                    '<"row mx-2"' +
                    '<"col-12"i>' +
                    '<"col-12"p>' +
                    '>',
                language: {
                    url: "../Assets/json/table.json",
                },
            });
        }
    });
}

function typeGame(type) {
    return (type === "SinglePlayer") ? "Solo" : (type === "MultiPlayer") ? "Multi" : "Erreur";
}
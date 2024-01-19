function formatDate(date) {
    var date = new Date(date);
    var formattedDate = padNumber(date.getDate()) + '/' + padNumber(date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + padNumber(date.getHours()) + ':' + padNumber(date.getMinutes()) + ':' + padNumber(date.getSeconds());
    return formattedDate;
}

function padNumber(number) {
    return (number < 10 ? '0' : '') + number;
}

function booleanToText(boolean) {
    return (boolean == 1 ? 'Oui' : 'Non');
}

function renderText(column, customFormatter = null) {
    return function (data, type, row, meta) {
        var formattedData = (customFormatter) ? customFormatter(row[column]) : row[column];
        return '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + formattedData + '</span></div>';
    };
}

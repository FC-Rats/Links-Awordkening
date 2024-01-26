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

function getAction(idUser, isAdmin) {
    return (isAdmin == 1 ? getUserEmote(idUser) : getLockEmote(idUser));
}

function getUserEmote(idUser) {
    return '<button class="btn btn-sm btn-outline-danger" title="Rétrograder à utilisateur" alt="Rétrograder à utilisateur" onclick="downgradeToUser(' + idUser + ')"><i class="fas fa-user"></i></button>';
}

function getLockEmote(idUser) {
    return '<button class="btn btn-sm btn-outline-danger" title="Passer administrateur" alt="Passer administrateur" onclick="passToAdmin(' + idUser + ')"><i class="fas fa-lock"></i></button>';
}

function renderText(column, customFormatter = null, secondColumn = null) {
    return function (data, type, row, meta) {
        if (secondColumn == 'admin') {
            var formattedData = (customFormatter) ? customFormatter(row[column], row[secondColumn]) : row[column];
        } else {
            var formattedData = (customFormatter) ? customFormatter(row[column]) : row[column];
        }
        return '<div class="d-flex justify-content-start align-items-center"><span class="text-truncate d-flex align-items-center">' + formattedData + '</span></div>';
    };
}

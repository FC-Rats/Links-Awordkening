function formatDate(date) {
    var date = new Date(date);
    var formattedDate = padNumber(date.getDate()) + '/' + padNumber(date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + padNumber(date.getHours()) + ':' + padNumber(date.getMinutes()) + ':' + padNumber(date.getSeconds());
    return formattedDate;
}

function padNumber(number) {
    return (number < 10 ? '0' : '') + number;
}
(function ($window, $document, bs) {

    var socket = bs.socket;
    var canReload = false;

    socket.on('connection', function () {
        if (canReload) {
            canReload = false;
            window.location.reload();
        }
    });
    socket.on('disconnect', function () {
        canReload = true;
    });
/* eslint-disable no-undef */
})(window, document, ___browserSync___);
/* eslint-enable no-undef */

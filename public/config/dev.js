
var origin = function () {
    // IE doesn't have window.location.origin, hence this hack
    if (!window.location.origin) {
        var port = window.location.port ? ':' + window.location.port : '';
        return window.location.protocol + "//" + window.location.hostname + port;
    } else {
        return window.location.origin;
    }
};

collabmedi.constant('REST_URL', {
    hostname: 'http://ec2-54-152-86-123.compute-1.amazonaws.com:3000',
    baseUrl: '/rest/v1/'
});

/**
* timeJump.js
* ©2013 Dave Rupert, daverupert.com
* Dual licenced under MIT and GPL version 2 licenses
*
* If `t` exists as a query string parameter, TimeJump will self-execute and
* select the first `audio` or `video` element and attempt to autoseek to the
* specified timestamp.
*
* @param t {string} Query string parameter. Supported formats include:
*                   ##h##m##s (hours, minutes, seconds)
*                   ##m##s (minutes, seconds)
*                   ##s (seconds)
*                   ##:##:## (hours, minutes, seconds)
*                   ##:## (minutes, seconds)
*                   ## (seconds)
*/
(function () {

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }

    function getSeconds(time) {
        if (time.length === 3) {
            return parseInt(time[0], 10) * 3600 + parseInt(time[1], 10) * 60 + parseInt(time[2], 10);
        } else if (time.length === 2) {
            return parseInt(time[0], 10) * 60 + parseInt(time[1], 10);
        } else {
            return parseInt(time[0], 10);
        }
    }

    var t = getQueryVariable('t') || 0;

    if (t) {
        var timestamp = getSeconds(
            t.toString().replace('/', '').match(/\d+/g));
        var media = document.querySelector('audio, video');
        if ( !! media) {
            media.setAttribute('preload', 'true');
            media.addEventListener('canplay', function () {
                this.currentTime = timestamp;
                this.play();
            }, false);
        }
    }

})();


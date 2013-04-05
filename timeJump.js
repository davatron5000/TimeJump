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

    function getQueryVariable() {
        var regex = /\bt=([\dhHmMsS.:]*)(?:,([\dhHmMsS.:]+))?\b/g,
            match = regex.exec(location.search) || regex.exec(location.hash);

        if (match) return match[1];
        return false;
    }

    /**
     * parseTime(str)
     * @param str A timecode
     * @returns the time in seconds 
     */
    function parseTime(str) {
        var plain = /^\d+$/g,
            npt = /^(?:npt:)?(?:(?:(\d\d?):)?(\d\d?):)?(\d\d?)(.\d+)?$/,
            quirks = /^(?:(\d\d?)[hH])?(?:(\d\d?)[mM])?(\d\d?)[sS]$/,
            match;

        if (plain.test(str)) return ~~str;

        if (match = npt.exec(str) || quirks.exec(str)) {
            return 3600 * ~~match[1] + 60 * ~~match[2] + ~~match[3] + (+match[4] || 0);
        }
        return 0;
    }

    var t = getQueryVariable() || 0;

    if (t) {
        var timestamp = parseTime(t);
        var media = document.querySelector('audio, video');
        if ( !!media) {
            media.setAttribute('preload', 'true');
            media.addEventListener('canplay', function () {
                /* only start the player if it is not already playing */
                if( !this.paused){
                    return;
                }
                this.currentTime = timestamp;
                this.play();
            }, false);
        }
    }

})();

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
/*jslint browser: true*/

(function timeJump() {
    "use strict";
    var getQueryVariable = function() {
        var regex = /\bt=([\dhHmMsS.:]*)(?:,([\dhHmMsS.:]+))?\b/g,
            match = regex.exec(location.hash) || regex.exec(location.search);
        if (match) {
            return match[1];
        }
        return false;
    };

    /**
     * parseTime(str)
     * @param str A timecode
     * @returns the time in seconds
     */
    var parseTime = function(str) {
        var plain = /^\d+(\.\d+)?$/g,
            npt = /^(?:npt:)?(?:(?:(\d+):)?(\d\d?):)?(\d\d?)(\.\d+)?$/,
            quirks = /^(?:(\d\d?)[hH])?(?:(\d\d?)[mM])?(\d\d?)[sS]$/,
            match;
        if (plain.test(str)) {
            return parseFloat(str);
        }
        match = npt.exec(str) || quirks.exec(str);
        if (match) {
            return (3600 * (parseInt(match[1],10) || 0) + 60 * (parseInt(match[2],10) || 0) + parseInt(match[3],10) + (parseFloat(match[4]) || 0));
        }
        return 0;
    };

    var timestamp,
        media,
        t = getQueryVariable() || 0;
    if (t) {
        timestamp = parseTime(t);
        media = document.querySelector('audio, video');
        if (!!media) {
            // Preload the media
            media.setAttribute('preload', 'true');
            // Set the current time. Will update if playing. Will fail if paused.
            media.currentTime = timestamp;
            // If the media is able to play, play.
            media.addEventListener('canplay', function () {
                /* only start the player if it is not already playing */
                if( !this.paused){
                    return false;
                }
                this.currentTime = timestamp;
                this.play();
            }, false);
        }
    }

    if (window.addEventListener) {
        window.addEventListener("DOMContentLoaded", timeJump, false);
        window.addEventListener("hashchange", timeJump, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onload", timeJump);
        window.attachEvent("onhashchange", timeJump);
    }
}());

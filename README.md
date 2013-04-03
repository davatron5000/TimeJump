TimeJump
========

TimeJump adds deep-linking to HTML5 `audio` and `video` podcasts. TimeJump works behind-the-scenes to create a standardized API for seeking, based off the YouTube deep-linking syntax.

## How it works
Include the script at the bottom on your episode pages. It will auto-detect the `t` (time) parameter in your URL and attempt to fast-forward listeners to that timestamp. It usually works.

Supported URL formats include:

        http://mypodca.st/2004/09/first-episode/?t=1h23m45s
        http://mypodca.st/2004/09/first-episode/?t=1m23s
        http://mypodca.st/2004/09/first-episode/?t=1:23

FWIW, the `__h__m__s` format seems to be more tolerant to URL escaping (when Facebook sharing, etc).

Known to work with the following native HTML5 audio/video wrappers:

- [MediaElement.js](http://mediaelementjs.com)
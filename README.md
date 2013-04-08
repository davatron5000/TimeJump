TimeJump
========

TimeJump adds deep-linking to HTML5 `audio` and `video` podcasts. TimeJump works behind-the-scenes to create a standardized API for seeking, based off the YouTube deep-linking syntax.

## How it works
Include the script at the bottom on your episode pages. It will auto-detect the `t` (time) parameter in your URL and attempt to fast-forward listeners to that timestamp. It usually works.

Supported URL formats include:

    Media Fragments w/ hash:
    http://mypodca.st/first-episode/#t=1:23:45
    http://mypodca.st/first-episode/#t=23:45
    http://mypodca.st/first-episode/#t=234

    Media Fragments w/ query:
    http://mypodca.st/first-episode/?t=1:23:45
    http://mypodca.st/first-episode/?t=23:45
    http://mypodca.st/first-episode/?t=234

    Quirks Mode (YouTube-style) w/ hash or query:
    http://mypodca.st/first-episode/?t=1h23m45s
    http://mypodca.st/first-episode/#t=1m23s        

- Hash: Player will update when the browser's `location.hash` changes. This means that your episode page  can link to timeframes within the page without requiring a page reload.
- Query: Requires page reload.

In order to support the [Media Fragments standard](http://www.w3.org/TR/2012/PR-media-frags-20120315/) (and be inter-operable with apps like Instacast), the "Media Fragments w/ hash" format is *now* recommended.

## Plays nice with:
Known to work with the following native HTML5 audio/video wrappers:

- [MediaElement.js](http://mediaelementjs.com)

## TODO List:
- Temporal clipping (Ending times).

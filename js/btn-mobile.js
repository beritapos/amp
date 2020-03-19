"use strict"

let a = document.querySelectorAll('a[href="https://mobirise.com/mobirise-free-win.zip"]'),
    b = document.querySelectorAll('a[href="https://mobirise.com/mobirise-free-mac.zip"]');
let userAgent = navigator.userAgent;
let link = "https://mobirise.com/extensions/kit/?utm_source=mob_bf19_mobile&utm_medium=mobile&utm_campaign=mob_bf19_mobile";

let isChrome = /Chrome/.test(userAgent) && !/OPR/.test(userAgent);
if (userAgent.match(/Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i)) {
    if (a.parentNode == b.parentNode) {
        a.forEach(item => {
            item.remove();
        })
        b.forEach(item => {
            item.setAttribute('href', link)
            item.innerHTML = 'GET STARTED!'
        })
    }
}

/* Show download arrow hint
if (isChrome) {
    a.forEach(item => downloadHint(item));
    b.forEach(item => downloadHint(item));
}
*/

function downloadHint(item) {
    item.addEventListener('click', function () {
        if (document.body.querySelector('.download-hint') == null) {
            setTimeout(_ => {
                let arrow = document.createElement('div');
                arrow.innerHTML = "<div class=\"download-hint\"><div class=\"hint-text\">Click to Start</div> <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 15.98 200\" width=\"30\" height=\"200\"><g><line x1=\"7.99\" x2=\"7.99\" y2=\"175.64\" fill=\"none\" stroke=\"#f36\" stroke-miterlimit=\"10\" stroke-width=\"5\" stroke-dasharray=\"20 20\"></line> <polygon points=\"0 170.19 7.99 200 15.98 170.19 0 170.19\" fill=\"#f36\"></polygon></g></svg></div>"
                document.body.append(arrow);
                let downloadArrow = document.body.querySelector('.download-hint')
                downloadArrow.addEventListener('click', function () {
                    downloadArrow.remove();
                })
            }, 1000);
        }
    })
}
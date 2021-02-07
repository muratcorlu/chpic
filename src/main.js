// var domtoimage = require('dom-to-image');
var { saveAs } = require('file-saver');
var domvas = require('./domvas');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var container = document.getElementById('container');

if (navigator.canShare && navigator.canShare()) {
    container.classList.add('share');
}

document.getElementById('filepicker').addEventListener('change', (el) => {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('preview').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', e.target.result);

        container.classList.remove('step-1');
        container.classList.add('step-2');

        var svg = document.querySelector('svg');
        var data = new XMLSerializer().serializeToString(svg);
        var win = window.URL || window.webkitURL || window;
        var img = new Image();
        var blob = new Blob([data], { type: 'image/svg+xml' });
        var url = win.createObjectURL(blob);
        img.onload = function () {
            console.log(img);

            context.drawImage(img, 0, 0);
            win.revokeObjectURL(url);
            var uri = canvas.toDataURL('image/png');
            document.getElementById('downloadLink').setAttribute('href', uri);
            // var a = document.createElement('a');
            // document.body.appendChild(a);
            // a.style = 'display: none';
            // a.href = uri
            // a.download = 'ch-avatar.png';
            // a.click();
            // window.URL.revokeObjectURL(uri);
            // document.body.removeChild(a);
        };
        img.src = url;
    };

    reader.readAsDataURL(el.target.files[0])
});

document.getElementById('download').addEventListener('click', () => {
    container.classList.remove('step-2');
    container.classList.add('step-3');

    canvas.toBlob(function(blob) {
        saveAs(blob, "ch-avatar.png");
    }, 'image/png');
});


document.getElementById('share').addEventListener('click', () => {
    canvas.toBlob(function(blob) {
        navigator.share({ blob, mimeType: 'image/png'});
    }, 'image/png');
})
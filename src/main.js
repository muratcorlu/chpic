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
        document.getElementById('preview').setAttribute('src', e.target.result);

        container.classList.remove('step-1');
        container.classList.add('step-2');

        domvas.toImage(document.getElementById('preview'), function () {
            context.drawImage(this, 0, 0);

            document.getElementById('result').setAttribute('src', canvas.toDataURL('image/png'));
        });
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
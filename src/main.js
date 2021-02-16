var { saveAs } = require('file-saver');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var container = document.getElementById('container');

if (navigator.canShare && navigator.canShare()) {
    container.classList.add('share');
}

document.getElementById('filepicker').addEventListener('change', (el) => {
    var reader = new FileReader();
    reader.onload = function (e) {

        var img = new Image;

        img.onload = function() {
            console.log(img.width, img.height);

            document.querySelector('.preview').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', e.target.result);

            if (img.width > img.height ) {
                document.querySelector('.preview').setAttribute('width', `${100 * (img.width / img.height)}%`);
            } else {
                document.querySelector('.preview').setAttribute('height', `${100 * (img.height / img.width)}%`);
            }

            container.classList.remove('step-1');
            container.classList.add('step-2');
        };

        img.src = e.target.result; // i


    };

    reader.readAsDataURL(el.target.files[0])
});

document.getElementById('borderFilepicker').addEventListener('change', (el) => {
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = new Image;
        img.onload = function() {
            console.log(img.width, img.height);
            document.querySelector('.borderPreview').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', e.target.result);
            if (img.width > img.height ) {
                document.querySelector('.borderPreview').setAttribute('width', `${100 * (img.width / img.height)}%`);
            } else {
                document.querySelector('.borderPreview').setAttribute('height', `${100 * (img.height / img.width)}%`);
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(el.target.files[0])
});

document.getElementById('borderType').addEventListener('change', (e) => {
    document.querySelectorAll('.borderType').forEach(type => type.classList.toggle('disabled', true));
    switch (e.target.value){
        case 'image':
            document.querySelector('.borderType.image').classList.toggle('disabled', false);
            document.querySelector('.borderPreview').setAttribute('visibility', 'visible');
            document.querySelector('.border').setAttribute('visibility', 'hidden');
            break;
        default:
            document.querySelector('.borderType.colour').classList.toggle('disabled', false);
            document.querySelector('.borderPreview').setAttribute('visibility', 'hidden');
            document.querySelector('.border').setAttribute('visibility', 'visible');
            break;
    }
});

document.getElementById('colorInput').addEventListener('change', (e) => {
    document.querySelector('.border').setAttribute('fill', e.target.value);
});

document.getElementById('borderSizeInput').addEventListener('change', (e) => {
    const borderSize = parseInt(e.target.value);
    const el = document.querySelector('.innerShape');
    const pos = 9300/200*borderSize;
    const size = 9300/200*(200-borderSize*2);
    el.setAttribute('x', pos);
    el.setAttribute('y', pos);
    el.setAttribute('width', size);
    el.setAttribute('height', size);
});

document.getElementById('download').addEventListener('click', () => {
    container.classList.remove('step-2');
    container.classList.add('step-3');

    var svg = document.querySelector('svg');
    var data = new XMLSerializer().serializeToString(svg);
    var win = window.URL || window.webkitURL || window;
    var img = new Image();
    var blob = new Blob([data], { type: 'image/svg+xml' });
    var url = win.createObjectURL(blob);
    img.onload = function () {
        setTimeout(function () {
            context.drawImage(img, 0, 0);

            document.getElementById('result').setAttribute('src', canvas.toDataURL('image/png'));

            canvas.toBlob(function(blob) {
                saveAs(blob, "ch-avatar.png");
            }, 'image/png');

        });
    };
    img.src = url;
});


document.getElementById('share').addEventListener('click', () => {
    canvas.toBlob(function(blob) {
        navigator.share({ blob, mimeType: 'image/png'});
    }, 'image/png');
})

var domtoimage = require('dom-to-image');
var domvas = require('./domvas');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var container = document.getElementById('container');

document.getElementById('filepicker').addEventListener('change', (el) => {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('preview').setAttribute('src', e.target.result);

        container.classList.remove('step-1');
        container.classList.add('step-2');

        domvas.toImage(document.getElementById('preview'), function () {
            context.drawImage(this, 0, 0);
            document.getElementById('download').href = canvas.toDataURL('image/png');
        });


        // domtoimage.toSvg(document.getElementById('preview'))
        //     .then(function (result) {
        //         console.log(result);

        //         document.getElementById('download').href = result;
        //     });
        // var svg = document.querySelector('svg');
        // var data = new XMLSerializer().serializeToString(svg);
        // var win = window.URL || window.webkitURL || window;
        // var img = new Image();
        // var blob = new Blob([data], { type: 'image/svg+xml' });
        // var url = win.createObjectURL(blob);
        // img.onload = function () {
        //     context.drawImage(img, 0, 0);
        //     win.revokeObjectURL(url);
        //     // var uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream');
        //     // var a = document.createElement('a');
        //     // document.body.appendChild(a);
        //     // a.style = 'display: none';
        //     // a.href = uri
        //     // a.download = (svg.id || svg.svg.getAttribute('name') || svg.getAttribute('aria-label') || 'untitled') + '.png';
        //     // a.click();
        //     // window.URL.revokeObjectURL(uri);
        //     // document.body.removeChild(a);
        // };
        // img.src = url;
    };

    reader.readAsDataURL(el.target.files[0])
});

// document.getElementById('download').addEventListener('click', () => {

//     domtoimage.toSvg(document.getElementById('preview'))
//         .then(function (result) {
//             console.log(result);
//             // window.saveAs(result, 'my-ch-avatar.png');
//         })
//         .catch((err) => console.error(err));
// })
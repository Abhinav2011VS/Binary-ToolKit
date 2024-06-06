// File to Binary Conversion
function convertToBinary() {
    const fileInput = document.getElementById('fileInput');
    const binaryOutput = document.getElementById('binaryOutput');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const binaryString = event.target.result;
        binaryOutput.value = textToBinary(binaryString);
    };

    reader.readAsBinaryString(file);
}

function textToBinary(string) {
    return string.split('').map(function(char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
}

// Binary to File Conversion
function convertToOriginal() {
    const binaryFileInput = document.getElementById('binaryFileInput');

    const file = binaryFileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const binaryString = event.target.result;
        const originalData = binaryToText(binaryString);

        const blob = new Blob([originalData]);
        const url = URL.createObjectURL(blob);

        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = url;
        downloadLink.download = file.name.replace('.txt', '');
        downloadLink.click();
        URL.revokeObjectURL(url);
    };

    reader.readAsText(file);
}

function binaryToText(binaryString) {
    const bytes = new Uint8Array(binaryString.length / 8);

    for (let i = 0; i < binaryString.length / 8; i++) {
        bytes[i] = parseInt(binaryString.substr(i * 8, 8), 2);
    }

    return new Blob([bytes]);
}

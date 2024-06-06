// File to Binary Conversion
function convertToBinary() {
    const fileInput = document.getElementById('fileInput');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const binaryData = event.target.result;
        downloadBinaryFile(binaryData, file.name);
    };

    reader.readAsArrayBuffer(file);
}

function downloadBinaryFile(binaryData, fileName) {
    const blob = new Blob([binaryData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${fileName}.bin`;
    downloadLink.click();

    URL.revokeObjectURL(url);
}

// Binary to File Conversion
function convertToOriginal() {
    const binaryFileInput = document.getElementById('binaryFileInput');

    const file = binaryFileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const binaryData = event.target.result;
        downloadOriginalFile(binaryData, file.name);
    };

    reader.readAsText(file);
}

function downloadOriginalFile(binaryData, fileName) {
    const blob = new Blob([binaryData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = fileName.replace('.bin', '');
    downloadLink.click();
    
    URL.revokeObjectURL(url);
}

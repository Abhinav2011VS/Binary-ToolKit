// File to Binary Conversion
function convertToBinary() {
    const fileInput = document.getElementById('fileInput');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const binaryString = event.target.result;
        downloadBinaryFile(binaryString, file.name);
    };

    reader.readAsBinaryString(file);
}

function downloadBinaryFile(binaryString, fileName) {
    const blob = new Blob([binaryString], { type: 'text/plain' });
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
        const binaryString = event.target.result;
        const blob = new Blob([binaryString], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = url;
        downloadLink.download = file.name.replace('.bin', '');
        downloadLink.click();
        
        URL.revokeObjectURL(url);
    };

    reader.readAsText(file);
}

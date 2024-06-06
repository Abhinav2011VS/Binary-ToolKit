// Binary to File Conversion
function convertToOriginal() {
    const binaryFileInput = document.getElementById('binaryFileInput');

    const file = binaryFileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const binaryData = event.target.result;
        const blob = new Blob([binaryData], { type: file.type });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = file.name;
        downloadLink.click();
        
        URL.revokeObjectURL(url);
    };

    reader.readAsArrayBuffer(file);
}

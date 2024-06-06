// Encryption Function
function encodeFile() {
    const fileInput = document.getElementById('fileInput');
    const fileNameInput = document.getElementById('fileNameInput');
    const encodedText = document.getElementById('encodedText');

    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const fileData = event.target.result;
        const fileName = fileNameInput.value || 'file'; // Default file name if not provided
        const encodedData = btoa(fileName + '|' + fileData); // Encoding file name along with data
        encodedText.value = encodedData;
    };

    reader.readAsBinaryString(file);
}

// Download Encoded File Function
function downloadEncodedFile() {
    const encodedText = document.getElementById('encodedText').value.trim();
    if (!encodedText) {
        alert('No encoded text available');
        return;
    }

    const fileName = document.getElementById('fileNameInput').value || 'encoded_file';
    const blob = new Blob([encodedText], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName + '.txt';
    downloadLink.click();
}

// Decryption Function
function decodeFile() {
    const fileInput = document.getElementById('fileInput');
    const fileNameInput = document.getElementById('fileNameInput');
    const downloadLink = document.getElementById('downloadLink');

    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const fileData = event.target.result;
        const fileName = fileNameInput.value || 'decoded_file'; // Default file name if not provided
        const decodedData = atob(fileData);

        const delimiterIndex = decodedData.indexOf('|');
        if (delimiterIndex === -1) {
            alert('Invalid encoded text');
            return;
        }

        const originalFileName = decodedData.substring(0, delimiterIndex);
        const originalFileContent = decodedData.substring(delimiterIndex + 1);

        const blob = new Blob([originalFileContent], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = originalFileName;
        downloadLink.style.display = 'none'; // Hide the download link

        // Simulate a click event on the download link
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        downloadLink.dispatchEvent(clickEvent);
    };

    reader.readAsBinaryString(file);
}

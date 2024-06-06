function encodeFile() {
    const fileInput = document.getElementById('fileInput');
    const customName = document.getElementById('customName').value;
    const encryptionKey = document.getElementById('encryptionKey').value;
    const encodedDataTextarea = document.getElementById('encodedData');

    if (fileInput.files.length === 0) {
        alert('Please select a file to encode.');
        return;
    }

    if (!encryptionKey) {
        alert('Please enter an encryption key.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const fileContent = event.target.result;
        const encodedContent = btoa(fileContent);  // Encode the file content in base64
        const fileInfo = JSON.stringify({ 
            name: customName || file.name,
            type: file.type,
            content: encodedContent
        });
        const encryptedData = CryptoJS.AES.encrypt(fileInfo, encryptionKey).toString();
        encodedDataTextarea.value = encryptedData;  // Display the encrypted data
    };

    if (file.type.startsWith('text/')) {
        reader.readAsText(file);
    } else {
        reader.readAsBinaryString(file);
    }
}

function downloadEncodedFile() {
    const encodedData = document.getElementById('encodedData').value;
    if (!encodedData) {
        alert('No encoded data to download.');
        return;
    }

    const customName = document.getElementById('customName').value || 'encoded_file';
    const blob = new Blob([encodedData], { type: 'text/plain' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = `${customName}.txt`;
    link.click();
}

function decodeFile() {
    const fileInput = document.getElementById('encodedFileInput');
    const encodedTextInput = document.getElementById('encodedTextInput');
    const decryptionKey = document.getElementById('decryptionKey').value;
    let encodedData = '';

    if (!decryptionKey) {
        alert('Please enter a decryption key.');
        return;
    }

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            encodedData = event.target.result;
            decodeAndDownload(encodedData, decryptionKey);
        };

        reader.readAsText(file);
    } else if (encodedTextInput.value.trim() !== '') {
        encodedData = encodedTextInput.value.trim();
        decodeAndDownload(encodedData, decryptionKey);
    } else {
        alert('Please upload an encoded file or paste encoded text.');
    }
}

function decodeAndDownload(encodedData, decryptionKey) {
    try {
        const decryptedData = CryptoJS.AES.decrypt(encodedData, decryptionKey).toString(CryptoJS.enc.Utf8);
        const fileInfo = JSON.parse(decryptedData);
        const fileContent = atob(fileInfo.content);
        const blob = new Blob([fileContent], { type: fileInfo.type });
        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = fileInfo.name;
        link.click();
    } catch (error) {
        alert('Failed to decode the file. Please make sure the encoded data and decryption key are correct.');
    }
}

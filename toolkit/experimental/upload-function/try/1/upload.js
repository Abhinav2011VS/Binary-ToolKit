// Function to handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    const fileStatus = document.getElementById('fileStatus');
    const downloadBtn = document.getElementById('downloadBtn');

    if (file) {
        fileStatus.textContent = `File ${file.name} uploaded`;
        downloadBtn.style.display = 'inline-block';
    } else {
        fileStatus.textContent = '';
        downloadBtn.style.display = 'none';
    }
}

// Function to download binary code
function downloadBinary() {
    const inputText = document.getElementById('input').value;
    const fileName = document.getElementById('fileInput').files[0].name.replace('.txt', '-binary.txt');
    const binaryOutput = convertTextToBinary(inputText);
    const blob = new Blob([binaryOutput], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Function to convert text to binary
function convertTextToBinary(text) {
    let binary = '';
    for (let i = 0; i < text.length; i++) {
        const binaryChar = text[i].charCodeAt(0).toString(2);
        binary += '0'.repeat(8 - binaryChar.length) + binaryChar + ' ';
    }
    return binary.trim();
}

// Function to convert binary to text
function convertBinaryToText(binary) {
    const binaryArray = binary.split(' ');
    let text = '';
    for (let i = 0; i < binaryArray.length; i++) {
        text += String.fromCharCode(parseInt(binaryArray[i], 2));
    }
    return text;
}

// Event listener for file input change
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

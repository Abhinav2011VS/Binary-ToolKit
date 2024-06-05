// Function to handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    const fileStatus = document.getElementById('fileStatus');
    const uploadBtn = document.getElementById('uploadBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (file) {
        fileStatus.textContent = `File ${file.name} uploaded`;
        uploadBtn.textContent = 'Change File';
        downloadBtn.textContent = 'Converting...';
        convertToBinary(file);
    } else {
        fileStatus.textContent = '';
        uploadBtn.textContent = 'Upload File';
        downloadBtn.textContent = 'Download Binary Code';
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
    }
}

// Function to upload file
function uploadFile() {
    window.location.href = 'upload.html'; // Redirect to upload page
}

// Function to convert file content to binary
function convertToBinary(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const binary = convertTextToBinary(event.target.result);
        document.getElementById("output").value = binary.trim();
        document.getElementById('downloadBtn').textContent = 'Download Binary Code';
    };
    reader.readAsText(file);
}

// Function to download binary code
function downloadBinary() {
    const inputText = document.getElementById("input").value.trim();
    const fileName = document.getElementById('fileInput').files[0].name.replace('.txt', '-binary.txt');
    const binaryOutput = document.getElementById("output").value.trim();
    downloadFile(fileName, binaryOutput);
}

// Function to download file
function downloadFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Event listener for file input change
document.getElementById('fileInput').addEventListener('change', handleFileUpload);

// Update character count display
document.getElementById("input").addEventListener("input", function() {
    const inputLength = this.value.length;
    document.getElementById("charCount").textContent = inputLength + "/1000";
});

// Check if the text consists of only 0s, 1s, and spaces
function isBinary(text) {
    return /^[01\s]+$/.test(text);
}

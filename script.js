function convertToBinary() {
    var inputText = document.getElementById("input").value;
    var charSet = document.getElementById("charSet").value;
    var binaryOption = document.getElementById("binaryOption").value;
    var binary = "";
    for (var i = 0; i < inputText.length; i++) {
        if (charSet === "ascii") {
            binary += inputText[i].charCodeAt(0).toString(2) + " ";
        } else if (charSet === "unicode") {
            binary += inputText.charCodeAt(i).toString(2) + " ";
        }
    }
    if (binaryOption === "leadingZeros") {
        binary = binary.replace(/\b(\d+)\b/g, match => {
            return '00000000'.slice(String(match).length) + match;
        });
    } else if (binaryOption === "asciiCodes" || binaryOption === "unicodeCodes") {
        binary = binary.replace(/\d+/g, match => {
            return parseInt(match, 2) + " ";
        });
    }
    document.getElementById("output").value = binary.trim();
}

function convertFromBinary() {
    var binaryText = document.getElementById("input").value.trim();
    var binaryArray = binaryText.split(" ");
    var charSet = document.getElementById("charSet").value;
    var text = "";
    for (var i = 0; i < binaryArray.length; i++) {
        if (binaryArray[i] !== "") {
            if (charSet === "ascii") {
                text += String.fromCharCode(parseInt(binaryArray[i], 2));
            } else if (charSet === "unicode") {
                text += String.fromCharCode(parseInt(binaryArray[i], 2));
            }
        }
    }
    document.getElementById("output").value = text;
}

function downloadFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function downloadSource() {
    var inputText = document.getElementById("input").value.trim();
    var outputText = document.getElementById("output").value.trim();

    if (inputText && !isBinary(inputText)) {
        downloadFile("source.txt", inputText);
    } else if (outputText && !isBinary(outputText)) {
        downloadFile("source.txt", outputText);
    } else {
        alert("No source code available to download.");
    }
}

function downloadBinary() {
    var inputText = document.getElementById("input").value.trim();
    var outputText = document.getElementById("output").value.trim();

    if (inputText && isBinary(inputText)) {
        downloadFile("binary.txt", inputText);
    } else if (outputText && isBinary(outputText)) {
        downloadFile("binary.txt", outputText);
    } else {
        alert("No binary code available to download.");
    }
}

function isBinary(text) {
    // Check if the text consists of only 0s, 1s, and spaces
    return /^[01\s]+$/.test(text);
}

function copyOutput() {
    var outputTextarea = document.getElementById("output");
    outputTextarea.select();
    document.execCommand("copy");
    alert("Output copied to clipboard");
}

function clearFields() {
    document.getElementById("input").value = "";
    document.getElementById("output").value = "";
}

// Update character count display
document.getElementById("input").addEventListener("input", function() {
    var inputLength = this.value.length;
    document.getElementById("charCount").textContent = inputLength + "/1000";
});

function goToLengthsPage() {
    window.location.href = '/lengths';
}

function goToHomePage() {
    window.location.href = '/';
}

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

// Update event listener for the context menu to prevent it from showing inside textarea
document.addEventListener("contextmenu", function (e) {
    if (!e.target.matches("textarea")) {
        e.preventDefault();
        showPopup("Right Click is disabled");
    }
});

function showPopup(message) {
    var popupContainer = document.getElementById("popup-container");
    var popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = message;
    popupContainer.style.display = "block";
    // Fade out after 1 second
    setTimeout(function () {
        popupContainer.style.opacity = 0;
        setTimeout(function () {
            popupContainer.style.display = "none";
            popupContainer.style.opacity = 1;
        }, 1000);
    }, 2000);
}

// Function to handle right-click on input textarea
document.getElementById("input").addEventListener("contextmenu", function (e) {
    e.preventDefault(); // Prevent default right-click behavior
    var menu = document.getElementById("custom-menu-input");
    menu.style.top = e.clientY + "px"; // Set menu position
    menu.style.left = e.clientX + "px";
    menu.style.display = "block"; // Display the custom menu
});

// Function to handle right-click on output textarea
document.getElementById("output").addEventListener("contextmenu", function (e) {
    e.preventDefault(); // Prevent default right-click behavior
    var menu = document.getElementById("custom-menu-output");
    menu.style.top = e.clientY + "px"; // Set menu position
    menu.style.left = e.clientX + "px";
    menu.style.display = "block"; // Display the custom menu
});

// Function to hide the custom menu for input textarea
document.addEventListener("click", function (e) {
    var menuInput = document.getElementById("custom-menu-input");
    if (!menuInput.contains(e.target)) {
        menuInput.style.display = "none";
    }
});

// Function to hide the custom menu for output textarea
document.addEventListener("click", function (e) {
    var menuOutput = document.getElementById("custom-menu-output");
    if (!menuOutput.contains(e.target)) {
        menuOutput.style.display = "none";
    }
});

// Function to copy selected text
function copyText() {
    var textarea = document.getElementById("input");
    textarea.select();
    document.execCommand("copy");
}

// Add the paste functionality using clipboard API
function pasteText() {
    navigator.clipboard.readText().then(text => {
        document.getElementById("input").value = text;
    }).catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
}

// Function to cut selected text
function cutText() {
    var textarea = document.getElementById("input");
    textarea.select();
    document.execCommand("cut");
}

// Function to select all text
function selectAllText() {
    var textarea = document.getElementById("input");
    textarea.select();
}

// Function to select all text for output
function selectAllOutput() {
    var textarea = document.getElementById("output");
    textarea.select();
}

// Disable right-click context menu for the entire document except the text area
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    showPopup("Right Click is disabled");
});

// Disable Ctrl+U, F12, and Fn+F12
document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey && e.key === "u") || e.key === "F12" || (e.key === "F12" && e.key === "Control")) {
        e.preventDefault();
        showPopup("Inspection or viewing source is disabled.");
    }
});

function goToLengthsPage() {
    window.location.href = '/lengths';
}


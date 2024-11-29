// Update character count display
document.getElementById("input").addEventListener("input", function() {
    var inputLength = this.value.length;
    document.getElementById("charCount").textContent = inputLength + "/5000000000"; 
});
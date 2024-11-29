import os

# List of character lengths to create folders for
lengths = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 
           100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000, 
           20000000, 50000000, 100000000, 200000000, 500000000, 1000000000, 
           2000000000, 5000000000, 10000000000]

# Template for the JavaScript file (amount.js)
js_template = """// Update character count display
document.getElementById("input").addEventListener("input", function() {
    var inputLength = this.value.length;
    document.getElementById("charCount").textContent = inputLength + "/{length}"; 
});"""

# Function to create a folder and write the necessary JavaScript file using concatenation
def create_js_file(folder_name):
    # Create the directory if it doesn't exist
    os.makedirs(folder_name, exist_ok=True)

    # Write the amount.js file using string concatenation
    js_content = js_template.replace("{length}", folder_name)
    with open(os.path.join(folder_name, 'amount.js'), 'w') as js_file:
        js_file.write(js_content)

# Main function to iterate over the lengths and generate the JavaScript files
def generate_js_files():
    for length in lengths:
        create_js_file(str(length))

if __name__ == "__main__":
    generate_js_files()
    print("JavaScript files generated successfully.")

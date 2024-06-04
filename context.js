const contextMenu = document.querySelector(".wrapper"),
      editMenu = contextMenu.querySelector(".edit-menu");

window.addEventListener("contextmenu", e => {
    e.preventDefault();
    let x = e.offsetX,
        y = e.offsetY,
        containerWidth = e.target.offsetWidth,
        containerHeight = e.target.offsetHeight,
        cmWidth = contextMenu.offsetWidth,
        cmHeight = contextMenu.offsetHeight;

    // Adjust x position based on container width
    if (x > containerWidth - cmWidth) {
        x = containerWidth - cmWidth;
    }

    // Adjust y position based on container height
    if (y > containerHeight - cmHeight) {
        y = containerHeight - cmHeight;
    }

    // Adjust edit menu position based on context menu position
    const editMenuWidth = editMenu.offsetWidth;
    if (x + cmWidth + editMenuWidth > containerWidth) {
        editMenu.style.left = "-200px"; // Position on the left
    } else {
        editMenu.style.left = ""; // Position on the right
        editMenu.style.right = "-200px";
    }

    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.visibility = "visible";
});

document.addEventListener("click", () => contextMenu.style.visibility = "hidden");

const contextMenu = document.querySelector(".wrapper"),
editMenu = contextMenu.querySelector(".edit-menu");
window.addEventListener("contextmenu", e => {
    e.preventDefault();
    let x = e.offsetX, y = e.offsetY,
    winWidth = window.innerWidth,
    winHeight = window.innerHeight,
    cmWidth = contextMenu.offsetWidth,
    cmHeight = contextMenu.offsetHeight;
    if(x > (winWidth - cmWidth - editMenu.offsetWidth)) {
        editMenu.style.left = "-200px";
    } else {
        editMenu.style.left = "";
        editMenu.style.right = "-200px";
    }
    x = x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y;
    
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.visibility = "visible";
});
document.addEventListener("click", () => contextMenu.style.visibility = "hidden");

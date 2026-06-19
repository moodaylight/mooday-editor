fontBtn.onclick = ()=>{

    fontPanel.style.display =
    "flex";

    colorPanel.style.display =
    "none";

    sizePanel.style.display =
    "none";

    strokePanel.style.display =
    "none";

    shadowPanel.style.display =
    "none";

    opacityPanel.style.display =
    "none";

};
colorBtn.onclick = ()=>{

    colorPanel.style.display =
    "flex";

    fontPanel.style.display =
    "none";

    sizePanel.style.display =
    "none";

    strokePanel.style.display =
    "none";

    shadowPanel.style.display =
    "none";

    opacityPanel.style.display =
    "none";

};
sizeBtn.onclick = ()=>{

    sizePanel.style.display =
    "flex";

    fontPanel.style.display =
    "none";

    colorPanel.style.display =
    "none";

    strokePanel.style.display =
    "none";

    shadowPanel.style.display =
    "none";

    opacityPanel.style.display =
    "none";

    if(selectedText){

        sizeValue.innerText =
        selectedText.size || 28;

    }

};
sizeMinus.onclick = ()=>{

    if(!selectedText) return;

    selectedText.size =
    Math.max(
        8,
        (selectedText.size || 28) - 2
    );

    sizeValue.innerText =
    selectedText.size;

    draw();

};

sizePlus.onclick = ()=>{

    if(!selectedText) return;

    const oldSize =
    selectedText.size || 28;

    selectedText.size =
    oldSize + 2;

    const box =
    getTextBounds(selectedText);

    const LIMIT = 10;

    if(

        box.left < exportVisibleX + LIMIT ||

        box.right >
        exportVisibleX +
        exportVisibleW -
        LIMIT ||

        box.top < exportVisibleY + LIMIT ||

        box.bottom >
        exportVisibleY +
        exportVisibleH -
        LIMIT

    ){

        // 超出边界
        selectedText.size =
        oldSize;

    }

    sizeValue.innerText =
    selectedText.size;

    draw();

};
strokeBtn.onclick = ()=>{

    strokePanel.style.display =
    "flex";

    shadowPanel.style.display =
    "none";

    opacityPanel.style.display =
    "none";

    fontPanel.style.display =
    "none";

    colorPanel.style.display =
    "none";

    sizePanel.style.display =
    "none";

};

strokeOff.onclick = ()=>{

    if(!selectedText) return;

    selectedText.stroke = false;

    draw();

};

strokeOn.onclick = ()=>{

    if(!selectedText) return;

    selectedText.stroke = true;

    draw();

};

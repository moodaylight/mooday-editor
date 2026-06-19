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

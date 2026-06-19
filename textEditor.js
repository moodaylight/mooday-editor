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
shadowBtn.onclick = ()=>{

    shadowPanel.style.display =
    "flex";

    opacityPanel.style.display =
    "none";

    strokePanel.style.display =
    "none";

    fontPanel.style.display =
    "none";

    colorPanel.style.display =
    "none";

    sizePanel.style.display =
    "none";

};

shadowOff.onclick = ()=>{

    if(!selectedText) return;

    selectedText.shadow = false;

    draw();

};

shadowOn.onclick = ()=>{

    if(!selectedText) return;

    selectedText.shadow = true;

    draw();

};
editorInput.addEventListener(
"input",
()=>{

    if(selectedText){

        selectedText.content =
        editorInput.value;

        draw();

    }

}
);
document
.querySelectorAll(
".fontItem"
)
.forEach(btn=>{

    btn.onclick = ()=>{

        if(selectedText){

            selectedText.font =
            btn.dataset.font;

            draw();

        }

    };

});
document
.querySelectorAll(
".colorDot"
)
.forEach(dot=>{

dot.onclick = ()=>{

    if(selectedText){

        selectedText.color =
        dot.dataset.color;

        draw();

    }

};

});
sizePlus.onmousedown = ()=>{

    clearInterval(sizeTimer);

    sizeTimer = setInterval(()=>{

        sizePlus.onclick();

    },150);

};

sizePlus.onmouseup = ()=>{

    clearInterval(sizeTimer);

};

sizePlus.onmouseleave = ()=>{

    clearInterval(sizeTimer);

};

// 缩小

sizeMinus.onmousedown = ()=>{

    clearInterval(sizeTimer);

    sizeTimer = setInterval(()=>{

        sizeMinus.onclick();

    },150);

};

sizeMinus.onmouseup = ()=>{

    clearInterval(sizeTimer);

};

sizeMinus.onmouseleave = ()=>{

    clearInterval(sizeTimer);

};

// 手机长按

sizePlus.ontouchstart = ()=>{

    clearInterval(sizeTimer);

    sizeTimer = setInterval(()=>{

        sizePlus.onclick();

    },150);

};

sizePlus.ontouchend = ()=>{

    clearInterval(sizeTimer);

};

sizeMinus.ontouchstart = ()=>{

    clearInterval(sizeTimer);

    sizeTimer = setInterval(()=>{

        sizeMinus.onclick();

    },150);

};

sizeMinus.ontouchend = ()=>{

    clearInterval(sizeTimer);

};

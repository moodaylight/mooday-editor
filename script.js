
// script.js
// 主入口文件
// 初始化
// 启动编辑器
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const uploadBtn =
document.getElementById("uploadBtn");

const lightModeBtn =
document.getElementById("lightModeBtn");
const photoBtn =
document.getElementById("photoBtn");
const mirrorBtn =
document.getElementById("mirrorBtn");
const frameBtn =
document.getElementById("frameBtn");
const previewBtn =
document.getElementById("previewBtn");
const moodBtn =
document.getElementById("moodBtn");
const submitBtn =
document.getElementById("submitBtn");
const posterBtn =
document.getElementById("posterBtn");
const textBtn =
document.getElementById("textBtn");

const backgroundBtn =
document.getElementById("backgroundBtn");

const clarityBtn =
document.getElementById("clarityBtn");

const templateDrawer =
document.getElementById(
"templateDrawer"
);
const templateItem0 =
document.getElementById(
"templateItem0"
);

const templateItem1 =
document.getElementById(
"templateItem1"
);

const templateItem2 =
document.getElementById(
"templateItem2"
);
const templateItem3 =
document.getElementById(
"templateItem3"
);

const templateItem4 =
document.getElementById(
"templateItem4"
);
const textEditorPanel =
document.getElementById(
"textEditorPanel"
);

const editorInput =
document.getElementById(
"editorInput"
);
const menuTitle =
document.getElementById(
"menuTitle"
);
const fontBtn =
document.getElementById(
"fontBtn"
);

const colorBtn =
document.getElementById(
"colorBtn"
);
const fontPanel =
document.getElementById(
"fontPanel"
);
const colorPanel =
document.getElementById(
"colorPanel"
);

const sizeBtn =
document.getElementById(
"sizeBtn"
);

const sizePanel =
document.getElementById(
"sizePanel"
);

const sizeMinus =
document.getElementById(
"sizeMinus"
);

const sizePlus =
document.getElementById(
"sizePlus"
);

const sizeValue =
document.getElementById(
"sizeValue"
);
const strokeBtn =
document.getElementById(
"strokeBtn"
);

const strokePanel =
document.getElementById(
"strokePanel"
);

const strokeOff =
document.getElementById(
"strokeOff"
);

const strokeOn =
document.getElementById(
"strokeOn"
);

const shadowOff =
document.getElementById(
"shadowOff"
);

const shadowOn =
document.getElementById(
"shadowOn"
);

const shadowPanel =
document.getElementById(
"shadowPanel"
);

const opacityPanel =
document.getElementById(
"opacityPanel"
);

const opacityMinus =
document.getElementById(
"opacityMinus"
);

const opacityPlus =
document.getElementById(
"opacityPlus"
);

const opacityValue =
document.getElementById(
"opacityValue"
);


let lastTapText = null;
// =====================
// IMAGE MODULE START
// =====================
image.onload = function(){

    // =====================
    // 可视区域真实尺寸
    // =====================

let frameWidth;
let frameHeight;

let visibleWidth;
let visibleHeight;

if(productType === "mirror"){

    frameWidth = 12;
    frameHeight = 17.5;

    visibleWidth = 9.8;
    visibleHeight = 15.3;

}

if(productType === "photo"){

    frameWidth = 4;
    frameHeight = 6;

    visibleWidth = 4;
    visibleHeight = 6;

}

    const marginX = 20;

    // =====================
    // 外框尺寸
    // =====================

    const outerW =
    canvas.width - marginX * 2;

    const outerH =
    canvas.height - marginX * 2;
    // =====================
    // 可视区域比例
    // =====================

    const visibleRatioX =
    visibleWidth / frameWidth;

    const visibleRatioY =
    visibleHeight / frameHeight;

    const visibleW =
    outerW * visibleRatioX;

    const visibleH =
    outerH * visibleRatioY;

    // =====================
    // Cover算法
    // =====================

fitImageCover();

// 自动居中

imgX = canvas.width / 2;

imgY =
canvas.height / 2;

draw();

}
// =====================
// IMAGE MODULE END
// =====================
 // 文字

let texts = [];
let decorations = [];
let decoIndex = 0;

const decoList = [

    "☀",

    "🌼",

    "♥",

    "✨",

    "✦"

];
let selectedTextIndex = -1;
let selectedText = null;

let titleText = null;
let subTitleText = null;
let thirdText = null;

let leftBottomText = null;
let rightSubText = null;
// 当前是否选中图片



let productType = "photo";
let lightMode = 0;
let moodMode = 0;
let templateCategory = 0;
let templateMode = false;

let familyTemplateIndex = 0;

if(lightModeBtn){

    lightModeBtn.innerText =
    "조명모드";

}
let draggingText = false;
let draggingImage = false;
let longPressTimer;
let dragOffsetX = 0;
let dragOffsetY = 0;
let textOffsetX = 0;
let textOffsetY = 0;

// 双指状态

let initialPinchDistance = 0;
let initialRotationAngle = 0;

let initialTextSize = 0;
let initialTextRotation = 0;


// =====================
// CANVAS RESIZE START
// =====================
resizeCanvas();

window.addEventListener("resize", resizeCanvas);
// =====================
// CANVAS RESIZE END
// =====================

// =====================
// 是否点中文字
// =====================

function pointInText(text,x,y){

    const box = getTextBounds(text);

    return (

        x >= box.left &&
        x <= box.right &&
        y >= box.top &&
        y <= box.bottom

    );

}

// =====================
// 获取顶部文字
// =====================

function getTopText(x,y){

    for(let i = texts.length - 1; i >= 0; i--){

 if(pointInText(texts[i],x,y)){

    selectedTextIndex = i;

    return texts[i];

}       

    }

    return null;

}

// =====================
// 双指距离
// =====================

function getDistance(t1,t2){

    const dx = t2.clientX - t1.clientX;

    const dy = t2.clientY - t1.clientY;

    return Math.sqrt(dx * dx + dy * dy);

}

// =====================
// 双指角度
// =====================

function getAngle(t1,t2){

    return Math.atan2(

        t2.clientY - t1.clientY,

        t2.clientX - t1.clientX

    ) * 180 / Math.PI;

}

// =====================
// 图层面板
// =====================



// =====================
// 上传图片
// =====================
uploadBtn.onclick = ()=>{

    upload.click();

};
// =====================
// IMAGE UPLOAD START
// =====================
upload.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

reader.onload = function(event){

    image = new Image();

    originalImage = image;

image.onload = function(){

    fitImageCover();

    resetImagePosition();

    imgRotation = 0;

    imageSelected = true;

    selectedText = null;

    draw();

};

        image.src = event.target.result;

    };

    reader.readAsDataURL(file);

});

// =====================
// IMAGE UPLOAD END
// =====================

if(frameBtn){



}


draw();





previewBtn.onclick = ()=>{

    draw();

    const link =
    document.createElement("a");

    link.download =
    "4x6-photo.jpg";

    link.href =
    canvas.toDataURL(
        "image/jpeg",
        1.0
    );

    link.click();

};


let templateLongPressTimer;
let templateLongPressed = false;
moodBtn.onclick = ()=>{

    moodMode++;

    if(moodMode > 4){

        moodMode = 0;

    }

   const moods = [

    "원본",

    "따뜻한 기억",

    "영화 같은 순간",

    "고요한 일상",

    "여행 기록"

];

    moodBtn.innerText =
    moods[moodMode];

    draw();

};



document.addEventListener(
"contextmenu",
(e)=>{

    e.preventDefault();

}
);



document.addEventListener(
"touchstart",
(e)=>{

    if(
        !templateDrawer.contains(
            e.target
        )
        &&
       e.target !== textBtn
    ){

        templateDrawer.classList.remove(
            "show"
        );

    }

}
);
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
opacityBtn.onclick = ()=>{

    opacityPanel.style.display =
    "flex";

    shadowPanel.style.display =
    "none";

    strokePanel.style.display =
    "none";

    fontPanel.style.display =
    "none";

    colorPanel.style.display =
    "none";

    sizePanel.style.display =
    "none";

    if(selectedText){

        opacityValue.innerText =
        Math.round(
            (selectedText.opacity ?? 1)
            * 100
        );

    }

};

opacityMinus.onclick = ()=>{

    if(!selectedText) return;

    selectedText.opacity =
    Math.max(
        0,
        (selectedText.opacity ?? 1) - 0.1
    );

    opacityValue.innerText =
    Math.round(
        selectedText.opacity * 100
    );

    draw();

};

opacityPlus.onclick = ()=>{

    if(!selectedText) return;

    selectedText.opacity =
    Math.min(
        1,
        (selectedText.opacity ?? 1) + 0.1
    );

    opacityValue.innerText =
    Math.round(
        selectedText.opacity * 100
    );

    draw();

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
// 长按连续缩小放大

let sizeTimer = null;

// 放大

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
const bannerImg =
document.getElementById("bannerImg");

const bannerTitle =
document.getElementById("bannerTitle");

const bannerDesc =
document.getElementById("bannerDesc");

const banners = [

{
img:"banner1.jpg",
title:"MOODAY 魔镜灯光画",
desc:"珍藏每一个重要时刻"
},

{
img:"banner2.jpg",
title:"桌面灯光画",
desc:"陪伴每一天"
},

{
img:"banner3.jpg",
title:"韩系相框照片",
desc:"成长只有一次"
},

{
img:"banner4.jpg",
title:"证件照打印",
desc:"简单快速专业"
}

];

let bannerIndex = 0;

setInterval(()=>{

bannerIndex++;

if(
bannerIndex >= banners.length
){
bannerIndex = 0;
}

bannerImg.src =
banners[bannerIndex].img;

bannerTitle.innerText =
banners[bannerIndex].title;

bannerDesc.innerText =
banners[bannerIndex].desc;

},4000);
let currentProduct = null;


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
backgroundBtn.onclick = ()=>{

    if(
        currentBackground ===
        "white"
    ){

        currentBackground =
        "blue";

    }

    else if(
        currentBackground ===
        "blue"
    ){

        currentBackground =
        "red";

    }

    else{

        currentBackground =
        "white";

    }

    draw();

};
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
/*

*/
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


// =====================
// 双指距离
// =====================



// =====================
// 双指角度
// =====================





if(frameBtn){



}


draw();

let templateLongPressTimer;
let templateLongPressed = false;

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

let sizeTimer = null;

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


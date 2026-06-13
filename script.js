
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
const buttonMap = {

    upload:"업로드",

    clarity:"선명도",

    mood:"분위기",

    frame:"프레임",

    text:"문자",

    background:"배경",

    poster:"포스터",

    light:"조명",

    preview:"미리보기",

    submit:"주문하기"

};
function updateButtons(){

    if(!currentConfig) return;

    moodBtn.innerText =
    buttonMap[
        currentConfig.buttons[2]
    ] || "-";

}
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

const familyTemplates = [

{
title:"우리 집",

leftTitle:"사랑이 머무는 곳",

leftDesc:"가족과 함께하는\n따뜻한 시간",

rightTitle:"행복은\n함께하는 순간",

rightDesc:"우리의 이야기는\n계속 이어집니다"
},

{
title:"따뜻한 시간",

leftTitle:"소중한 하루",

leftDesc:"언제나 곁에 있는\n가족의 사랑",

rightTitle:"웃음 가득한\n우리 집",

rightDesc:"평범한 오늘도\n특별한 추억"
},

{
title:"함께",

leftTitle:"같은 공간",

leftDesc:"같은 마음으로\n함께 걸어가요",

rightTitle:"가족이라는\n이름 아래",

rightDesc:"모든 순간이\n행복입니다"
},

{
title:"행복한 순간",

leftTitle:"오늘의 웃음",

leftDesc:"가장 아름다운\n기억이 됩니다",

rightTitle:"소중한 사람들",

rightDesc:"늘 함께여서\n감사합니다"
},

{
title:"우리의 이야기",

leftTitle:"사랑으로 채운",

leftDesc:"우리 가족의\n소중한 기록",

rightTitle:"따뜻한 기억",

rightDesc:"언제나 마음속에\n남아있어요"
}

];
const coupleTemplates = [

{
title:"우리",

leftTitle:"너와 나",

leftDesc:"함께라서 더욱\n특별한 시간",

rightTitle:"사랑은\n매일 자라나",

rightDesc:"당신과 함께라면\n언제나 행복해"
},

{
title:"사랑",

leftTitle:"마음을 담아",

leftDesc:"작은 순간들도\n소중한 기억",

rightTitle:"우리의 이야기",

rightDesc:"오늘도 사랑하고\n내일도 사랑해"
},

{
title:"동행",

leftTitle:"같은 길을",

leftDesc:"함께 걷는다는 건\n참 행복한 일",

rightTitle:"언제나 곁에",

rightDesc:"서로의 힘이 되어\n함께 나아가요"
},

{
title:"함께",

leftTitle:"가장 좋은 순간",

leftDesc:"당신과 함께한\n모든 시간",

rightTitle:"소중한 기억",

rightDesc:"우리의 하루가\n추억이 됩니다"
},

{
title:"소중한 순간",

leftTitle:"기억하고 싶은",

leftDesc:"오늘의 설렘을\n오래 간직해요",

rightTitle:"영원히",

rightDesc:"우리의 이야기는\n계속됩니다"
}

];
const babyTemplates = [

{
title:"햇살 가득한\n추억 한 장",

leftTitle:"성장은\n단 한 번뿐이야.",

leftDesc:"지금 이 순간을\n오래도록 기억해요",

rightTitle:"모든 순간이\n너의 빛나는\n미래로 이어질 거야.",

rightDesc:"오늘도, 내일도\n사랑해"
},

{
title:"작은 손에 담긴\n큰 행복",

leftTitle:"웃음은\n가장 예쁜 선물",

leftDesc:"매일매일 새로운\n기적이 자라나요",

rightTitle:"너의 하루하루가\n소중한 추억이 돼",

rightDesc:"언제나 널 응원해"
},

{
title:"반짝이는\n우리의 시간",

leftTitle:"오늘의 미소가\n내일의 힘이 돼",

leftDesc:"세상에서 가장\n빛나는 순간",

rightTitle:"사랑으로 자라는\n작은 이야기",

rightDesc:"항상 행복하길"
},

{
title:"사랑으로 채운\n성장 일기",

leftTitle:"지금 이 모습도\n소중한 선물",

leftDesc:"한 걸음 한 걸음\n함께 걸어가요",

rightTitle:"모든 순간이\n특별한 기억이야",

rightDesc:"언제까지나 사랑해"
},

{
title:"눈부신 오늘,\n빛나는 내일",

leftTitle:"작은 꿈이\n큰 희망이 돼",

leftDesc:"너의 미래를\n응원할게",

rightTitle:"행복한 기억들이\n가득 쌓여가길",

rightDesc:"오늘도 사랑해"
}

];

const birthdayTemplates = [

{
title:"생일",

leftTitle:"오늘은 특별한 날",

leftDesc:"행복이 가득한\n하루가 되길",

rightTitle:"축하해",

rightDesc:"웃음이 가득한\n생일 보내세요"
},

{
title:"축하",

leftTitle:"진심을 담아",

leftDesc:"소중한 당신에게\n전하는 마음",

rightTitle:"행복한 하루",

rightDesc:"좋은 일만 가득하길"
},

{
title:"소원",

leftTitle:"마음속 깊이",

leftDesc:"간직한 꿈들이\n이루어지길",

rightTitle:"빛나는 미래",

rightDesc:"언제나 응원할게요"
},

{
title:"행복",

leftTitle:"웃음 가득",

leftDesc:"오늘의 기쁨이\n오래 이어지길",

rightTitle:"소중한 사람",

rightDesc:"늘 행복하세요"
},

{
title:"빛나는 하루",

leftTitle:"가장 특별한 오늘",

leftDesc:"잊지 못할\n추억을 남겨요",

rightTitle:"축복",

rightDesc:"모든 순간이\n반짝이길"
}

];

const graduationTemplates = [

{
title:"청춘",

leftTitle:"빛나던 시간",

leftDesc:"함께한 모든 날들이\n소중한 추억",

rightTitle:"이야기는\n끝나지 않아",

rightDesc:"다른 곳에서\n계속 이어질 뿐"
},

{
title:"출발",

leftTitle:"새로운 시작",

leftDesc:"꿈을 안고\n첫걸음을 내딛다",

rightTitle:"더 넓은 세상",

rightDesc:"설레는 미래가\n기다리고 있어"
},

{
title:"미래",

leftTitle:"노력한 시간",

leftDesc:"흘린 땀과 눈물이\n빛이 되는 순간",

rightTitle:"기대되는 내일",

rightDesc:"모든 꿈이\n이루어지길"
},

{
title:"새로운 시작",

leftTitle:"졸업은",

leftDesc:"끝이 아니라\n새로운 시작",

rightTitle:"한 걸음 더",

rightDesc:"더 멀리\n나아가 보자"
},

{
title:"기억",

leftTitle:"함께한 친구들",

leftDesc:"언제나 마음속에\n남아있는 추억",

rightTitle:"소중한 순간",

rightDesc:"영원히 잊지 않을게"
}

];

const travelTemplates = [

{
title:"여행",

leftTitle:"새로운 출발",

leftDesc:"모든 여행은\n설렘으로 시작돼",

rightTitle:"길 위의 이야기",

rightDesc:"한 걸음마다\n새로운 추억"
},

{
title:"풍경",

leftTitle:"눈앞의 아름다움",

leftDesc:"지금 이 순간을\n마음에 담아요",

rightTitle:"세상은 넓어",

rightDesc:"아직 가야 할\n곳이 많아"
},

{
title:"추억",

leftTitle:"기억 속 풍경",

leftDesc:"언제나 다시\n떠올릴 수 있는",

rightTitle:"소중한 시간",

rightDesc:"그날의 감동을\n간직해요"
},

{
title:"발걸음",

leftTitle:"멈추지 않는",

leftDesc:"새로운 길을\n향한 도전",

rightTitle:"설레는 순간",

rightDesc:"여행은 언제나\n즐거워"
},

{
title:"새로운 만남",

leftTitle:"낯선 곳에서",

leftDesc:"새로운 인연과\n새로운 이야기",

rightTitle:"특별한 기억",

rightDesc:"여행이 준\n가장 큰 선물"
}

];

const templateCategories = [

    "템플릿",

    "가족",

    "커플",

    "아기",

    "생일",

    "졸업",

    "여행"

];
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
function resizeCanvas(){

    canvas.width = canvas.offsetWidth;

    canvas.height = canvas.offsetHeight;

    if(image){

        imgX = canvas.width / 2;

        imgY = canvas.height / 2;

        fitImageCover();

    }

    draw();

}

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

frameBtn.onclick = ()=>{

    decorations.push({

        content:
        decoList[decoIndex],

        x:200 + decoIndex * 20,

        y:200 + decoIndex * 20,

        size:28

    });

    decoIndex++;

    if(
        decoIndex >=
        decoList.length
    ){

        decoIndex = 0;

    }

    draw();

};

}


draw();

photoBtn.onclick = ()=>{

    productType = "photo";
    lightMode = 0;
    lightModeBtn.style.display =
    "none";

    if(image){

fitImageCover();

    }

    draw();
texts.forEach(text=>{

    const box =
    getTextBounds(text);

    const LIMIT = 10;

    // 左边

    if(
        box.left <
        exportVisibleX + LIMIT
    ){

        text.x +=
        (
            exportVisibleX +
            LIMIT
        )
        -
        box.left;

    }

    // 右边

    if(
        box.right >
        exportVisibleX +
        exportVisibleW -
        LIMIT
    ){

        text.x -=
        box.right
        -
        (
            exportVisibleX +
            exportVisibleW -
            LIMIT
        );

    }

    // 上边

    if(
        box.top <
        exportVisibleY + LIMIT
    ){

        text.y +=
        (
            exportVisibleY +
            LIMIT
        )
        -
        box.top;

    }

    // 下边

    if(
        box.bottom >
        exportVisibleY +
        exportVisibleH -
        LIMIT
    ){

        text.y -=
        box.bottom
        -
        (
            exportVisibleY +
            exportVisibleH -
            LIMIT
        );

    }

    text.rx =

    (
        text.x -
        exportVisibleX
    )
    /
    exportVisibleW;

    text.ry =

    (
        text.y -
        exportVisibleY
    )
    /
    exportVisibleH;

});
draw();
};

mirrorBtn.onclick = ()=>{

    productType = "mirror";

    lightModeBtn.style.display =
    "block";

    if(image){

        const frameWidth = 12;
        const frameHeight = 17.5;

        const visibleWidth = 9.8;
        const visibleHeight = 15.3;

        const marginX = 20;

        const outerW =
        canvas.width - marginX * 2;

        const outerH =
        canvas.height - marginX * 2;

        const visibleW =
        outerW *
        (visibleWidth / frameWidth);

        const visibleH =
        outerH *
        (visibleHeight / frameHeight);

        const scaleX =
        visibleW / image.width;

        const scaleY =
        visibleH / image.height;

        imgScale =
        Math.max(scaleX, scaleY);

    }

    draw();


texts.forEach(text=>{

    const box =
    getTextBounds(text);

    const LIMIT = 10;

    // 左边

    if(
        box.left <
        exportVisibleX + LIMIT
    ){

        text.x +=
        (
            exportVisibleX +
            LIMIT
        )
        -
        box.left;

    }

    // 右边

    if(
        box.right >
        exportVisibleX +
        exportVisibleW -
        LIMIT
    ){

        text.x -=
        box.right
        -
        (
            exportVisibleX +
            exportVisibleW -
            LIMIT
        );

    }

    // 上边

    if(
        box.top <
        exportVisibleY + LIMIT
    ){

        text.y +=
        (
            exportVisibleY +
            LIMIT
        )
        -
        box.top;

    }

    // 下边

    if(
        box.bottom >
        exportVisibleY +
        exportVisibleH -
        LIMIT
    ){

        text.y -=
        box.bottom
        -
        (
            exportVisibleY +
            exportVisibleH -
            LIMIT
        );

    }

    text.rx =

    (
        text.x -
        exportVisibleX
    )
    /
    exportVisibleW;

    text.ry =

    (
        text.y -
        exportVisibleY
    )
    /
    exportVisibleH;

});

draw();
};

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

function applyTemplate(index){

let currentTemplates =
familyTemplates;

if(
    templateCategory === 2
){

    currentTemplates =
    coupleTemplates;

}

if(
    templateCategory === 3
){

    currentTemplates =
    babyTemplates;

}
 if(
    templateCategory === 4
){

    currentTemplates =
    birthdayTemplates;

}

if(
    templateCategory === 5
){

    currentTemplates =
    graduationTemplates;

}

if(
    templateCategory === 6
){

    currentTemplates =
    travelTemplates;

}  
// =====================
// Layout系统
// =====================

const layouts = {

layout1:{

titleRx:0.07,
titleRy:0.10,

leftTitleRx:0.04,
leftTitleRy:0.78,

leftDescRx:0.06,
leftDescRy:0.91,

rightTitleRx:0.66,
rightTitleRy:0.80,

rightDescRx:0.60,
rightDescRy:0.97

},

layout2:{

titleRx:0.55,
titleRy:0.10,

leftTitleRx:0.04,
leftTitleRy:0.70,

leftDescRx:0.04,
leftDescRy:0.83,

rightTitleRx:0.66,
rightTitleRy:0.72,

rightDescRx:0.66,
rightDescRy:0.85

},

layout3:{

titleRx:0.28,
titleRy:0.08,

leftTitleRx:0.04,
leftTitleRy:0.72,

leftDescRx:0.04,
leftDescRy:0.85,

rightTitleRx:0.72,
rightTitleRy:0.56,

rightDescRx:0.72,
rightDescRy:0.69

},

layout4:{

titleRx:0.28,
titleRy:0.08,

leftTitleRx:0.04,
leftTitleRy:0.51,

leftDescRx:0.04,
leftDescRy:0.64,

rightTitleRx:0.72,
rightTitleRy:0.78,

rightDescRx:0.72,
rightDescRy:0.91

},

layout5:{

titleRx:0.15,
titleRy:0.08,

leftTitleRx:0.04,
leftTitleRy:0.74,

leftDescRx:0.04,
leftDescRy:0.87,

rightTitleRx:0.70,
rightTitleRy:0.52,

rightDescRx:0.70,
rightDescRy:0.65

}

};

let layout = layouts.layout1;

if(index === 0){

    layout = layouts.layout1;

}

if(index === 1){

    layout = layouts.layout2;

}

if(index === 2){

    layout = layouts.layout3;

}

if(index === 3){

    layout = layouts.layout4;

}

if(index === 4){

    layout = layouts.layout5;

}

const tpl =
currentTemplates[index];
texts = [];

titleText = null;

subTitleText = null;

thirdText = null;

leftBottomText = null;

rightSubText = null;

if(!titleText){

titleText = {

    content:tpl.title,

    rx:layout.titleRx,
    ry:layout.titleRy,

    align:"left",

    x:
    exportVisibleX +
    exportVisibleW *
    layout.titleRx,

    y:
    exportVisibleY +
    exportVisibleH *
    layout.titleRy,

    size:28,

    rotation:0,

    color:"#ffffff",

    glow:0,

    font:"sans-serif"

};
    
        texts.push(titleText);

    }else{

        titleText.content =
        tpl.title;

    }

    if(!subTitleText){

subTitleText = {

    content:tpl.leftDesc,
rx:layout.leftDescRx,
ry:layout.leftDescRy,
    align:"left",
    x:
    exportVisibleX +
    exportVisibleW *
layout.leftDescRx,
    y:
    exportVisibleY +
    exportVisibleH *
layout.leftDescRy,

    size:10,

    rotation:0,

    color:"#ffffff",

    glow:0

};
           
        texts.push(subTitleText);

    }else{

subTitleText.content =
tpl.leftDesc;

    }
if(!thirdText){

thirdText = {

    content:tpl.rightTitle,

rx:layout.rightTitleRx,
ry:layout.rightTitleRy,
    align:"left",
    x:
    exportVisibleX +
    exportVisibleW *
layout.rightTitleRx,

    y:
    exportVisibleY +
    exportVisibleH *
layout.rightTitleRy,
    size:16,

    rotation:0,

    color:"#ffffff",

    glow:0

};
        

    texts.push(thirdText);

}else{

    thirdText.content =
tpl.rightTitle;
}
if(!leftBottomText){

leftBottomText = {

   content:
tpl.leftTitle,
rx:layout.leftTitleRx,
ry:layout.leftTitleRy,

    align:"left",

    x:
    exportVisibleX +
    exportVisibleW *
layout.leftTitleRx,

    y:
    exportVisibleY +
    exportVisibleH *
layout.leftTitleRy,

    size:14,

    rotation:0,

    color:"#ffffff",

    glow:0

};

texts.push(leftBottomText);

}
if(!rightSubText){

rightSubText = {

content:
tpl.rightDesc,

rx:layout.rightDescRx,
ry:layout.rightDescRy,
    align:"left",

    x:
    exportVisibleX +
    exportVisibleW *
layout.rightDescRx,
    y:
    exportVisibleY +
    exportVisibleH *
layout.rightDescRy,
    size:12,

    rotation:0,

    color:"#ffffff",

    glow:0

};

texts.push(rightSubText);

}

draw();

// 自动执行一次边界校正

texts.forEach(text=>{

    const box =
    getTextBounds(text);

    const LIMIT = 10;

    if(
        box.left <
        exportVisibleX + LIMIT
    ){

        text.x +=
        (
            exportVisibleX +
            LIMIT
        )
        -
        box.left;

    }

    if(
        box.right >
        exportVisibleX +
        exportVisibleW -
        LIMIT
    ){

        text.x -=
        box.right
        -
        (
            exportVisibleX +
            exportVisibleW -
            LIMIT
        );

    }

    if(
        box.top <
        exportVisibleY + LIMIT
    ){

        text.y +=
        (
            exportVisibleY +
            LIMIT
        )
        -
        box.top;

    }

    if(
        box.bottom >
        exportVisibleY +
        exportVisibleH -
        LIMIT
    ){

        text.y -=
        box.bottom
        -
        (
            exportVisibleY +
            exportVisibleH -
            LIMIT
        );

    }

    text.rx =

    (
        text.x -
        exportVisibleX
    )
    /
    exportVisibleW;

    text.ry =

    (
        text.y -
        exportVisibleY
    )
    /
    exportVisibleH;

});

draw();

}

document.addEventListener(
"touchstart",
(e)=>{

    if(
        !templateDrawer.contains(
            e.target
        )
        &&
        e.target !== templateBtn
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

function selectProduct(type){

    currentProduct = type;
    currentConfig =
    PRODUCTS[type];
   updateButtons();
 document.getElementById(
        "homePage"
    ).style.display = "none";

    document.getElementById(
        "editorContainer"
    ).style.display = "block";

    document.getElementById(
        "editorPage"
    ).style.display = "flex";

    document.getElementById(
        "bottomPanel"
    ).style.display = "flex";

    resizeCanvas();

    if(type === "photo"){

        photoBtn.click();

    }

    if(type === "frame"){

        photoBtn.click();

    }

    if(type === "idcard"){

        photoBtn.click();

    }

    if(type === "mirror"){

        mirrorBtn.click();

    }

}


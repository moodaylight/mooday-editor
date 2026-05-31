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
const titleBtn =
document.getElementById("titleBtn");
const subTitleBtn =
document.getElementById("subTitleBtn");
const previewBtn =
document.getElementById("previewBtn");
const moodBtn =
document.getElementById("moodBtn");
const printBtn =
document.getElementById("printBtn");
const templateBtn =
document.getElementById("templateBtn");
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
let image = new Image();
let originalImage = null;
image.src = "default.png";
let lastTapText = null;
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

    const scaleX =
    visibleW / image.width;

    const scaleY =
    visibleH / image.height;

imgScale =
Math.max(scaleX, scaleY);

    // 自动居中

imgX = canvas.width / 2;

imgY =
10 +
(
(canvas.height - 40)
/
2
);

    draw();

}
// 图片

let imgX = 0;
let imgY = 0;

let imgScale = 1;
let imgRotation = 0;

 // 文字

let texts = [];
let selectedTextIndex = -1;
let selectedText = null;
let titleText = null;
let subTitleText = null;
let thirdText = null;
// 当前是否选中图片

let imageSelected = false;

let productType = "photo";
let lightMode = 0;
let moodMode = 0;
let templateCategory = 0;
let templateMode = false;

let familyTemplateIndex = 0;

const familyTemplates = [

    {
        title:"Home",

        subTitle:"Where Love Lives",

        text3:"Together\nEvery Day"
    },

    {
        title:"The Best Moments",

        subTitle:"Are Together",

        text3:"Family Makes\nLife Beautiful"
    },

    {
        title:"Together",

        subTitle:"Every Day",

        text3:"The Warmest\nPlace Is Home"
    }

];
const coupleTemplates = [

    {
        title:"You & Me",

        subTitle:"Every Moment Matters",

        text3:"Love Is In\nThe Little Things"
    },

    {
        title:"Our Story",

        subTitle:"Continues",

        text3:"Every Day\nA New Memory"
    },

    {
        title:"Forever",

        subTitle:"Starts Today",

        text3:"With You\nBy My Side"
    }

];
const babyTemplates = [

    {
        title:"成长",
        subTitle:"只有一次",
        text3:"请慢一点长大"
    },

    {
        title:"童年",
        subTitle:"闪闪发光",
        text3:"把快乐装进每一天"
    },

    {
        title:"梦想",
        subTitle:"从这里开始",
        text3:"未来正在向你招手"
    }

];

const birthdayTemplates = [

    {
        title:"生日",
        subTitle:"今天属于你",
        text3:"愿未来的每一天都像今天一样闪闪发光"
    },

   {
    title:"祝福",

    subTitle:
    "把最好的祝愿\n送给最特别的你",

    text3:
    "愿所有美好\n都如约而至"
},

    {
        title:"快乐时光",
        subTitle:"把笑容留在今天",
        text3:"把幸福带向未来"
    }

];

const graduationTemplates = [

    {
        title:"青春",
        subTitle:"故事不会结束",
        text3:"只是换个地方继续"
    },

    {
        title:"启程",
        subTitle:"带着梦想出发",
        text3:"向更远的地方前进"
    },

    {
        title:"未来可期",
        subTitle:"那些努力过的日子",
        text3:"终将开花结果"
    }

];

const travelTemplates = [

    {
        title:"远方",
        subTitle:"每一次出发",
        text3:"都是新的遇见"
    },

    {
        title:"风景",
        subTitle:"世界很大",
        text3:"脚步不要停下"
    },

    {
        title:"回忆",
        subTitle:"后来想起的",
        text3:"都是当时的风景"
    }

];

const templateCategories = [

    "模板",

    "家庭",

    "情侣",

    "宝宝",

    "生日",

    "毕业",

    "旅行"

];
lightModeBtn.innerText = "灯光";
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

let initialImageScale = 1;

// =====================
// 画布大小
// =====================

function resizeCanvas(){

    canvas.width = canvas.offsetWidth;

    canvas.height = canvas.offsetHeight;

    draw();

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// =====================
// 获取文字真实区域
// =====================

function getTextBounds(text){

    ctx.save();

    ctx.font =
    `${text.size}px sans-serif`;

    const lines =
    String(
        text.content || ""
    ).split("\n");

    let maxWidth = 0;

    lines.forEach(line=>{

        const w =
        ctx.measureText(line).width;

        if(w > maxWidth){

            maxWidth = w;

        }

    });

    const totalHeight =
    lines.length *
    (text.size + 6);

    ctx.restore();

    return {

        left:
        text.x -
        maxWidth / 2 -
        0,

        right:
        text.x +
        maxWidth / 2 +
        0,

        top:
        text.y -
        totalHeight / 2 -
        0,

        bottom:
        text.y +
        totalHeight / 2 +
        0

    };

}

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
upload.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

reader.onload = function(event){

    image = new Image();

    originalImage = image;

    image.onload = function(){

            imgX = canvas.width / 2;

            imgY = canvas.height / 2;

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
// =====================
// Canvas边距
// =====================

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

// =====================
// 可视区域像素大小
// =====================

const visibleW =
outerW * visibleRatioX;

const visibleH =
outerH * visibleRatioY;

// =====================
// Cover算法
// =====================

const scaleX =
visibleW / image.width;

const scaleY =
visibleH / image.height;

// 自动铺满（关键）

imgScale =
Math.max(scaleX, scaleY);

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
// 主标题
// =====================

titleBtn.addEventListener(
"click",
()=>{

    // 已存在 → 删除

    if(titleText){

 selectedText = titleText;

textInput.style.display = "block";

textInput.value = titleText.content;

textInput.focus();

draw();

return;  
}

    // 不存在 → 创建

    const text = {

        content: "主标题",

        x: canvas.width / 2,

        y: 140,

        size: 32,

        rotation: 0,

        color: "#ffffff",

        glow: 0

    };

    texts.push(text);

    titleText = text;

    selectedText = text;

    imageSelected = false;

    draw();

});

// =====================
// 副标题
// =====================

subTitleBtn.addEventListener(
"click",
()=>{

    if(subTitleText){

        selectedText = subTitleText;

        textInput.style.display = "block";

        textInput.value = subTitleText.content;

        textInput.focus();

        draw();

        return;

    }

    const text = {

        content: "副标题",

        x: canvas.width / 2,

        y: 460,

        size: 20,

        rotation: 0,

        color: "#ffffff",

        glow: 0

    };

    texts.push(text);

    subTitleText = text;

    selectedText = text;

    imageSelected = false;

    draw();

});





// =====================
// Touch Start
// =====================

canvas.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    // 双指初始化

    if(e.touches.length === 2){

        initialPinchDistance = getDistance(

            e.touches[0],

            e.touches[1]

        );

        initialRotationAngle = getAngle(

            e.touches[0],

            e.touches[1]

        );

        

        if(imageSelected){

            initialImageScale = imgScale;


        }

        return;

    }

    // 单指

    const touch = e.touches[0];

    const x = touch.clientX - rect.left;

    const y = touch.clientY - rect.top;

    // 判断文字

    const clickedText = getTopText(x,y);

    // 点击文字

if(clickedText){

    selectedText = clickedText;

    imageSelected = false;

    draggingText = true;

    textOffsetX = x - clickedText.x;

    textOffsetY = y - clickedText.y;

    draggingImage = false;

    // 长按进入编辑

    longPressTimer = setTimeout(()=>{

       if(draggingText){

            textInput.style.display = "block";

            textInput.value = clickedText.content;

            textInput.focus();

        }

    },600);

    draw();

    return;

}
    // 点击空白

imageSelected = true;

selectedText = null;

draggingImage = true;

draggingText = false;

dragOffsetX = x - imgX;

dragOffsetY = y - imgY;



draw();    

});

// 取消长按

canvas.addEventListener("touchmove",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    // 单指拖动

    if(e.touches.length === 1){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;

        const y = touch.clientY - rect.top;

        // 文字
      
        // 移动时取消长按
    
        if(draggingText && selectedText){
      selectedText.x = x - textOffsetX
       selectedText.y = y - textOffsetY
       const box = getTextBounds(selectedText);

const LIMIT = 10;

// 左边界
if(box.left < exportVisibleX + LIMIT){

    selectedText.x +=
    (exportVisibleX + LIMIT) - box.left;

}

// 右边界
if(
    box.right >
    exportVisibleX +
    exportVisibleW -
    LIMIT
){

    selectedText.x -=
    box.right -
    (
        exportVisibleX +
        exportVisibleW -
        LIMIT
    );

}

// 上边界
if(box.top < exportVisibleY + LIMIT){

    selectedText.y +=
    (exportVisibleY + LIMIT) - box.top;

}

// 下边界
if(
    box.bottom >
    exportVisibleY +
    exportVisibleH -
    LIMIT
){

    selectedText.y -=
    box.bottom -
    (
        exportVisibleY +
        exportVisibleH -
        LIMIT
    );

}

        }

        // 图片

        if(draggingImage && imageSelected){

    imgX = x - dragOffsetX;

    imgY = y - dragOffsetY;
    
}

        draw();

    }

    // 双指缩放旋转

    if(e.touches.length === 2){

        const currentDistance = getDistance(

            e.touches[0],

            e.touches[1]

        );

        const currentAngle = getAngle(

            e.touches[0],

            e.touches[1]

        );

        const scale = currentDistance / initialPinchDistance;

        const rotation = currentAngle - initialRotationAngle;


        // 图片

        if(imageSelected){

    imgScale =
    initialImageScale * scale;

    // =====================
    // 最小缩放限制（防露白）
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

    const outerW =
    canvas.width - marginX * 2;

    const outerH =
    canvas.height - marginX * 2;

    const visibleRatioX =
    visibleWidth / frameWidth;

    const visibleRatioY =
    visibleHeight / frameHeight;

    const visibleW =
    outerW * visibleRatioX;

    const visibleH =
    outerH * visibleRatioY;

    // Cover最小值

    const minScale =
    Math.max(
        visibleW / image.width,
        visibleH / image.height
    );

    // 不允许缩小到露白

    imgScale =
    Math.max(imgScale, minScale);
    
}

        draw();

    }

});

textInput.addEventListener("input",()=>{

    if(selectedText){

        selectedText.content = textInput.value;

        draw();

    }

});

textInput.addEventListener(
"blur",
()=>{

    textInput.style.display = "none";

}
);
// =====================
// Touch End
// =====================

canvas.addEventListener("touchend",()=>{

clearTimeout(longPressTimer);
    draggingText = false;

    draggingImage = false;

});

draw();

photoBtn.onclick = ()=>{

    productType = "photo";

    lightModeBtn.style.display =
    "none";

    draw();

};

mirrorBtn.onclick = ()=>{

    productType = "mirror";

    lightModeBtn.style.display =
    "block";

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

printBtn.onclick = ()=>{

    draw();

    const exportCanvas =
    document.createElement("canvas");

    exportCanvas.width = 1200;
    exportCanvas.height = 1800;

    const exportCtx =
    exportCanvas.getContext("2d");

const cropW =
exportVisibleW / imgScale;

const cropH =
exportVisibleH / imgScale;

const sx =
(originalImage.width / 2)
-
cropW / 2
-
(
(imgX - canvas.width / 2)
/
imgScale
);

const sy =
(originalImage.height / 2)
-
cropH / 2
-
(
(imgY - canvas.height / 2)
/
imgScale
);

exportCtx.drawImage(

    originalImage,

    sx,
    sy,
    cropW,
    cropH,

    0,
    0,
    1200,
    1800

);

    const link =
    document.createElement("a");

    link.download =
    "4x6-print.jpg";

    link.href =
    exportCanvas.toDataURL(
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

        "原片",

        "暖光记忆",

        "电影时刻",

        "静谧生活",

        "旅行日记"

    ];

    moodBtn.innerText =
    moods[moodMode];

    draw();

};

templateBtn.onclick = ()=>{

    if(templateLongPressed){

        templateLongPressed = false;

        return;

    }

    templateCategory++;

    if(
        templateCategory >=
        templateCategories.length
    ){

        templateCategory = 0;

    }

    templateBtn.innerText =

    templateCategories[
        templateCategory
    ];

};
templateBtn.addEventListener(
"touchstart",
()=>{

    templateLongPressed = false;

    templateLongPressTimer =
    setTimeout(()=>{

        templateLongPressed = true;
if(templateCategory === 1){

    templateItem0.innerText =
    "家的模样";

    templateItem1.innerText =
    "温暖时光";

    templateItem2.innerText =
    "陪伴";

}

if(templateCategory === 2){

    templateItem0.innerText =
    "You & Me";

    templateItem1.innerText =
    "Our Story";

    templateItem2.innerText =
    "Forever";

}

if(templateCategory === 3){

    templateItem0.innerText =
    "成长";

    templateItem1.innerText =
    "童年";

    templateItem2.innerText =
    "梦想";

}
 if(templateCategory === 4){

    templateItem0.innerText =
    "生日";

    templateItem1.innerText =
    "祝福";

    templateItem2.innerText =
    "快乐时光";

}

if(templateCategory === 5){

    templateItem0.innerText =
    "青春";

    templateItem1.innerText =
    "启程";

    templateItem2.innerText =
    "未来可期";

}

if(templateCategory === 6){

    templateItem0.innerText =
    "远方";

    templateItem1.innerText =
    "风景";

    templateItem2.innerText =
    "回忆";

}       
        templateDrawer.classList.add(
            "show"
        );

    },700);

}
);

templateBtn.addEventListener(
"touchend",
()=>{

    clearTimeout(
        templateLongPressTimer
    );

}
);
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
    const tpl =
currentTemplates[index];

    if(!titleText){

titleText = {

    content:tpl.title,

    x: exportVisibleX + 30,

    y: exportVisibleY + 20,

    size:30,

    rotation:0,

    color:"#ffffff",

    glow:0

};
    
        texts.push(titleText);

    }else{

        titleText.content =
        tpl.title;

    }

    if(!subTitleText){

subTitleText = {

    content:tpl.subTitle,

    x: exportVisibleX + 10,

    y: exportVisibleY + exportVisibleH - 30,

    size:13,

    rotation:0,

    color:"#ffffff",

    glow:0

};

           
        texts.push(subTitleText);

    }else{

        subTitleText.content =
        tpl.subTitle;

    }
if(!thirdText){

thirdText = {

    content:tpl.text3,

    x: exportVisibleX + exportVisibleW - 10,

    y: exportVisibleY + exportVisibleH - 10,

    size:18,

    rotation:0,

    color:"#ffffff",

    glow:0

};
        

    texts.push(thirdText);

}else{

    thirdText.content =
    tpl.text3;

}

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

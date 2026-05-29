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
// =====================
// 数据
// =====================

let image = new Image();
image.src = "default.png";
let lastTapText = null;
image.onload = function(){

    // =====================
    // 可视区域真实尺寸
    // =====================

    const frameWidth = 12;
    const frameHeight = 17.5;

    const visibleWidth = 9.8;
    const visibleHeight = 15.3;

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

    imgY = canvas.height / 2;

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
// 当前是否选中图片

let imageSelected = false;
// =====================
// 灯光模式
// =====================

let lightMode = 0;
let productType = "photo";
lightModeBtn.innerText = "照片成功";
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

    ctx.font = `${text.size}px sans-serif`;

    const width = ctx.measureText(text.content).width;

    ctx.restore();

    return {

    left: text.x - width / 2 - 10,

    right: text.x + width / 2 + 10,

    top: text.y - text.size / 2 - 10,

    bottom: text.y + text.size / 2 + 10

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

        image.onload = function(){

            imgX = canvas.width / 2;

            imgY = canvas.height / 2;

            // =====================
// 可视区域真实尺寸
// =====================

const frameWidth = 12;
const frameHeight = 17.5;

const visibleWidth = 9.8;
const visibleHeight = 15.3;

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

    // 已存在 → 删除

    if(subTitleText){

        texts = texts.filter(
            t => t !== subTitleText
        );

        subTitleText = null;

        selectedText = null;

        draw();

        return;

    }

    // 不存在 → 创建

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

// 左边界

if(box.left < 48){

    selectedText.x +=
    48 - box.left;

}

// 右边界

if(box.right > 312){

    selectedText.x -=
    box.right - 312;

}

// 上边界

if(box.top < 45){

    selectedText.y +=
    45 - box.top;

}

// 下边界

if(box.bottom > 480){

    selectedText.y -=
    box.bottom - 480;
       

        }

        }

        // 图片

        if(draggingImage && imageSelected){

    imgX = x - dragOffsetX;

    imgY = y - dragOffsetY;
    console.log("图片正在移动");
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

    const frameWidth = 12;
    const frameHeight = 17.5;

    const visibleWidth = 9.8;
    const visibleHeight = 15.3;

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

    photoBtn.innerText = "点到了";

};

mirrorBtn.onclick = ()=>{

    mirrorBtn.innerText = "点到了";

};

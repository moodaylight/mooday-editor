const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const upload = document.getElementById("upload");
const addTextBtn = document.getElementById("addText");
const textInput = document.getElementById("textInput");
const colorPicker =
document.getElementById("colorPicker");
const glowSlider =
document.getElementById("glowSlider");
const deleteTextBtn = document.getElementById("deleteText");
const moveUpBtn = document.getElementById("moveUp");
const moveDownBtn = document.getElementById("moveDown");
const layerPanel = document.getElementById("layerPanel");
const lightModeBtn =
document.getElementById("lightModeBtn");
// =====================
// 数据
// =====================

let image = new Image();

image.src = "default.png";
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

// 当前是否选中图片

let imageSelected = false;
// =====================
// 灯光模式
// =====================

let lightMode = 0;
// 拖动状态

let draggingText = false;
let draggingImage = false;

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

function updateLayerPanel(){

    layerPanel.innerHTML = "";

    if(image){

        const imgItem = document.createElement("div");

        imgItem.className = "layer-item";

        imgItem.innerText = "图片";

        if(imageSelected){

            imgItem.classList.add("active");

        }

        imgItem.onclick = ()=>{

            imageSelected = true;

            selectedText = null;

            draw();

            updateLayerPanel();

        };

        layerPanel.appendChild(imgItem);

    }

    texts.forEach((text,index)=>{

        const item = document.createElement("div");

        item.className = "layer-item";

        item.innerText = `文字 ${index + 1}`;

        if(text === selectedText){

            item.classList.add("active");

        }

        item.onclick = ()=>{

            selectedText = text;

            imageSelected = false;

            textInput.value = text.content;

            draw();

            updateLayerPanel();

        };

        layerPanel.appendChild(item);

    });

}

// =====================
// 上传图片
// =====================

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

            updateLayerPanel();

        };

        image.src = event.target.result;

    };

    reader.readAsDataURL(file);

});

// =====================
// 新增文字
// =====================

addTextBtn.addEventListener("click",()=>{

    const text = {

        content: "双击编辑",

        x: canvas.width / 2,

        y: canvas.height / 2,

        size: 60,

        rotation: 0,

        color: "#ffffff",
        
        glow: 0
    };

    texts.push(text);

    selectedText = text;

    imageSelected = false;

    textInput.value = text.content;

    draw();

    updateLayerPanel();

});

deleteTextBtn.addEventListener("click",()=>{

    if(!selectedText) return;

    texts = texts.filter(t => t !== selectedText);

    selectedText = null;

    draw();

    updateLayerPanel();

});
moveUpBtn.addEventListener("click",()=>{

    if(!selectedText) return;

    const index = texts.indexOf(selectedText);

    if(index < texts.length - 1){

        [texts[index], texts[index + 1]] =

        [texts[index + 1], texts[index]];

    }

    draw();

    updateLayerPanel();

});
moveDownBtn.addEventListener("click",()=>{

    if(!selectedText) return;

    const index = texts.indexOf(selectedText);

    if(index > 0){

        [texts[index], texts[index - 1]] =

        [texts[index - 1], texts[index]];

    }

    draw();

    updateLayerPanel();

});
// =====================
// 输入框同步
// =====================

textInput.addEventListener("input",()=>{

    if(selectedText){

        selectedText.content = textInput.value;

        draw();

    }

});
colorPicker.addEventListener("input",()=>{

    if(selectedText){

        selectedText.color = colorPicker.value;

        draw();

    }

});
glowSlider.addEventListener("input",()=>{

    if(selectedText){

        selectedText.glow = parseInt(glowSlider.value);

        draw();

    }

});
// =====================
// 灯光切换
// =====================

lightModeBtn.addEventListener(
"click",
()=>{

    lightMode++;

    if(lightMode > 3){

        lightMode = 0;

    }

    draw();

});
// =====================
// 绘制
// =====================

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
   
    drawFrame();
   
    // 图片

   if(image){

    // =====================
    // 真实尺寸
    // =====================

    const frameWidth = 12;
    const frameHeight = 17.5;

    const visibleWidth = 9.8;
    const visibleHeight = 15.3;

    // =====================
    // 外边距
    // =====================

    const marginX = 20;
    const marginTop = 10;

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
    // 可视区域大小
    // =====================

    const visibleW =
    outerW * visibleRatioX;

    const visibleH =
    outerH * visibleRatioY;

    // =====================
    // 可视区域位置
    // =====================

    const visibleX =
    (canvas.width - visibleW) / 2;

    const visibleY =
    marginTop + (outerH - visibleH) / 2;

    // =====================
    // 图片真实尺寸
    // =====================

    const w =
    image.width * imgScale;

    const h =
    image.height * imgScale;

    // =====================
    // 防止露白（边界限制）
    // =====================

    const minX =
    visibleX + visibleW - w / 2;

    const maxX =
    visibleX + w / 2;

    const minY =
    visibleY + visibleH - h / 2;

    const maxY =
    visibleY + h / 2;

    imgX =
    Math.min(maxX, Math.max(minX, imgX));

    imgY =
    Math.min(maxY, Math.max(minY, imgY));

    // =====================
    // 裁切区域
    // =====================

    ctx.save();

    ctx.beginPath();

    roundRect(
        visibleX,
        visibleY,
        visibleW,
        visibleH,
        18
    );

    ctx.clip();

    // =====================
    // 绘制图片
    // =====================

    ctx.translate(imgX,imgY);
// =====================
// 镜子模式降低图片亮度
// =====================

if(lightMode === 3){

    ctx.filter =
    "brightness(0.18)";

}else{

    ctx.filter =
    "brightness(1)";

}
    
    ctx.drawImage(
        image,
        -w / 2,
        -h / 2,
        w,
        h
    );


// 暖光
if(lightMode === 1){

    ctx.fillStyle =
    "rgba(255,210,120,0.18)";

    ctx.fillRect(
        -w / 2,
        -h / 2,
        w,
        h
    );

}

// 日光
if(lightMode === 2){

    ctx.fillStyle =
    "rgba(255,255,255,0.12)";

    ctx.fillRect(
        -w / 2,
        -h / 2,
        w,
        h
    );

}

// 镜子模式
if(lightMode === 3){

    // 半透灰黑镜

    ctx.fillStyle =
    "rgba(20,20,20,0.58)";

    ctx.fillRect(
        -w / 2,
        -h / 2,
        w,
        h
    );

    // =====================
    // 镜面高光
    // =====================

    const mirrorGradient =
    ctx.createLinearGradient(
        -w / 2,
        -h / 2,
        w / 2,
        h / 2
    );

    mirrorGradient.addColorStop(
        0,
        "rgba(255,255,255,0.16)"
    );

    mirrorGradient.addColorStop(
        0.25,
        "rgba(255,255,255,0.04)"
    );

    mirrorGradient.addColorStop(
        0.5,
        "rgba(255,255,255,0)"
    );

    mirrorGradient.addColorStop(
        1,
        "rgba(255,255,255,0.08)"
    );

    ctx.fillStyle = mirrorGradient;

    ctx.fillRect(
        -w / 2,
        -h / 2,
        w,
        h
    );

}
 
       ctx.restore();

} 

    // 文字

    texts.forEach(text=>{

        ctx.save();

        ctx.translate(text.x,text.y);

        ctx.rotate(text.rotation * Math.PI / 180);

        ctx.font = `${text.size}px sans-serif`;

        ctx.fillStyle = text.color;

       ctx.shadowColor = text.color;

       ctx.shadowBlur = text.glow;
       
        ctx.textAlign = "center";

        ctx.textBaseline = "middle";
        
        ctx.fillText(text.content,0,0);

        if(text === selectedText){

            const box = getTextBounds(text);

            ctx.strokeStyle = "#7b5cff";

            ctx.lineWidth = 2;

            ctx.strokeRect(

                box.left - text.x,

                box.top - text.y,

                box.right - box.left,

                box.bottom - box.top

            );

        }

        ctx.restore();

    });

}

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

        if(selectedText){

            initialTextSize = selectedText.size;

            initialTextRotation = selectedText.rotation;

        }

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

        draggingImage = false;

        textInput.value = clickedText.content;

        draw();

        updateLayerPanel();

        return;

    }

    // 点击空白

    selectedText = null;

    imageSelected = true;

    draggingImage = true;

    draggingText = false;

    draw();

    updateLayerPanel();

});

// =====================
// Touch Move
// =====================

canvas.addEventListener("touchmove",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    // 单指拖动

    if(e.touches.length === 1){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;

        const y = touch.clientY - rect.top;

        // 文字

        if(draggingText && selectedText){

            selectedText.x = x;

            selectedText.y = y;

        }

        // 图片

        if(draggingImage && imageSelected){

            imgX = x;

            imgY = y;

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

        // 文字

        if(selectedText){

            const newSize = initialTextSize * scale;

            selectedText.size = Math.max(

                30,

                newSize

            );

            selectedText.rotation =

            (initialTextRotation + rotation) % 360;

        }

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

// =====================
// Touch End
// =====================

canvas.addEventListener("touchend",()=>{

    draggingText = false;

    draggingImage = false;

});

// =====================
// 初始化
// =====================
function drawFrame(){

    // =====================
    // 真实尺寸
    // =====================

    const frameWidth = 12;

    const frameHeight = 17.5;

    const visibleWidth = 9.8;

    const visibleHeight = 15.3;

    // =====================
    // 边框真实结构
    // =====================

    const outerFrameSize = 0.75;

    const innerFrameSize = 0.35;

    // =====================
    // 外边距
    // =====================

    const marginX = 20;

    const marginTop = 10;

    // =====================
    // 外框
    // =====================

    const outerX = marginX;

    const outerY = marginTop;

   const outerW = canvas.width - marginX * 2;

   const outerH = canvas.height - marginX * 2;

    // =====================
    // 可视区比例
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
    // 可视区位置
    // =====================

    const visibleX =
    (canvas.width - visibleW) / 2;

    const visibleY =
    outerY + (outerH - visibleH) / 2;
    // =====================
    // 实际比例计算
    // =====================

    const totalFrame =
    outerFrameSize + innerFrameSize;

    const outerRatio =
    outerFrameSize / totalFrame;

    const innerRatio =
    innerFrameSize / totalFrame;

    const frameThickness =
    (outerW - visibleW) / 2;

    const outerThickness =
    frameThickness * outerRatio;

    const innerThickness =
    frameThickness * innerRatio;

    // =====================
    // 外凸白框
    // =====================

    ctx.fillStyle = "#f8f8f8";

    roundRect(
        outerX,
        outerY,
        outerW,
        outerH,
        35
    );

    // =====================
    // 内凹层
    // =====================

    ctx.fillStyle = "#d8d8d8";

    roundRect(
        visibleX - innerThickness,
        visibleY - innerThickness,
        visibleW + innerThickness * 2,
        visibleH + innerThickness * 2,
        22
    );

    // =====================
    // 可视区
    // =====================

    ctx.fillStyle = "#111";

    roundRect(
        visibleX,
        visibleY,
        visibleW,
        visibleH,
        18
    );

}

function roundRect(x,y,w,h,r){

    ctx.beginPath();

    ctx.moveTo(x+r,y);

    ctx.lineTo(x+w-r,y);

    ctx.quadraticCurveTo(x+w,y,x+w,y+r);

    ctx.lineTo(x+w,y+h-r);

    ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);

    ctx.lineTo(x+r,y+h);

    ctx.quadraticCurveTo(x,y+h,x,y+h-r);

    ctx.lineTo(x,y+r);

    ctx.quadraticCurveTo(x,y,x+r,y);

    ctx.closePath();

    ctx.fill();

}
updateLayerPanel();

draw();

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

// =====================
// 数据
// =====================

let image = null;

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

// 拖动状态

let draggingText = false;
let draggingImage = false;

// 双指状态

let initialPinchDistance = 0;
let initialRotationAngle = 0;

let initialTextSize = 0;
let initialTextRotation = 0;

let initialImageScale = 1;
let initialImageRotation = 0;

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

            imgScale = 1;

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
// 绘制
// =====================

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    drawFrame();
   
    // 图片

    if(image){

        const w = image.width * imgScale;

        const h = image.height * imgScale;

        ctx.save();

        ctx.translate(imgX,imgY);

        ctx.rotate(imgRotation * Math.PI / 180);

        ctx.drawImage(

            image,

            -w / 2,

            -h / 2,

            w,

            h

        );

        if(imageSelected){

            ctx.strokeStyle = "#7b5cff";

            ctx.lineWidth = 4;

            ctx.strokeRect(

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

            initialImageRotation = imgRotation;

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

            imgRotation =

            initialImageRotation + rotation;

           
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
    // 真实产品尺寸
    // =====================

    const frameWidth = 12;

    const frameHeight = 17.5;

    const visibleWidth = 9.8;

    const visibleHeight = 15.3;

    // =====================
    // 画布边距
    // =====================

    const outerMargin = 20;

    // =====================
    // 外框尺寸
    // =====================

    const outerX = outerMargin;

    const outerY = outerMargin;

    const outerW = canvas.width - outerMargin * 2;

    const outerH = canvas.height - outerMargin * 2;

    // =====================
    // 可视区真实比例
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
    // 可视区居中
    // =====================

    const visibleX =
    (canvas.width - visibleW) / 2;

    const visibleY =
    (canvas.height - visibleH) / 2;

    // =====================
    // 外框
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

    ctx.fillStyle = "#dcdcdc";

    roundRect(
        visibleX - 12,
        visibleY - 12,
        visibleW + 24,
        visibleH + 24,
        24
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

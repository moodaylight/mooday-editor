const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const layerPanel = document.getElementById("layerPanel");

const upload = document.getElementById("upload");
const addTextBtn = document.getElementById("addText");
const deleteTextBtn = document.getElementById("deleteText");

const moveUpBtn = document.getElementById("moveUp");
const moveDownBtn = document.getElementById("moveDown");

const textInput = document.getElementById("textInput");

let image = null;

let imgScale = 1;
let imgRotation = 0;

let imgX = 0;
let imgY = 0;

let texts = [];

let selectedText = null;

let imageSelected = false;

let draggingText = false;
let draggingImage = false;

let touchTargetLocked = false;

let initialPinchDistance = null;
let initialRotationAngle = null;

let initialTextSize = null;
let initialTextRotation = null;

let initialImageScale = null;
let initialImageRotation = null;

// ======================
// 画布自适应
// ======================

function resizeCanvas(){

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    draw();

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// ======================
// 文字点击区域
// ======================

function resizeHitbox(text){

    ctx.save();

    ctx.font = `${text.size}px sans-serif`;

    const width = ctx.measureText(text.content).width;

    ctx.restore();

    return {

        left: text.x - width / 2 - 20,

        right: text.x + width / 2 + 20,

        top: text.y - text.size - 20,

        bottom: text.y + 20

    };

}

function pointInText(text,x,y){

    ctx.save();

    ctx.font = `${text.size}px sans-serif`;

    const width = ctx.measureText(text.content).width;

    ctx.restore();

    const left = text.x - width / 2 - 10;

    const right = text.x + width / 2 + 10;

    const top = text.y - text.size;

    const bottom = text.y + 20;

    return (

        x >= left &&
        x <= right &&
        y >= top &&
        y <= bottom

    );

}

function getTopText(x,y){

    let clickedText = null;

    [...texts].reverse().forEach(text=>{

        if(pointInText(text,x,y)){

            if(!clickedText){

                clickedText = text;

            }

        }

    });

    return clickedText;

}

// ======================
// 双指计算
// ======================

function getDistance(touch1,touch2){

    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;

    return Math.sqrt(dx * dx + dy * dy);

}

function getAngle(touch1,touch2){

    return Math.atan2(

        touch2.clientY - touch1.clientY,
        touch2.clientX - touch1.clientX

    ) * 180 / Math.PI;

}

// ======================
// 图层面板
// ======================

function updateLayerPanel(){

    layerPanel.innerHTML = "";

    if(image){

        const imageItem = document.createElement("div");

        imageItem.className = "layer-item";

        if(imageSelected){

            imageItem.classList.add("active");

        }

        imageItem.innerText = "图片";

        imageItem.onclick = ()=>{

            imageSelected = true;
            selectedText = null;

            updateLayerPanel();

            draw();

        };

        layerPanel.appendChild(imageItem);

    }

    texts.forEach((text,index)=>{

        const item = document.createElement("div");

        item.className = "layer-item";

        if(text === selectedText){

            item.classList.add("active");

        }

        item.innerText = `文字 ${index + 1}`;

        item.onclick = ()=>{

            selectedText = text;

            imageSelected = false;

            textInput.value = text.content;

            updateLayerPanel();

            draw();

        };

        layerPanel.appendChild(item);

    });

}

// ======================
// 上传图片
// ======================

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

            updateLayerPanel();

            draw();

        };

        image.src = event.target.result;

    };

    reader.readAsDataURL(file);

});

// ======================
// 新增文字
// ======================

addTextBtn.addEventListener("click",()=>{

    const offset = texts.length * 80;

    const text = {

        content: "双击编辑",

        x: canvas.width / 2,

        y: canvas.height / 2 + offset,

        size: 60,

        rotation: 0,

        color: "#ffffff",

        glow: 20

    };

    texts.push(text);

    selectedText = text;

    imageSelected = false;

    textInput.value = text.content;

    updateLayerPanel();

    draw();

});

// ======================
// 删除文字
// ======================

deleteTextBtn.addEventListener("click",()=>{

    if(!selectedText) return;

    texts = texts.filter(

        text => text !== selectedText

    );

    selectedText = null;

    updateLayerPanel();

    draw();

});

// ======================
// 图层上移
// ======================

moveUpBtn.addEventListener("click",()=>{

    if(!selectedText) return;

    const index = texts.indexOf(selectedText);

    if(index < texts.length - 1){

        [texts[index], texts[index + 1]] =

        [texts[index + 1], texts[index]];

    }

    updateLayerPanel();

    draw();

});

// ======================
// 图层下移
// ======================

moveDownBtn.addEventListener("click",()=>{

    if(!selectedText) return;

    const index = texts.indexOf(selectedText);

    if(index > 0){

        [texts[index], texts[index - 1]] =

        [texts[index - 1], texts[index]];

    }

    updateLayerPanel();

    draw();

});

// ======================
// 实时文字同步
// ======================

textInput.addEventListener("input",()=>{

    if(selectedText){

        selectedText.content = textInput.value;

        draw();

    }

});

// ======================
// 绘制
// ======================

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // 图片

    if(image){

        const drawWidth = image.width * imgScale;
        const drawHeight = image.height * imgScale;

        ctx.save();

        ctx.translate(imgX,imgY);

        ctx.rotate(imgRotation * Math.PI / 180);

        ctx.drawImage(

            image,

            -drawWidth / 2,
            -drawHeight / 2,

            drawWidth,
            drawHeight

        );

        if(imageSelected){

            ctx.strokeStyle = "#7b5cff";

            ctx.lineWidth = 4;

            ctx.strokeRect(

                -drawWidth / 2,
                -drawHeight / 2,

                drawWidth,
                drawHeight

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

        ctx.fillText(text.content,0,0);

        if(text === selectedText){

            const width = ctx.measureText(text.content).width;

            ctx.strokeStyle = "#7b5cff";

            ctx.lineWidth = 2;

            ctx.strokeRect(

                -width / 2 - 10,
                -text.size,

                width + 20,
                text.size + 20

            );

        }

        ctx.restore();

    });

}

// ======================
// Touch Start
// ======================

canvas.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    if(e.touches.length === 1 && !touchTargetLocked){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        // 当前文字已经选中
        // 并且再次点击当前文字
        // 不允许取消焦点


        // 点击其他文字

        const text = getTopText(x,y);

        if(text){

            selectedText = text;

            imageSelected = false;

            draggingText = true;

            draggingImage = false;

            textInput.value = text.content;

            draw();

            return;

        }

 // 当前已有文字选中
// 并且没有点击其它文字
// 不允许自动取消

if(selectedText){

    draggingText = true;

    draggingImage = false;

    imageSelected = false;

    draw();

    return;

}

// 真正空白状态
// 才允许进入图片

selectedText = null;

imageSelected = true;

draggingImage = true;

draggingText = false;

draw();
    }

    // 双指开始

    if(e.touches.length === 2){

        touchTargetLocked = true;

        initialPinchDistance = getDistance(

            e.touches[0],
            e.touches[1]

        );

        initialRotationAngle = getAngle(

            e.touches[0],
            e.touches[1]

        );

        // 文字状态

        if(selectedText){

            initialTextSize = selectedText.size;

            initialTextRotation = selectedText.rotation;

        }

        // 图片状态

        if(imageSelected){

            initialImageScale = imgScale;

            initialImageRotation = imgRotation;

        }

    }

});

// ======================
// Touch Move
// ======================

canvas.addEventListener("touchmove",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    // 单指拖动

    if(e.touches.length === 1){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        if(draggingText && selectedText){

            selectedText.x = x;
            selectedText.y = y;

        }

        if(draggingImage && imageSelected){

            imgX = x;
            imgY = y;

        }

        draw();

    }

    // 双指缩放旋转

    if(e.touches.length === 2){

        touchTargetLocked = true;

        const currentDistance = getDistance(

            e.touches[0],
            e.touches[1]

        );

        const currentAngle = getAngle(

            e.touches[0],
            e.touches[1]

        );

        const scale = currentDistance / initialPinchDistance;

        const rotationDelta =

        currentAngle - initialRotationAngle;

        // 文字

        if(selectedText){

            selectedText.size =

            initialTextSize * scale;

            selectedText.rotation =

            initialTextRotation + rotationDelta;

        }

        // 图片

        if(imageSelected){

            imgScale =

            initialImageScale * scale;

            imgRotation =

            initialImageRotation + rotationDelta;

        }

        draw();

    }

});

// ======================
// Touch End
// ======================

canvas.addEventListener("touchend",(e)=>{

    if(e.touches.length === 0){

        draggingText = false;

        draggingImage = false;

        touchTargetLocked = false;

    }

});

// 点击结束以后
// 强制停止文字拖动

canvas.addEventListener("touchcancel",()=>{

    draggingText = false;

    draggingImage = false;

});
// ======================
// 初始化
// ======================

updateLayerPanel();

draw();

// ======================
// 防止浏览器双指缩放
// ======================

document.addEventListener(

    "gesturestart",

    function(e){

        e.preventDefault();

    }

);

document.addEventListener(

    "gesturechange",

    function(e){

        e.preventDefault();

    }

);

document.addEventListener(

    "gestureend",

    function(e){

        e.preventDefault();

    }

);

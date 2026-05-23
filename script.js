const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const layerPanel = document.getElementById("layerPanel");

function resizeCanvas(){

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

}

resizeCanvas();

window.addEventListener("resize",()=>{

    resizeCanvas();
    draw();

});

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

let transformTarget = null;

let touchTargetLocked = false;

let initialPinchDistance = null;

let initialRotationAngle = null;

let initialTextSize = null;

let initialTextRotation = null;

let initialImageScale = null;

let initialImageRotation = null;

function resizeHitbox(text){

    const width = text.content.length * text.size * 0.5;

    return {

        left: text.x - width / 2,

        right: text.x + width / 2,

        top: text.y - text.size,

        bottom: text.y + text.size

    };

}

function pointInText(text,x,y){

    const box = resizeHitbox(text);

    return (

        x >= box.left &&
        x <= box.right &&
        y >= box.top &&
        y <= box.bottom

    );

}

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

upload.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        image = new Image();

        image.onload = function(){

            imgX = canvas.width / 2;

            imgY = canvas.height / 2;

            imageSelected = true;

            selectedText = null;

            updateLayerPanel();

            draw();

        };

        image.src = event.target.result;

    };

    reader.readAsDataURL(file);

});

addTextBtn.addEventListener("click",()=>{

    const offset = texts.length * 70;

    const text = {

        content:"双击编辑",

        x:canvas.width / 2,

        y:canvas.height / 2 + offset,

        size:60,

        rotation:0,

        color:"#ffffff",

        glow:20

    };

    texts.push(text);

    selectedText = text;

    imageSelected = false;

    textInput.value = text.content;

    updateLayerPanel();

    draw();

});

deleteTextBtn.addEventListener("click",()=>{

    if(!selectedText) return;

    texts = texts.filter(text => text !== selectedText);

    selectedText = null;

    updateLayerPanel();

    draw();

});

textInput.addEventListener("input",()=>{

    if(selectedText){

        selectedText.content = textInput.value;

        draw();

    }

});

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

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

canvas.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    if(e.touches.length === 1 && !touchTargetLocked){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;

        const y = touch.clientY - rect.top;

        if(selectedText && pointInText(selectedText,x,y)){

            draggingText = true;

            draggingImage = false;

            updateLayerPanel();

            draw();

            return;

        }

        const text = getTopText(x,y);

        if(text){

            selectedText = text;

            imageSelected = false;

            draggingText = true;

            draggingImage = false;

            textInput.value = text.content;

        }else{

            selectedText = null;

            imageSelected = true;

            draggingImage = true;

            draggingText = false;

        }

    }

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

        if(selectedText){

            transformTarget = selectedText;

            initialTextSize = selectedText.size;

            initialTextRotation = selectedText.rotation;

        }

        else if(imageSelected){

            transformTarget = "image";

            initialImageScale = imgScale;

            initialImageRotation = imgRotation;

        }

    }

    updateLayerPanel();

    draw();

});

canvas.addEventListener("touchmove",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

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

        const rotationDelta = currentAngle - initialRotationAngle;

        if(transformTarget === "image"){

            imgScale = initialImageScale * scale;

            imgRotation = initialImageRotation + rotationDelta;

        }

        if(transformTarget && transformTarget !== "image"){

            transformTarget.size = initialTextSize * scale;

            transformTarget.rotation =
            initialTextRotation + rotationDelta;

        }

        draw();

    }

});

canvas.addEventListener("touchend",(e)=>{

    if(e.touches.length === 0){

        draggingText = false;

        draggingImage = false;

        transformTarget = null;

        touchTargetLocked = false;

    }

});

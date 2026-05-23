const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const layerPanel = document.getElementById("layerPanel");

function resizeCanvas() {

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

}

resizeCanvas();

window.addEventListener("resize", () => {

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

let initialPinchDistance = null;

let initialTextSize = null;

let initialImageScale = null;

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

function getTopText(x,y){

    let clickedText = null;

    [...texts].reverse().forEach(text => {

        const width = text.content.length * text.size * 0.5;

        if(

            x > text.x - width / 2 &&
            x < text.x + width / 2 &&
            y > text.y - text.size &&
            y < text.y + text.size

        ){

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

    textInput.value = "";

    updateLayerPanel();

    draw();

});

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

    if(e.touches.length === 1){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;

        const y = touch.clientY - rect.top;

        const text = getTopText(x,y);

        if(text){

            selectedText = text;

            imageSelected = false;

            textInput.value = text.content;

            draggingText = true;

            draggingImage = false;

        }else{

            selectedText = null;

            imageSelected = true;

            draggingImage = true;

            draggingText = false;

        }

    }

    if(e.touches.length === 2){

        initialPinchDistance = getDistance(

            e.touches[0],

            e.touches[1]

        );

        if(imageSelected){

            selectedText = null;

            initialImageScale = imgScale;

        }

        if(selectedText){

            imageSelected = false;

            initialTextSize = selectedText.size;

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

        const scale = currentDistance / initialPinchDistance;

        if(imageSelected){

            imgScale = initialImageScale * scale;

        }

        if(selectedText){

            selectedText.size = initialTextSize * scale;

        }

        draw();

    }

});

canvas.addEventListener("touchend",()=>{

    draggingText = false;

    draggingImage = false;

});

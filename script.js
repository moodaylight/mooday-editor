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

const scaleSlider = document.getElementById("scaleSlider");

const rotateSlider = document.getElementById("rotateSlider");

const textSizeSlider = document.getElementById("textSizeSlider");

const textRotateSlider = document.getElementById("textRotateSlider");

const glowSlider = document.getElementById("glowSlider");

const colorPicker = document.getElementById("colorPicker");

let image = null;

let imgScale = 1;

let imgRotation = 0;

let texts = [];

let selectedText = null;

let draggingText = false;

function updateLayerPanel(){

    layerPanel.innerHTML = "";

    texts.forEach((text,index)=>{

        const item = document.createElement("div");

        item.className = "layer-item";

        if(text === selectedText){

            item.classList.add("active");

        }

        item.innerText = `文字 ${index + 1}`;

        item.onclick = ()=>{

            selectedText = text;

            textInput.value = text.content;

            updateControls();

            updateLayerPanel();

            draw();

        };

        layerPanel.appendChild(item);

    });

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

upload.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        image = new Image();

        image.onload = function(){

            const tempCanvas = document.createElement("canvas");

            const tempCtx = tempCanvas.getContext("2d");

            const maxSize = 1000;

            let width = image.width;

            let height = image.height;

            if(width > maxSize){

                height = height * (maxSize / width);

                width = maxSize;

            }

            tempCanvas.width = width;

            tempCanvas.height = height;

            tempCtx.drawImage(image, 0, 0, width, height);

            const compressedImage = new Image();

            compressedImage.onload = function(){

                image = compressedImage;

                draw();

            };

            compressedImage.src = tempCanvas.toDataURL("image/jpeg", 0.8);

        };

        image.src = event.target.result;

    };

    reader.readAsDataURL(file);

});

addTextBtn.addEventListener("click", () => {

    const offset = texts.length * 70;

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

    textInput.value = text.content;

    updateControls();

    updateLayerPanel();

    draw();

});

deleteTextBtn.addEventListener("click", () => {

    if(!selectedText) return;

    texts = texts.filter(text => text !== selectedText);

    selectedText = null;

    textInput.value = "";

    updateLayerPanel();

    draw();

});

moveUpBtn.addEventListener("click", () => {

    if(!selectedText) return;

    const index = texts.indexOf(selectedText);

    if(index < texts.length - 1){

        [texts[index], texts[index + 1]] =
        [texts[index + 1], texts[index]];

    }

    updateLayerPanel();

    draw();

});

moveDownBtn.addEventListener("click", () => {

    if(!selectedText) return;

    const index = texts.indexOf(selectedText);

    if(index > 0){

        [texts[index], texts[index - 1]] =
        [texts[index - 1], texts[index]];

    }

    updateLayerPanel();

    draw();

});

textInput.addEventListener("input", () => {

    if(selectedText){

        selectedText.content = textInput.value;

        updateLayerPanel();

        draw();

    }

});

function updateControls(){

    if(!selectedText) return;

    textSizeSlider.value = selectedText.size;

    textRotateSlider.value = selectedText.rotation;

    glowSlider.value = selectedText.glow;

    colorPicker.value = selectedText.color;

}

textSizeSlider.addEventListener("input", () => {

    if(selectedText){

        selectedText.size = Number(textSizeSlider.value);

        draw();

    }

});

textRotateSlider.addEventListener("input", () => {

    if(selectedText){

        selectedText.rotation = Number(textRotateSlider.value);

        draw();

    }

});

glowSlider.addEventListener("input", () => {

    if(selectedText){

        selectedText.glow = Number(glowSlider.value);

        draw();

    }

});

colorPicker.addEventListener("input", () => {

    if(selectedText){

        selectedText.color = colorPicker.value;

        draw();

    }

});

scaleSlider.addEventListener("input", () => {

    imgScale = Number(scaleSlider.value);

    draw();

});

rotateSlider.addEventListener("input", () => {

    imgRotation = Number(rotateSlider.value);

    draw();

});

function draw(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(image){

        const centerX = canvas.width / 2;

        const centerY = canvas.height / 2;

        const maxWidth = canvas.width * 0.8;

        const scale = maxWidth / image.width;

        const drawWidth = image.width * scale * imgScale;

        const drawHeight = image.height * scale * imgScale;

        ctx.save();

        ctx.translate(centerX, centerY);

        ctx.rotate(imgRotation * Math.PI / 180);

        ctx.drawImage(

            image,

            -drawWidth / 2,

            -drawHeight / 2,

            drawWidth,

            drawHeight

        );

        ctx.restore();

    }

    texts.forEach(text => {

        ctx.save();

        ctx.translate(text.x, text.y);

        ctx.rotate(text.rotation * Math.PI / 180);

        ctx.font = `${text.size}px sans-serif`;

        ctx.fillStyle = text.color;

        ctx.shadowColor = text.color;

        ctx.shadowBlur = text.glow;

        ctx.textAlign = "center";

        ctx.fillText(text.content, 0, 0);

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

canvas.addEventListener("mousedown", (e) => {

    const text = getTopText(e.offsetX,e.offsetY);

    if(text){

        selectedText = text;

        textInput.value = text.content;

        draggingText = true;

    }

    updateControls();

    updateLayerPanel();

    draw();

});

canvas.addEventListener("mousemove", (e) => {

    if(draggingText && selectedText){

        selectedText.x = e.offsetX;

        selectedText.y = e.offsetY;

        draw();

    }

});

canvas.addEventListener("mouseup", () => {

    draggingText = false;

});

canvas.addEventListener("touchstart", (e) => {

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    const touch = e.touches[0];

    const x = touch.clientX - rect.left;

    const y = touch.clientY - rect.top;

    const text = getTopText(x,y);

    if(text){

        selectedText = text;

        textInput.value = text.content;

        draggingText = true;

    }

    updateControls();

    updateLayerPanel();

    draw();

});

canvas.addEventListener("touchmove", (e) => {

    e.preventDefault();

    if(draggingText && selectedText){

        const rect = canvas.getBoundingClientRect();

        const touch = e.touches[0];

        selectedText.x = touch.clientX - rect.left;

        selectedText.y = touch.clientY - rect.top;

        draw();

    }

});

canvas.addEventListener("touchend", () => {

    draggingText = false;

});

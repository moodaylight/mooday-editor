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

let imgX = 0;

let imgY = 0;

let texts = [];

let selectedText = null;

let draggingText = false;

let draggingImage = false;

let initialPinchDistance = null;

let initialTextSize = null;

let initialImageScale = null;

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

                imgX = canvas.width / 2;

                imgY = canvas.height / 2;

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

function draw(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(image){

        const maxWidth = canvas.width * 0.8;

        const scale = maxWidth / image.width;

        const drawWidth = image.width * scale * imgScale;

        const drawHeight = image.height * scale * imgScale;

        ctx.save();

        ctx.translate(imgX, imgY);

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

        ctx.restore();

    });

}

canvas.addEventListener("touchstart", (e) => {

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    if(e.touches.length === 1){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;

        const y = touch.clientY - rect.top;

        const text = getTopText(x,y);

        if(text){

            selectedText = text;

            textInput.value = text.content;

            draggingText = true;

        }else{

            draggingImage = true;

        }

    }

    if(e.touches.length === 2){

        initialPinchDistance = getDistance(
            e.touches[0],
            e.touches[1]
        );

        if(selectedText){

            initialTextSize = selectedText.size;

        }else{

            initialImageScale = imgScale;

        }

    }

    updateLayerPanel();

    draw();

});

canvas.addEventListener("touchmove", (e) => {

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

        if(draggingImage){

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

        if(selectedText){

            selectedText.size = initialTextSize * scale;

        }else{

            imgScale = initialImageScale * scale;

        }

        draw();

    }

});

canvas.addEventListener("touchend", () => {

    draggingText = false;

    draggingImage = false;

});

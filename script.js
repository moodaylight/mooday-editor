const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
const textInput = document.getElementById("textInput");

const scaleSlider = document.getElementById("scaleSlider");
const rotateSlider = document.getElementById("rotateSlider");

const textSizeSlider = document.getElementById("textSizeSlider");
const textRotateSlider = document.getElementById("textRotateSlider");

const glowSlider = document.getElementById("glowSlider");
const colorPicker = document.getElementById("colorPicker");

let image = null;

let imgX = 0;
let imgY = 0;
let imgScale = 1;
let imgRotation = 0;

let texts = [];
let selectedText = null;

upload.addEventListener("change", e => {

```
const file = e.target.files[0];

if (!file) return;

const reader = new FileReader();

reader.onload = function(event){

    image = new Image();

    image.onload = function(){

        imgX = canvas.width / 2;
        imgY = canvas.height / 2;

        draw();
    };

    image.src = event.target.result;
};

reader.readAsDataURL(file);
```

});

addTextBtn.addEventListener("click", () => {

```
const text = {
    content:textInput.value || "MOODAY",
    x:canvas.width/2,
    y:canvas.height/2,
    size:60,
    rotation:0,
    color:"#ffffff",
    glow:20
};

texts.push(text);

selectedText = text;

updateControls();

draw();
```

});

function updateControls(){

```
if(!selectedText) return;

textSizeSlider.value = selectedText.size;
textRotateSlider.value = selectedText.rotation;
glowSlider.value = selectedText.glow;
colorPicker.value = selectedText.color;
```

}

textSizeSlider.addEventListener("input", ()=>{

```
if(selectedText){

    selectedText.size = Number(textSizeSlider.value);
    draw();
}
```

});

textRotateSlider.addEventListener("input", ()=>{

```
if(selectedText){

    selectedText.rotation = Number(textRotateSlider.value);
    draw();
}
```

});

glowSlider.addEventListener("input", ()=>{

```
if(selectedText){

    selectedText.glow = Number(glowSlider.value);
    draw();
}
```

});

colorPicker.addEventListener("input", ()=>{

```
if(selectedText){

    selectedText.color = colorPicker.value;
    draw();
}
```

});

scaleSlider.addEventListener("input", ()=>{

```
imgScale = Number(scaleSlider.value);
draw();
```

});

rotateSlider.addEventListener("input", ()=>{

```
imgRotation = Number(rotateSlider.value);
draw();
```

});

function draw(){

```
ctx.clearRect(0,0,canvas.width,canvas.height);

if(image){

    ctx.save();

    ctx.translate(imgX,imgY);

    ctx.scale(imgScale,imgScale);

    ctx.rotate(imgRotation * Math.PI / 180);

    const maxWidth = canvas.width * 0.7;

    const scale = maxWidth / image.width;

    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;

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
            -width/2 -10,
            -text.size,
            width+20,
            text.size+20
        );
    }

    ctx.restore();
});
```

}

let draggingText = false;

canvas.addEventListener("mousedown", e => {

```
const x = e.offsetX;
const y = e.offsetY;

draggingText = false;
selectedText = null;

texts.forEach(text => {

    const width = text.content.length * text.size * 0.5;

    if(
        x > text.x - width/2 &&
        x < text.x + width/2 &&
        y > text.y - text.size &&
        y < text.y + text.size
    ){
        selectedText = text;
        draggingText = true;
    }

});

updateControls();

draw();
```

});

canvas.addEventListener("mousemove", e => {

```
if(draggingText && selectedText){

    selectedText.x = e.offsetX;
    selectedText.y = e.offsetY;

    draw();
}
```

});

canvas.addEventListener("mouseup", ()=>{

```
draggingText = false;
```

});

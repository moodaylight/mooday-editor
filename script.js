const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const layerPanel = document.getElementById("layerPanel");

function resizeCanvas(){

```
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
```

}

resizeCanvas();

window.addEventListener("resize",()=>{

```
resizeCanvas();
draw();
```

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

```
const width = text.content.length * text.size * 0.5;

return {

    left: text.x - width / 2,
    right: text.x + width / 2,
    top: text.y - text.size,
    bottom: text.y + text.size

};
```

}

function pointInText(text,x,y){

```
const box = resizeHitbox(text);

return (

    x >= box.left &&
    x <= box.right &&
    y >= box.top &&
    y <= box.bottom

);
```

}

function updateLayerPanel(){

```
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

        selectedText =
```

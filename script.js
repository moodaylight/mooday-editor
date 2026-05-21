const uploadInput = document.getElementById("uploadInput");
const photoLayer = document.getElementById("photoLayer");
const photoImg = document.getElementById("photoImg");

const textInput = document.getElementById("textInput");
const textLayer = document.getElementById("textLayer");

const scaleSlider = document.getElementById("scaleSlider");
const rotateSlider = document.getElementById("rotateSlider");
const textSizeSlider = document.getElementById("textSizeSlider");

let scale = 1;
let rotation = 0;

let posX = 0;
let posY = 0;

let startX = 0;
let startY = 0;

let dragging = false;

let initialDistance = 0;
let initialAngle = 0;

let startScale = 1;
let startRotation = 0;

uploadInput.addEventListener("change",(e)=>{

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(event){

photoImg.src = event.target.result;

};

reader.readAsDataURL(file);

});

function updateTransform(){

photoLayer.style.transform = `
translate(-50%,-50%)
translate(${posX}px,${posY}px)
scale(${scale})
rotate(${rotation}deg)
`;

scaleSlider.value = scale;
rotateSlider.value = rotation;

}

function getDistance(t1,t2){

const dx = t2.clientX - t1.clientX;
const dy = t2.clientY - t1.clientY;

return Math.sqrt(dx*dx + dy*dy);

}

function getAngle(t1,t2){

return Math.atan2(
t2.clientY - t1.clientY,
t2.clientX - t1.clientX
) * 180 / Math.PI;

}

photoLayer.addEventListener("touchstart",(e)=>{

if(e.touches.length===1){

dragging = true;

startX = e.touches[0].clientX - posX;
startY = e.touches[0].clientY - posY;

}

if(e.touches.length===2){

initialDistance = getDistance(
e.touches[0],
e.touches[1]
);

initialAngle = getAngle(
e.touches[0],
e.touches[1]
);

startScale = scale;
startRotation = rotation;

}

});

photoLayer.addEventListener("touchmove",(e)=>{

e.preventDefault();

if(e.touches.length===1 && dragging){

posX = e.touches[0].clientX - startX;
posY = e.touches[0].clientY - startY;

updateTransform();

}

if(e.touches.length===2){

const currentDistance = getDistance(
e.touches[0],
e.touches[1]
);

const currentAngle = getAngle(
e.touches[0],
e.touches[1]
);

scale = startScale * (
currentDistance / initialDistance
);

rotation = startRotation + (
currentAngle - initialAngle
);

updateTransform();

}

},{ passive:false });

window.addEventListener("touchend",()=>{

dragging = false;

});

scaleSlider.addEventListener("input",(e)=>{

scale = parseFloat(e.target.value);

updateTransform();

});

rotateSlider.addEventListener("input",(e)=>{

rotation = parseFloat(e.target.value);

updateTransform();

});

textInput.addEventListener("input",(e)=>{

textLayer.innerText =
e.target.value || "MOODAY";

});

textSizeSlider.addEventListener("input",(e)=>{

textLayer.style.fontSize =
e.target.value + "px";

});

document.getElementById("submitBtn")
.addEventListener("click",()=>{

alert("制作已提交");

});

updateTransform();

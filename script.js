const uploadInput = document.getElementById("uploadInput");
const photoLayer = document.getElementById("photoLayer");
const photoImg = document.getElementById("photoImg");

const textInput = document.getElementById("textInput");
const textLayer = document.getElementById("textLayer");

const scaleSlider = document.getElementById("scaleSlider");
const rotateSlider = document.getElementById("rotateSlider");
const textSizeSlider = document.getElementById("textSizeSlider");

let currentScale = 1;
let currentRotation = 0;

let posX = 0;
let posY = 0;

let startX = 0;
let startY = 0;

let dragging = false;

uploadInput.addEventListener("change",(e)=>{

  const file = e.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = function(event){

    photoImg.src = event.target.result;

    photoLayer.style.width = "100%";
    photoLayer.style.height = "100%";

    updateTransform();

  };

  reader.readAsDataURL(file);

});

function updateTransform(){

  photoLayer.style.transform =
  `
  translate(-50%,-50%)
  translate(${posX}px,${posY}px)
  scale(${currentScale})
  rotate(${currentRotation}deg)
  `;

}

scaleSlider.addEventListener("input",(e)=>{

  currentScale = e.target.value;

  updateTransform();

});

rotateSlider.addEventListener("input",(e)=>{

  currentRotation = e.target.value;

  updateTransform();

});

photoLayer.addEventListener("pointerdown",(e)=>{

  dragging = true;

  startX = e.clientX - posX;
  startY = e.clientY - posY;

});

window.addEventListener("pointermove",(e)=>{

  if(!dragging) return;

  posX = e.clientX - startX;
  posY = e.clientY - startY;

  updateTransform();

});

window.addEventListener("pointerup",()=>{

  dragging = false;

});

textInput.addEventListener("input",(e)=>{

  textLayer.innerText = e.target.value || "MOODAY";

});

textSizeSlider.addEventListener("input",(e)=>{

  textLayer.style.fontSize = e.target.value + "px";

});

document.getElementById("submitBtn").addEventListener("click",()=>{

  alert("提交成功（下一步接入上传系统）");

});

// =====================
// 图片系统
// =====================

let image = new Image();

let originalImage = null;

image.src = "default.png";

// =====================
// 图片状态
// =====================

let imgX = 0;

let imgY = 0;

let imgScale = 1;

let imgRotation = 0;

let imageSelected = false;

let initialImageScale = 1;

function fitImageCover(){

    if(!image) return;

    let frameWidth;
    let frameHeight;

    let visibleWidth;
    let visibleHeight;

    if(currentProduct === "mirror"){

        frameWidth = 12;
        frameHeight = 17.5;

        visibleWidth = 9.8;
        visibleHeight = 15.3;

    }

    if(
    currentProduct === "photo"
    ||
    currentProduct === "frame"
    ||
    currentProduct === "idcard"
){

        frameWidth = 4;
        frameHeight = 6;

        visibleWidth = 4;
        visibleHeight = 6;

    }

const marginX = 0;

const outerW =
canvas.width - marginX * 2;

const outerH =
canvas.height - marginX * 2;

    const visibleRatioX =
    visibleWidth / frameWidth;

    const visibleRatioY =
    visibleHeight / frameHeight;

    const visibleW =
    outerW * visibleRatioX;

    const visibleH =
    outerH * visibleRatioY;

    const scaleX =
    visibleW / image.width;

    const scaleY =
    visibleH / image.height;

    imgScale =
    Math.max(scaleX, scaleY);

}
function resetImagePosition(){

    imgX = canvas.width / 2;

    imgY = canvas.height / 2;

}
uploadBtn.onclick = ()=>{

    upload.click();

};
upload.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

reader.onload = function(event){

    image = new Image();

    originalImage = image;

image.onload = function(){

    fitImageCover();

    resetImagePosition();

    imgRotation = 0;

    imageSelected = true;

    selectedText = null;

    draw();

};

        image.src = event.target.result;

    };

    reader.readAsDataURL(file);

});

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

    if(productType === "mirror"){

        frameWidth = 12;
        frameHeight = 17.5;

        visibleWidth = 9.8;
        visibleHeight = 15.3;

    }

    if(productType === "photo"){

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

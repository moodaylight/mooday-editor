function drawGuideLines(){
const guide =

GUIDE_CONFIG[
    currentIdPhoto
];

if(!guide){

    return;

}
    ctx.save();

    ctx.strokeStyle =
    "rgba(0,255,100,0.9)";

    ctx.lineWidth = 2;

let topMin;
let topMax;
let bottomMin;
let bottomMax;

if(
    guide.type ===
    "headHeight"
){

    const minRatio =
    guide.headMinRatio;

    const maxRatio =
    guide.headMaxRatio;

    const centerY =

    exportVisibleY +
    exportVisibleH / 2;

    const minHeadHeight =

    exportVisibleH *
    minRatio;

    const maxHeadHeight =

    exportVisibleH *
    maxRatio;

    topMin =
    centerY -
    maxHeadHeight / 2;

    topMax =
    centerY -
    minHeadHeight / 2;

    bottomMin =
    centerY +
    minHeadHeight / 2;

    bottomMax =
    centerY +
    maxHeadHeight / 2;

}else{

    topMin =
    exportVisibleY +
    exportVisibleH * 0.12;

    topMax =
    exportVisibleY +
    exportVisibleH * 0.16;

    bottomMin =
    exportVisibleY +
    exportVisibleH * 0.72;

    bottomMax =
    exportVisibleY +
    exportVisibleH * 0.76;

}

    ctx.beginPath();

    ctx.moveTo(
        exportVisibleX,
        topMin
    );

    ctx.lineTo(
        exportVisibleX +
        exportVisibleW,
        topMin
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        exportVisibleX,
        topMax
    );

    ctx.lineTo(
        exportVisibleX +
        exportVisibleW,
        topMax
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        exportVisibleX,
        bottomMin
    );

    ctx.lineTo(
        exportVisibleX +
        exportVisibleW,
        bottomMin
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        exportVisibleX,
        bottomMax
    );

    ctx.lineTo(
        exportVisibleX +
        exportVisibleW,
        bottomMax
    );

    ctx.stroke();

    ctx.restore();

}

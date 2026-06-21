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

        const minHeadHeight =

        exportVisibleH *
        minRatio;

        const maxHeadHeight =

        exportVisibleH *
        maxRatio;

const centerY =

exportVisibleY +
exportVisibleH / 2;

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
const targetTop =

exportVisibleY +
exportVisibleH * 0.10;

const offset =

topMin - targetTop;

topMin -= offset;
topMax -= offset;
bottomMin -= offset;
bottomMax -= offset;
    }else{

        topMin =
        exportVisibleY +
        exportVisibleH * 0.08;

        topMax =
        topMin;

        bottomMin =
        exportVisibleY +
        exportVisibleH * 0.82;

        bottomMax =
        bottomMin;

    }

    const centerX =

    exportVisibleX +
    exportVisibleW / 2;

    ctx.beginPath();

    ctx.moveTo(
        centerX,
        exportVisibleY
    );

    ctx.lineTo(
        centerX,
        exportVisibleY +
        exportVisibleH
    );

    ctx.stroke();

    if(
        guide.type ===
        "headHeight"
    ){

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

    }else{

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
            bottomMin
        );

        ctx.lineTo(
            exportVisibleX +
            exportVisibleW,
            bottomMin
        );

        ctx.stroke();

    }

    ctx.restore();

}

function drawGuideLines(){

    ctx.save();

    ctx.strokeStyle =
    "rgba(0,255,100,0.9)";

    ctx.lineWidth = 2;

    const topMin =
    exportVisibleY +
    exportVisibleH * 0.12;

    const topMax =
    exportVisibleY +
    exportVisibleH * 0.16;

    const bottomMin =
    exportVisibleY +
    exportVisibleH * 0.72;

    const bottomMax =
    exportVisibleY +
    exportVisibleH * 0.76;

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

// =====================
// 边框系统
// Frame Core
// =====================

let frameMode = 0;

// 0 无边框
// 1 白边
// 2 黑边
// 3 拍立得
// 4 木纹
// 5 金属

function applyFrame(w,h){
console.log("applyFrame", frameMode);
    switch(frameMode){

        case 0:
            drawNoFrame();
            break;

        case 1:
            drawWhiteFrame(w,h);
            break;

        case 2:
            drawBlackFrame();
            break;

        case 3:
            drawPolaroidFrame();
            break;

        case 4:
            drawWoodFrame();
            break;

        case 5:
            drawMetalFrame();
            break;

    }

}

function drawNoFrame(){

}

function drawWhiteFrame(w,h){
console.log("w=",w,"h=",h);
    ctx.save();

    ctx.fillStyle = "red";

    ctx.fillRect(-20,-20,40,40);

    ctx.restore();

}

function drawBlackFrame(){

}

function drawPolaroidFrame(){

}

function drawWoodFrame(){

}

function drawMetalFrame(){

}

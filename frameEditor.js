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

function applyFrame(){

    switch(frameMode){

        case 0:
            drawNoFrame();
            break;

        case 1:
            drawWhiteFrame();
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

function drawWhiteFrame(){

}

function drawBlackFrame(){

}

function drawPolaroidFrame(){

}

function drawWoodFrame(){

}

function drawMetalFrame(){

}

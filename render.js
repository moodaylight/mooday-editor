// render.js
// Canvas绘制系统
// draw()
// drawFrame()
// 画布渲染
let exportVisibleX = 0;
let exportVisibleY = 0;
let exportVisibleW = 0;
let exportVisibleH = 0;
function draw(){


    ctx.clearRect(0,0,canvas.width,canvas.height);
   
    if(productType === "mirror"){

        drawFrame();

    }
if(productType === "photo"){

    drawPhotoFrame();

}
 // 图片

if(image){

    // =====================
    // 真实尺寸
    // =====================
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

    // =====================
    // 外边距
    // =====================

    const marginX = 20;
    const marginTop = 10;

    // =====================
    // 外框尺寸
    // =====================

    const outerW =
    canvas.width - marginX * 2;

    const outerH =
    canvas.height - marginX * 2;

    // =====================
    // 可视区域比例
    // =====================

    const visibleRatioX =
    visibleWidth / frameWidth;

    const visibleRatioY =
    visibleHeight / frameHeight;

    // =====================
    // 可视区域大小
    // =====================

    const visibleW =
    outerW * visibleRatioX;

    const visibleH =
    outerH * visibleRatioY;

    // =====================
    // 可视区域位置
    // =====================

    const visibleX =
    (canvas.width - visibleW) / 2;

    const visibleY =
    marginTop + (outerH - visibleH) / 2;
exportVisibleX = visibleX;
exportVisibleY = visibleY;
exportVisibleW = visibleW;
exportVisibleH = visibleH;
    // =====================
    // 图片真实尺寸
    // =====================

    const w =
    image.width * imgScale;

    const h =
    image.height * imgScale;

    // =====================
    // 防止露白（边界限制）
    // =====================

    const minX =
    visibleX + visibleW - w / 2;

    const maxX =
    visibleX + w / 2;

    const minY =
    visibleY + visibleH - h / 2;

    const maxY =
    visibleY + h / 2;

   imgX = Math.max(
    minX,
    Math.min(maxX, imgX)
);

imgY = Math.max(
    minY,
    Math.min(maxY, imgY)
);
    // =====================
    // 裁切区域
    // =====================

    ctx.save();

    ctx.beginPath();

    roundRect(
        visibleX,
        visibleY,
        visibleW,
        visibleH,
        18
    );
// =====================
// 可编辑区域边框
// =====================

ctx.strokeStyle = "rgba(255,255,255,0.35)";

ctx.lineWidth = 1.5;

roundRect(
    visibleX,
    visibleY,
    visibleW,
    visibleH,
    18
);

ctx.stroke();
    ctx.clip();

// =====================
// 绘制图片
// =====================

ctx.translate(imgX,imgY);

// =====================
// 氛围系统
// =====================

if(true){

    ctx.filter =
    "grayscale(100%)";

}else{

    ctx.filter = "none";

}

if(lightMode !== 3){

ctx.drawImage(

    image,

    -w / 2,
    -h / 2,
    w,
    h

);

}

if(moodMode === 1){

    ctx.fillStyle =
    "rgba(255,210,120,0.18)";

    ctx.fillRect(

        -w / 2,
        -h / 2,
        w,
        h

    );

}    

    if(moodMode === 2){

    ctx.fillStyle =
    "rgba(30,40,60,0.12)";

    ctx.fillRect(

        -w / 2,
        -h / 2,
        w,
        h

    );

}
 
 if(moodMode === 3){

    ctx.fillStyle =
    "rgba(220,230,240,0.12)";

    ctx.fillRect(

        -w / 2,
        -h / 2,
        w,
        h

    );

}   
if(moodMode === 4){

    ctx.fillStyle =
    "rgba(120,180,255,0.10)";

    ctx.fillRect(

        -w / 2,
        -h / 2,
        w,
        h

    );

}
    ctx.filter = "none";
// =====================
// 暖光
// =====================

if(lightMode === 1){

    ctx.fillStyle =
    "rgba(255,210,120,0.18)";

    ctx.fillRect(
        -w / 2,
        -h / 2,
        w,
        h
    );

}

// =====================
// 日光
// =====================

if(lightMode === 2){

    ctx.fillStyle =
    "rgba(255,255,255,0.12)";

    ctx.fillRect(
        -w / 2,
        -h / 2,
        w,
        h
    );

}

// =====================
// 镜子模式
// =====================

if(lightMode === 3){

    // 深黑镜面

    ctx.fillStyle =
    "rgba(70,70,70,0.72)";

    ctx.fillRect(
        -w / 2,
        -h / 2,
        w,
        h
    );

    // 顶部镜面反光

    const mirrorGlow =
    ctx.createLinearGradient(
        0,
        -h / 2,
        0,
        h / 2
    );

    mirrorGlow.addColorStop(
        0,
        "rgba(255,255,255,0.14)"
    );

    mirrorGlow.addColorStop(
        0.08,
        "rgba(255,255,255,0.05)"
    );

    mirrorGlow.addColorStop(
        0.2,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle = mirrorGlow;

    ctx.fillRect(
        -w / 2,
        -h / 2,
        w,
        h
    );

}

ctx.restore();

} 

    // 文字

    texts.forEach(text=>{

        ctx.save();

ctx.translate(

    text.x || 0,

    text.y || 0

);

ctx.rotate(

    (text.rotation || 0)

    * Math.PI / 180

);

ctx.font =

`${text.size || 20}px sans-serif`;

ctx.fillStyle =

text.color || "#ffffff";

                  
        ctx.textAlign = "center";

        ctx.textBaseline = "middle";
        
    let lines = [];

String(
    text.content || ""
)
.split("\n")
.forEach(part=>{

    if(part.length <= 8){

        lines.push(part);

    }else{

        for(
            let i = 0;
            i < part.length;
            i += 8
        ){

            lines.push(

                part.substring(
                    i,
                    i + 8
                )

            );

        }

    }

});

lines.forEach((line,index)=>{

    ctx.fillText(

        line,

        0,

        index *
((text.size || 20) + 6)

    );

});

        ctx.restore();

    });


decorations.forEach(item=>{

    ctx.save();

    ctx.font =
    `${item.size}px sans-serif`;

    ctx.fillStyle =
    "#ffffff";

    ctx.textAlign =
    "center";

    ctx.textBaseline =
    "middle";

    ctx.fillText(

        item.content,

        item.x,

        item.y

    );

    ctx.restore();

});

}
function drawPhotoFrame(){

    ctx.strokeStyle =
    "rgba(255,255,255,0.35)";

    ctx.lineWidth = 1.5;

    const photoW = 260;
    const photoH = 390;

    const photoX =
    (canvas.width - photoW) / 2;

    const photoY =
    (canvas.height - photoH) / 2;

    ctx.strokeRect(
        photoX,
        photoY,
        photoW,
        photoH
    );

}

function drawFrame(){

    // =====================
    // 实际尺寸
    // =====================

    const frameWidth = 12;
    const frameHeight = 17.5;

    const visibleWidth = 9.8;
    const visibleHeight = 15.3;

    // =====================
    // 边框真实结构
    // =====================

    // 总边框 11mm
    // 外凸 7.5mm
    // 内凹 3.5mm

    const outerFrameSize = 7.5;
    const innerFrameSize = 3.5;

    // =====================
    // 外边距
    // =====================

    const marginX = 20;
    const marginTop = 10;

    // =====================
    // 外框尺寸
    // =====================

    const outerX = marginX;
    const outerY = marginTop;

    const outerW =
    canvas.width - marginX * 2;

    const outerH =
    canvas.height - marginX * 2;

    // =====================
    // 可视区域比例
    // =====================

    const visibleRatioX =
    visibleWidth / frameWidth;

    const visibleRatioY =
    visibleHeight / frameHeight;

    const visibleW =
    outerW * visibleRatioX;

    const visibleH =
    outerH * visibleRatioY;

    // =====================
    // 可视区域位置
    // =====================

    const visibleX =
    (canvas.width - visibleW) / 2;

    const visibleY =
    outerY + (outerH - visibleH) / 2;

    // =====================
    // 边框比例计算
    // =====================

    const totalFrame =
    outerFrameSize + innerFrameSize;

    const outerRatio =
    outerFrameSize / totalFrame;

    const innerRatio =
    innerFrameSize / totalFrame;

    const frameThickness =
    (outerW - visibleW) / 2;

    const outerThickness =
    frameThickness * outerRatio;

    const innerThickness =
    frameThickness * innerRatio;

    // =====================
    // 外框
    // =====================

    ctx.shadowColor =
    "rgba(0,0,0,0.20)";

    ctx.shadowBlur = 5;

    ctx.shadowOffsetY = 2;

    const frameGradient =
    ctx.createLinearGradient(
        outerX,
        outerY,
        outerX,
        outerY + outerH
    );

    frameGradient.addColorStop(
        0,
        "#fafafa"
    );

    frameGradient.addColorStop(
        1,
        "#ececec"
    );

    ctx.fillStyle = frameGradient;

    roundRect(
        outerX,
        outerY,
        outerW,
        outerH,
        35
    );

    // =====================
    // 清除阴影
    // =====================

    ctx.shadowBlur = 0;

    ctx.shadowColor =
    "transparent";

    // =====================
    // 内凹灰框
    // =====================

    ctx.fillStyle = "#d4d4d4";

    roundRect(
        visibleX - innerThickness,
        visibleY - innerThickness,
        visibleW + innerThickness * 2,
        visibleH + innerThickness * 2,
        24
    );

    // =====================
    // 内凹下边暗边
    // =====================

    ctx.fillStyle =
    "rgba(0,0,0,0.12)";

    roundRect(
        visibleX + 8,
        visibleY + visibleH + 1,
        visibleW - 16,
        2,
        2
    );

    // =====================
    // 黑镜区域
    // =====================

    ctx.fillStyle = "#1a1a1a";

    roundRect(
    visibleX - 1,
    visibleY - 1,
    visibleW + 2,
    visibleH + 2,
    18
);
}

function roundRect(x,y,w,h,r){

    ctx.beginPath();

    ctx.moveTo(x+r,y);

    ctx.lineTo(x+w-r,y);

    ctx.quadraticCurveTo(x+w,y,x+w,y+r);

    ctx.lineTo(x+w,y+h-r);

    ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);

    ctx.lineTo(x+r,y+h);

    ctx.quadraticCurveTo(x,y+h,x,y+h-r);

    ctx.lineTo(x,y+r);

    ctx.quadraticCurveTo(x,y,x+r,y);

    ctx.closePath();

    ctx.fill();

}

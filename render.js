// render.js
// Canvas绘制系统
// draw()
// drawFrame()
// 画布渲染
function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
   
    drawFrame();
   
    // 图片

   if(image){

    // =====================
    // 真实尺寸
    // =====================

    const frameWidth = 12;
    const frameHeight = 17.5;

    const visibleWidth = 9.8;
    const visibleHeight = 15.3;

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
if(lightMode !== 3){
ctx.drawImage(
    image,
    -w / 2,
    -h / 2,
    w,
    h
);
}
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

        ctx.translate(text.x,text.y);

        ctx.rotate(text.rotation * Math.PI / 180);

        ctx.font = `${text.size}px sans-serif`;

        ctx.fillStyle = text.color;

                  
        ctx.textAlign = "center";

        ctx.textBaseline = "middle";
        
        ctx.fillText(text.content,0,0);

        ctx.restore();

    });

}

canvas.addEventListener("touchmove",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    if(e.touches.length === 1){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        if(draggingText && selectedText){

            selectedText.x = x;
            selectedText.y = y;

        }

        if(draggingImage && imageSelected){

            imgX = x;
            imgY = y;

        }

        draw();

    }

    if(e.touches.length === 2){

        touchTargetLocked = true;

        const currentDistance = getDistance(

            e.touches[0],
            e.touches[1]

        );

        const currentAngle = getAngle(

            e.touches[0],
            e.touches[1]

        );

        const scale = currentDistance / initialPinchDistance;

        const rotationDelta =

        currentAngle - initialRotationAngle;

        if(selectedText){

            selectedText.size =

            initialTextSize * scale;

            selectedText.rotation =

            initialTextRotation + rotationDelta;

        }

        if(imageSelected){

            imgScale =

            initialImageScale * scale;

            imgRotation =

            initialImageRotation + rotationDelta;

        }

        draw();

    }

});

canvas.addEventListener("touchend",(e)=>{

    if(e.touches.length === 0){

        draggingText = false;
        draggingImage = false;

        touchTargetLocked = false;

    }

});

updateLayerPanel();

draw();

canvas.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    if(e.touches.length === 1 && !touchTargetLocked){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        // 当前文字已经选中
        // 并且再次点击的是当前文字区域
        // 保持焦点不消失

        if(selectedText && pointInText(selectedText,x,y)){

            draggingText = true;

            draggingImage = false;

            imageSelected = false;

            draw();

            return;

        }

        // 点击其他文字

        const text = getTopText(x,y);

        if(text){

            selectedText = text;

            imageSelected = false;

            draggingText = true;

            draggingImage = false;

            textInput.value = text.content;

            draw();

            return;

        }

        // 点击空白区域
        // 才切换图片

        selectedText = null;

        imageSelected = true;

        draggingImage = true;

        draggingText = false;

        draw();

    }

    // 双指开始

    if(e.touches.length === 2){

        touchTargetLocked = true;

        initialPinchDistance = getDistance(

            e.touches[0],
            e.touches[1]

        );

        initialRotationAngle = getAngle(

            e.touches[0],
            e.touches[1]

        );

        // 文字编辑状态

        if(selectedText){

            initialTextSize = selectedText.size;

            initialTextRotation = selectedText.rotation;

        }

        // 图片编辑状态

        if(imageSelected){

            initialImageScale = imgScale;

            initialImageRotation = imgRotation;

        }

    }

});

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // 图片

    if(image){

        const drawWidth = image.width * imgScale;
        const drawHeight = image.height * imgScale;

        ctx.save();

        ctx.translate(imgX,imgY);

        ctx.rotate(imgRotation * Math.PI / 180);

        ctx.drawImage(

            image,

            -drawWidth / 2,
            -drawHeight / 2,

            drawWidth,
            drawHeight

        );

        // 图片选中框

        if(imageSelected){

            ctx.strokeStyle = "#7b5cff";

            ctx.lineWidth = 4;

            ctx.strokeRect(

                -drawWidth / 2,
                -drawHeight / 2,

                drawWidth,
                drawHeight

            );

        }

        ctx.restore();

    }

    // 文字图层

    texts.forEach(text=>{

        ctx.save();

        ctx.translate(text.x,text.y);

        ctx.rotate(text.rotation * Math.PI / 180);

        ctx.font = `${text.size}px sans-serif`;

        ctx.fillStyle = text.color;

        ctx.shadowColor = text.color;

        ctx.shadowBlur = text.glow;

        ctx.textAlign = "center";

        ctx.fillText(text.content,0,0);

        // 当前选中文字框

        if(text === selectedText){

            const width = ctx.measureText(text.content).width;

            ctx.strokeStyle = "#7b5cff";

            ctx.lineWidth = 2;

            ctx.strokeRect(

                -width / 2 - 10,
                -text.size,

                width + 20,
                text.size + 20

            );

        }

        ctx.restore();

    });

}

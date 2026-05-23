canvas.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    if(e.touches.length === 1 && !touchTargetLocked){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;

        const y = touch.clientY - rect.top;

        // 当前文字已经选中
        // 并且再次点击的还是当前文字区域
        // 直接保持状态
        // 不允许切换图片

        if(selectedText && pointInText(selectedText,x,y)){

            draggingText = true;

            draggingImage = false;

            imageSelected = false;

            updateLayerPanel();

            draw();

            return;

        }

        // 检测是否点击了其他文字

        const text = getTopText(x,y);

        if(text){

            selectedText = text;

            imageSelected = false;

            draggingText = true;

            draggingImage = false;

            textInput.value = text.content;

            updateLayerPanel();

            draw();

            return;

        }

        // 点击空白区域
        // 才切换到图片

        selectedText = null;

        imageSelected = true;

        draggingImage = true;

        draggingText = false;

    }

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

        if(selectedText){

            transformTarget = selectedText;

            initialTextSize = selectedText.size;

            initialTextRotation = selectedText.rotation;

        }

        else if(imageSelected){

            transformTarget = "image";

            initialImageScale = imgScale;

            initialImageRotation = imgRotation;

        }

    }

    updateLayerPanel();

    draw();

});

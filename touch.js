touch.js
function getDistance(t1,t2){

    const dx = t2.clientX - t1.clientX;

    const dy = t2.clientY - t1.clientY;

    return Math.sqrt(dx * dx + dy * dy);

}

// =====================
// 双指角度
// =====================

function getAngle(t1,t2){

    return Math.atan2(

        t2.clientY - t1.clientY,

        t2.clientX - t1.clientX

    ) * 180 / Math.PI;

}

canvas.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    // 双指初始化

    if(e.touches.length === 2){

        initialPinchDistance = getDistance(

            e.touches[0],

            e.touches[1]

        );

        initialRotationAngle = getAngle(

            e.touches[0],

            e.touches[1]

        );

        

        if(imageSelected){

            initialImageScale = imgScale;


        }

        return;

    }

    // 单指

    const touch = e.touches[0];

    const x = touch.clientX - rect.left;

    const y = touch.clientY - rect.top;

    // 判断文字

    const clickedText = getTopText(x,y);

    // 点击文字

if(clickedText){

    selectedText = clickedText;

    imageSelected = false;

    draggingText = true;

    textOffsetX = x - clickedText.x;

    textOffsetY = y - clickedText.y;

    draggingImage = false;

    // 长按进入编辑

    longPressTimer = setTimeout(()=>{

       if(draggingText){

            textInput.style.display = "block";

            textInput.value = clickedText.content;

            textInput.focus();

        }

    },600);

    draw();

    return;

}
    // 点击空白

imageSelected = true;

selectedText = null;

draggingImage = true;

draggingText = false;

dragOffsetX = x - imgX;

dragOffsetY = y - imgY;



draw();    

});

// =====================
// UTILS MODULE
// =====================
// 是否点中文字
// =====================

function pointInText(text,x,y){

    const box = getTextBounds(text);

    return (

        x >= box.left &&
        x <= box.right &&
        y >= box.top &&
        y <= box.bottom

    );

}

// =====================
// 获取顶部文字
// =====================

function getTopText(x,y){

    for(let i = texts.length - 1; i >= 0; i--){

 if(pointInText(texts[i],x,y)){

    selectedTextIndex = i;

    return texts[i];

}       

    }

    return null;

}

function getDistance(t1,t2){

    const dx = t2.clientX - t1.clientX;

    const dy = t2.clientY - t1.clientY;

    return Math.sqrt(dx * dx + dy * dy);

}

function getAngle(t1,t2){

    return Math.atan2(

        t2.clientY - t1.clientY,

        t2.clientX - t1.clientX

    ) * 180 / Math.PI;

}

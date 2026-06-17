function applyTemplate(index){

let currentTemplates =
familyTemplates;

if(
    templateCategory === 2
){

    currentTemplates =
    coupleTemplates;

}

if(
    templateCategory === 3
){

    currentTemplates =
    babyTemplates;

}
 if(
    templateCategory === 4
){

    currentTemplates =
    birthdayTemplates;

}

if(
    templateCategory === 5
){

    currentTemplates =
    graduationTemplates;

}

if(
    templateCategory === 6
){

    currentTemplates =
    travelTemplates;

}  
// =====================
// Layout系统
// =====================

const layouts = {

layout1:{

titleRx:0.07,
titleRy:0.10,

leftTitleRx:0.04,
leftTitleRy:0.78,

leftDescRx:0.06,
leftDescRy:0.91,

rightTitleRx:0.66,
rightTitleRy:0.80,

rightDescRx:0.60,
rightDescRy:0.97

},

layout2:{

titleRx:0.55,
titleRy:0.10,

leftTitleRx:0.04,
leftTitleRy:0.70,

leftDescRx:0.04,
leftDescRy:0.83,

rightTitleRx:0.66,
rightTitleRy:0.72,

rightDescRx:0.66,
rightDescRy:0.85

},

layout3:{

titleRx:0.28,
titleRy:0.08,

leftTitleRx:0.04,
leftTitleRy:0.72,

leftDescRx:0.04,
leftDescRy:0.85,

rightTitleRx:0.72,
rightTitleRy:0.56,

rightDescRx:0.72,
rightDescRy:0.69

},

layout4:{

titleRx:0.28,
titleRy:0.08,

leftTitleRx:0.04,
leftTitleRy:0.51,

leftDescRx:0.04,
leftDescRy:0.64,

rightTitleRx:0.72,
rightTitleRy:0.78,

rightDescRx:0.72,
rightDescRy:0.91

},

layout5:{

titleRx:0.15,
titleRy:0.08,

leftTitleRx:0.04,
leftTitleRy:0.74,

leftDescRx:0.04,
leftDescRy:0.87,

rightTitleRx:0.70,
rightTitleRy:0.52,

rightDescRx:0.70,
rightDescRy:0.65

}

};

let layout = layouts.layout1;

if(index === 0){

    layout = layouts.layout1;

}

if(index === 1){

    layout = layouts.layout2;

}

if(index === 2){

    layout = layouts.layout3;

}

if(index === 3){

    layout = layouts.layout4;

}

if(index === 4){

    layout = layouts.layout5;

}

const tpl =
currentTemplates[index];
texts = [];

titleText = null;

subTitleText = null;

thirdText = null;

leftBottomText = null;

rightSubText = null;

if(!titleText){

titleText = {

    content:tpl.title,

    rx:layout.titleRx,
    ry:layout.titleRy,

    align:"left",

    x:
    exportVisibleX +
    exportVisibleW *
    layout.titleRx,

    y:
    exportVisibleY +
    exportVisibleH *
    layout.titleRy,

    size:28,

    rotation:0,

    color:"#ffffff",

    glow:0,

    font:"sans-serif"

};
    
        texts.push(titleText);

    }else{

        titleText.content =
        tpl.title;

    }

    if(!subTitleText){

subTitleText = {

    content:tpl.leftDesc,
rx:layout.leftDescRx,
ry:layout.leftDescRy,
    align:"left",
    x:
    exportVisibleX +
    exportVisibleW *
layout.leftDescRx,
    y:
    exportVisibleY +
    exportVisibleH *
layout.leftDescRy,

    size:10,

    rotation:0,

    color:"#ffffff",

    glow:0

};
           
        texts.push(subTitleText);

    }else{

subTitleText.content =
tpl.leftDesc;

    }
if(!thirdText){

thirdText = {

    content:tpl.rightTitle,

rx:layout.rightTitleRx,
ry:layout.rightTitleRy,
    align:"left",
    x:
    exportVisibleX +
    exportVisibleW *
layout.rightTitleRx,

    y:
    exportVisibleY +
    exportVisibleH *
layout.rightTitleRy,
    size:16,

    rotation:0,

    color:"#ffffff",

    glow:0

};
        

    texts.push(thirdText);

}else{

    thirdText.content =
tpl.rightTitle;
}
if(!leftBottomText){

leftBottomText = {

   content:
tpl.leftTitle,
rx:layout.leftTitleRx,
ry:layout.leftTitleRy,

    align:"left",

    x:
    exportVisibleX +
    exportVisibleW *
layout.leftTitleRx,

    y:
    exportVisibleY +
    exportVisibleH *
layout.leftTitleRy,

    size:14,

    rotation:0,

    color:"#ffffff",

    glow:0

};

texts.push(leftBottomText);

}
if(!rightSubText){

rightSubText = {

content:
tpl.rightDesc,

rx:layout.rightDescRx,
ry:layout.rightDescRy,
    align:"left",

    x:
    exportVisibleX +
    exportVisibleW *
layout.rightDescRx,
    y:
    exportVisibleY +
    exportVisibleH *
layout.rightDescRy,
    size:12,

    rotation:0,

    color:"#ffffff",

    glow:0

};

texts.push(rightSubText);

}

draw();

// 自动执行一次边界校正

texts.forEach(text=>{

    const box =
    getTextBounds(text);

    const LIMIT = 10;

    if(
        box.left <
        exportVisibleX + LIMIT
    ){

        text.x +=
        (
            exportVisibleX +
            LIMIT
        )
        -
        box.left;

    }

    if(
        box.right >
        exportVisibleX +
        exportVisibleW -
        LIMIT
    ){

        text.x -=
        box.right
        -
        (
            exportVisibleX +
            exportVisibleW -
            LIMIT
        );

    }

    if(
        box.top <
        exportVisibleY + LIMIT
    ){

        text.y +=
        (
            exportVisibleY +
            LIMIT
        )
        -
        box.top;

    }

    if(
        box.bottom >
        exportVisibleY +
        exportVisibleH -
        LIMIT
    ){

        text.y -=
        box.bottom
        -
        (
            exportVisibleY +
            exportVisibleH -
            LIMIT
        );

    }

    text.rx =

    (
        text.x -
        exportVisibleX
    )
    /
    exportVisibleW;

    text.ry =

    (
        text.y -
        exportVisibleY
    )
    /
    exportVisibleH;

});

draw();

}

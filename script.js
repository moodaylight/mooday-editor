// script.js
// 主入口文件
// 初始化
// 启动编辑器
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const uploadBtn =
document.getElementById("uploadBtn");

const lightModeBtn =
document.getElementById("lightModeBtn");
const photoBtn =
document.getElementById("photoBtn");

const mirrorBtn =
document.getElementById("mirrorBtn");
const titleBtn =
document.getElementById("titleBtn");
const subTitleBtn =
document.getElementById("subTitleBtn");
const decoBtn =
document.getElementById("decoBtn");
const previewBtn =
document.getElementById("previewBtn");
const moodBtn =
document.getElementById("moodBtn");
const printBtn =
document.getElementById("printBtn");
const templateBtn =
document.getElementById("templateBtn");
const templateDrawer =
document.getElementById(
"templateDrawer"
);
const templateItem0 =
document.getElementById(
"templateItem0"
);

const templateItem1 =
document.getElementById(
"templateItem1"
);

const templateItem2 =
document.getElementById(
"templateItem2"
);
const templateItem3 =
document.getElementById(
"templateItem3"
);

const templateItem4 =
document.getElementById(
"templateItem4"
);
let image = new Image();
let originalImage = null;
image.src = "default.png";
let lastTapText = null;
image.onload = function(){

    // =====================
    // 可视区域真实尺寸
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

    const marginX = 20;

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

    const visibleW =
    outerW * visibleRatioX;

    const visibleH =
    outerH * visibleRatioY;

    // =====================
    // Cover算法
    // =====================

    const scaleX =
    visibleW / image.width;

    const scaleY =
    visibleH / image.height;

imgScale =
Math.max(scaleX, scaleY);

    // 自动居中

imgX = canvas.width / 2;

imgY =
canvas.height / 2;
    draw();

}
// 图片

let imgX = 0;
let imgY = 0;

let imgScale = 1;
let imgRotation = 0;

 // 文字

let texts = [];
let decorations = [];
let decoIndex = 0;

const decoList = [

    "☀",

    "🌼",

    "♥",

    "✨",

    "✦"

];
let selectedTextIndex = -1;
let selectedText = null;

let titleText = null;
let subTitleText = null;
let thirdText = null;

let leftBottomText = null;
let rightSubText = null;
// 当前是否选中图片

let imageSelected = false;

let productType = "photo";
let lightMode = 0;
let moodMode = 0;
let templateCategory = 0;
let templateMode = false;

let familyTemplateIndex = 0;

const familyTemplates = [

    {
        title:"우리 집",

        subTitle:"사랑이 머무는 곳",

        text3:"돌아갈 곳이 있다는 건\n참 따뜻한 일입니다"
    },

    {
        title:"The Best Moments",

        subTitle:"Are Together",

        text3:"Family Makes\nLife Beautiful"
    },

    {
        title:"Together",

        subTitle:"Every Day",

        text3:"The Warmest\nPlace Is Home"
    },

    {
        title:"Family",

        subTitle:"Always Here",

        text3:"행복은\n함께하는\n순간 속에"
    },

    {
        title:"Home",

        subTitle:"Our Story",

        text3:"가족과 함께한\n모든 시간이\n소중한 추억"
    }

];
const coupleTemplates = [

{
    title:"우리",

    subTitle:"함께라서 더 특별해",

    text3:"당신과 함께한\n모든 순간이 소중해"
},

{
    title:"사랑",

    subTitle:"마음을 전하는 시간",

    text3:"사랑은 작은 순간에도\n깃들어 있어요"
},

{
    title:"동행",

    subTitle:"같은 길을 걷는 우리",

    text3:"서로의 곁에서\n함께 나아가요"
},

{
    title:"함께",

    subTitle:"가장 행복한 이유",

    text3:"당신이 있어서\n오늘도 웃을 수 있어"
},

{
    title:"소중한 순간",

    subTitle:"기억하고 싶은 오늘",

    text3:"우리의 이야기는\n계속 이어질 거야"
}

];
const babyTemplates = [

{
title:"햇살 가득한\n추억 한 장",

leftTitle:"성장은\n단 한 번뿐이야.",

leftDesc:"지금 이 순간을\n오래도록 기억해요",

rightTitle:"모든 순간이\n너의 빛나는\n미래로 이어질 거야.",

rightDesc:"오늘도, 내일도\n사랑해"
},

{
title:"작은 손에 담긴\n큰 행복",

leftTitle:"웃음은\n가장 예쁜 선물",

leftDesc:"매일매일 새로운\n기적이 자라나요",

rightTitle:"너의 하루하루가\n소중한 추억이 돼",

rightDesc:"언제나 널 응원해"
},

{
title:"반짝이는\n우리의 시간",

leftTitle:"오늘의 미소가\n내일의 힘이 돼",

leftDesc:"세상에서 가장\n빛나는 순간",

rightTitle:"사랑으로 자라는\n작은 이야기",

rightDesc:"항상 행복하길"
},

{
title:"사랑으로 채운\n성장 일기",

leftTitle:"지금 이 모습도\n소중한 선물",

leftDesc:"한 걸음 한 걸음\n함께 걸어가요",

rightTitle:"모든 순간이\n특별한 기억이야",

rightDesc:"언제까지나 사랑해"
},

{
title:"눈부신 오늘,\n빛나는 내일",

leftTitle:"작은 꿈이\n큰 희망이 돼",

leftDesc:"너의 미래를\n응원할게",

rightTitle:"행복한 기억들이\n가득 쌓여가길",

rightDesc:"오늘도 사랑해"
}

];

const birthdayTemplates = [

{
    title:"생일",

    subTitle:"오늘은 당신의 날",

    text3:"미래의 매일이\n오늘처럼 반짝이길"
},

{
    title:"축하",

    subTitle:"특별한 당신에게",

    text3:"행복한 순간이\n가득하길 바라요"
},

{
    title:"소원",

    subTitle:"마음속 깊은 곳에",

    text3:"바라는 모든 일이\n이루어지길"
},

{
    title:"행복",

    subTitle:"웃음 가득한 하루",

    text3:"오늘의 기쁨이\n오래도록 이어지길"
},

{
    title:"빛나는 하루",

    subTitle:"가장 특별한 오늘",

    text3:"소중한 기억으로\n남겨두세요"
}

];

const graduationTemplates = [

{
    title:"청춘",

    subTitle:"이야기는 끝나지 않아",

    text3:"이야기는 끝나지 않아\n다른 곳에서 이어질 뿐"
},

{
    title:"출발",

    subTitle:"꿈을 안고 떠나는",

    text3:"꿈을 안고 떠나는\n더 먼 곳을 향해"
},

{
    title:"미래",

    subTitle:"기대되는 내일",

    text3:"노력한 모든 날들이\n빛을 발할 거야"
},

{
    title:"새로운 시작",

    subTitle:"한 장의 졸업장",

    text3:"끝이 아닌\n새로운 시작이야"
},

{
    title:"기억",

    subTitle:"함께한 시간",

    text3:"소중한 추억은\n언제나 마음속에"
}

];

const travelTemplates = [

{
    title:"여행",

    subTitle:"새로운 출발",

    text3:"모든 여행은\n새로운 만남의 시작"
},

{
    title:"풍경",

    subTitle:"세상은 넓어",

    text3:"눈앞의 풍경이\n추억이 되는 순간"
},

{
    title:"추억",

    subTitle:"기억 속에 남는",

    text3:"언제나 다시 떠올릴\n소중한 시간"
},

{
    title:"발걸음",

    subTitle:"길 위의 이야기",

    text3:"한 걸음마다\n새로운 이야기가 있어"
},

{
    title:"새로운 만남",

    subTitle:"설레는 순간",

    text3:"낯선 곳에서\n특별한 인연을 만나다"
}

];

const templateCategories = [

    "템플릿",

    "가족",

    "커플",

    "아기",

    "생일",

    "졸업",

    "여행"

];
lightModeBtn.innerText = "조명모드";
let draggingText = false;
let draggingImage = false;
let longPressTimer;
let dragOffsetX = 0;
let dragOffsetY = 0;
let textOffsetX = 0;
let textOffsetY = 0;

// 双指状态

let initialPinchDistance = 0;
let initialRotationAngle = 0;

let initialTextSize = 0;
let initialTextRotation = 0;

let initialImageScale = 1;

// =====================
// 画布大小
// =====================

function resizeCanvas(){

    canvas.width = canvas.offsetWidth;

    canvas.height = canvas.offsetHeight;

    draw();

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// =====================
// 获取文字真实区域
// =====================

function getTextBounds(text){

    ctx.save();

    ctx.font =
    `${text.size}px sans-serif`;

let lines = [];

String(
    text.content || ""
)
.split("\n")
.forEach(part=>{

    let maxChars = 8;

    if(text === titleText){

        maxChars = 12;

    }

    if(text === subTitleText){

        maxChars = 14;

    }

    if(text === thirdText){

        maxChars = 14;

    }

if(part.length <= maxChars){

    lines.push(part);

}else{

    // 英文

    if(/[a-zA-Z]/.test(part)){

        const words =
        part.split(" ");

        let currentLine = "";

        words.forEach(word=>{

            if(

                (
                    currentLine +
                    " " +
                    word
                ).trim().length

                <=

                maxChars

            ){

                currentLine =

                (
                    currentLine +
                    " " +
                    word
                ).trim();

            }else{

                if(currentLine){

                    lines.push(
                        currentLine
                    );

                }

                currentLine = word;

            }

        });

        if(currentLine){

            lines.push(
                currentLine
            );

        }

    }

    // 中文

    else{

        for(

            let i = 0;

            i < part.length;

            i += maxChars

        ){

            lines.push(

                part.substring(

                    i,

                    i + maxChars

                )

            );

        }

    }

}

});
    let maxWidth = 0;

    lines.forEach(line=>{

        const w =
        ctx.measureText(line).width;

        if(w > maxWidth){

            maxWidth = w;

        }

    });

const totalHeight =

(lines.length - 1)

*

(text.size + 6)

+

text.size;

    ctx.restore();

return {

    left:
    text.x,

    right:
    text.x +
    maxWidth,

    top:
    text.y -
    totalHeight / 2,

    bottom:
    text.y +
    totalHeight / 2

};
}

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

// =====================
// 双指距离
// =====================

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

// =====================
// 图层面板
// =====================



// =====================
// 上传图片
// =====================
uploadBtn.onclick = ()=>{

    upload.click();

};
upload.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

reader.onload = function(event){

    image = new Image();

    originalImage = image;

    image.onload = function(){

            imgX = canvas.width / 2;

            imgY = canvas.height / 2;

            // =====================
// 可视区域真实尺寸
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
// Canvas边距
// =====================

const marginX = 20;

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
// 可视区域像素大小
// =====================

const visibleW =
outerW * visibleRatioX;

const visibleH =
outerH * visibleRatioY;

// =====================
// Cover算法
// =====================

const scaleX =
visibleW / image.width;

const scaleY =
visibleH / image.height;

// 自动铺满（关键）

imgScale =
Math.max(scaleX, scaleY);

            imgRotation = 0;

            imageSelected = true;

            selectedText = null;

            draw();

            

        };

        image.src = event.target.result;

    };

    reader.readAsDataURL(file);

});

// =====================
// 主标题
// =====================

titleBtn.addEventListener(
"click",
()=>{

    // 已存在 → 删除

    if(titleText){

 selectedText = titleText;

textInput.style.display = "block";

textInput.value = titleText.content;

textInput.focus();

draw();

return;  
}

    // 不存在 → 创建

    const text = {

        content: "主标题",

        x: canvas.width / 2,

        y: 140,

        size: 32,

        rotation: 0,

        color: "#ffffff",

        glow: 0

    };

    texts.push(text);

    titleText = text;

    selectedText = text;

    imageSelected = false;

    draw();

});

// =====================
// 副标题
// =====================

subTitleBtn.addEventListener(
"click",
()=>{

    if(subTitleText){

        selectedText = subTitleText;

        textInput.style.display = "block";

        textInput.value = subTitleText.content;

        textInput.focus();

        draw();

        return;

    }

    const text = {

        content: "副标题",

        x: canvas.width / 2,

        y: 460,

        size: 20,

        rotation: 0,

        color: "#ffffff",

        glow: 0

    };

    texts.push(text);

    subTitleText = text;

    selectedText = text;

    imageSelected = false;

    draw();

});

decoBtn.onclick = ()=>{

    decorations.push({

        content:
        decoList[decoIndex],

        x:200,

        y:200,

        size:28

    });

    decoIndex++;

    if(
        decoIndex >=
        decoList.length
    ){

        decoIndex = 0;

    }

    draw();

};



// =====================
// Touch Start
// =====================

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

// 取消长按

canvas.addEventListener("touchmove",(e)=>{

    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    // 单指拖动

    if(e.touches.length === 1){

        const touch = e.touches[0];

        const x = touch.clientX - rect.left;

        const y = touch.clientY - rect.top;

        // 文字
      
        // 移动时取消长按
    
        if(draggingText && selectedText){
      selectedText.x = x - textOffsetX
       selectedText.y = y - textOffsetY
       
            selectedText.rx =

(
selectedText.x -
exportVisibleX
)
/
exportVisibleW;

selectedText.ry =

(
selectedText.y -
exportVisibleY
)
/
exportVisibleH;
            const box = getTextBounds(selectedText);

const LIMIT = 10;

// 左边界
if(box.left < exportVisibleX + LIMIT){

    selectedText.x +=
    (exportVisibleX + LIMIT) - box.left;

}

// 右边界
if(
    box.right >
    exportVisibleX +
    exportVisibleW -
    LIMIT
){

    selectedText.x -=
    box.right -
    (
        exportVisibleX +
        exportVisibleW -
        LIMIT
    );

}

// 上边界
if(box.top < exportVisibleY + LIMIT){

    selectedText.y +=
    (exportVisibleY + LIMIT) - box.top;

}

// 下边界
if(
    box.bottom >
    exportVisibleY +
    exportVisibleH -
    LIMIT
){

    selectedText.y -=
    box.bottom -
    (
        exportVisibleY +
        exportVisibleH -
        LIMIT
    );

}
selectedText.rx =

(
selectedText.x -
exportVisibleX
)
/
exportVisibleW;

selectedText.ry =

(
selectedText.y -
exportVisibleY
)
/
exportVisibleH;
        }

        // 图片

        if(draggingImage && imageSelected){

    imgX = x - dragOffsetX;

    imgY = y - dragOffsetY;
    
}

        draw();

    }

    // 双指缩放旋转

    if(e.touches.length === 2){

        const currentDistance = getDistance(

            e.touches[0],

            e.touches[1]

        );

        const currentAngle = getAngle(

            e.touches[0],

            e.touches[1]

        );

        const scale = currentDistance / initialPinchDistance;

        const rotation = currentAngle - initialRotationAngle;


        // 图片

        if(imageSelected){

    imgScale =
    initialImageScale * scale;

    // =====================
    // 最小缩放限制（防露白）
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
    const marginX = 20;

    const outerW =
    canvas.width - marginX * 2;

    const outerH =
    canvas.height - marginX * 2;

    const visibleRatioX =
    visibleWidth / frameWidth;

    const visibleRatioY =
    visibleHeight / frameHeight;

    const visibleW =
    outerW * visibleRatioX;

    const visibleH =
    outerH * visibleRatioY;

    // Cover最小值

    const minScale =
    Math.max(
        visibleW / image.width,
        visibleH / image.height
    );

    // 不允许缩小到露白

    imgScale =
    Math.max(imgScale, minScale);
    
}

        draw();

    }

});

textInput.addEventListener("input",()=>{

    if(selectedText){

        selectedText.content = textInput.value;

        draw();

    }

});

textInput.addEventListener(
"blur",
()=>{

    textInput.style.display = "none";

}
);
// =====================
// Touch End
// =====================

canvas.addEventListener("touchend",()=>{

clearTimeout(longPressTimer);
    draggingText = false;

    draggingImage = false;

});

draw();

photoBtn.onclick = ()=>{

    productType = "photo";
    lightMode = 0;
    lightModeBtn.style.display =
    "none";

    if(image){

        const frameWidth = 4;
        const frameHeight = 6;

        const visibleWidth = 4;
        const visibleHeight = 6;

        const marginX = 20;

        const outerW =
        canvas.width - marginX * 2;

        const outerH =
        canvas.height - marginX * 2;

        const visibleW =
        outerW *
        (visibleWidth / frameWidth);

        const visibleH =
        outerH *
        (visibleHeight / frameHeight);

        const scaleX =
        visibleW / image.width;

        const scaleY =
        visibleH / image.height;

        imgScale =
        Math.max(scaleX, scaleY);

    }

    draw();
texts.forEach(text=>{

    const box =
    getTextBounds(text);

    const LIMIT = 10;

    // 左边

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

    // 右边

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

    // 上边

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

    // 下边

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
};

mirrorBtn.onclick = ()=>{

    productType = "mirror";

    lightModeBtn.style.display =
    "block";

    if(image){

        const frameWidth = 12;
        const frameHeight = 17.5;

        const visibleWidth = 9.8;
        const visibleHeight = 15.3;

        const marginX = 20;

        const outerW =
        canvas.width - marginX * 2;

        const outerH =
        canvas.height - marginX * 2;

        const visibleW =
        outerW *
        (visibleWidth / frameWidth);

        const visibleH =
        outerH *
        (visibleHeight / frameHeight);

        const scaleX =
        visibleW / image.width;

        const scaleY =
        visibleH / image.height;

        imgScale =
        Math.max(scaleX, scaleY);

    }

    draw();


texts.forEach(text=>{

    const box =
    getTextBounds(text);

    const LIMIT = 10;

    // 左边

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

    // 右边

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

    // 上边

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

    // 下边

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
};

previewBtn.onclick = ()=>{

    draw();

    const link =
    document.createElement("a");

    link.download =
    "4x6-photo.jpg";

    link.href =
    canvas.toDataURL(
        "image/jpeg",
        1.0
    );

    link.click();

};

printBtn.onclick = ()=>{

    draw();

    const exportCanvas =
    document.createElement("canvas");

    exportCanvas.width = 1200;
    exportCanvas.height = 1800;

    const exportCtx =
    exportCanvas.getContext("2d");

const cropW =
exportVisibleW / imgScale;

const cropH =
exportVisibleH / imgScale;

const sx =
(originalImage.width / 2)
-
cropW / 2
-
(
(imgX - canvas.width / 2)
/
imgScale
);

const sy =
(originalImage.height / 2)
-
cropH / 2
-
(
(imgY - canvas.height / 2)
/
imgScale
);

exportCtx.drawImage(

    originalImage,

    sx,
    sy,
    cropW,
    cropH,

    0,
    0,
    1200,
    1800

);

    const link =
    document.createElement("a");

    link.download =
    "4x6-print.jpg";

    link.href =
    exportCanvas.toDataURL(
        "image/jpeg",
        1.0
    );

    link.click();

};
let templateLongPressTimer;
let templateLongPressed = false;
moodBtn.onclick = ()=>{

    moodMode++;

    if(moodMode > 4){

        moodMode = 0;

    }

   const moods = [

    "원본",

    "따뜻한 기억",

    "영화 같은 순간",

    "고요한 일상",

    "여행 기록"

];

    moodBtn.innerText =
    moods[moodMode];

    draw();

};

templateBtn.onclick = ()=>{

    if(templateLongPressed){

        templateLongPressed = false;

        return;

    }

    templateCategory++;

    if(
        templateCategory >=
        templateCategories.length
    ){

        templateCategory = 0;

    }

    templateBtn.innerText =

    templateCategories[
        templateCategory
    ];

};
templateBtn.addEventListener(
"touchstart",
()=>{

    templateLongPressed = false;

    templateLongPressTimer =
    setTimeout(()=>{

        templateLongPressed = true;
if(templateCategory === 1){

    templateItem0.innerText =
    "우리 집";

    templateItem1.innerText =
    "따뜻한 시간";

    templateItem2.innerText =
    "함께";

    templateItem3.innerText =
    "행복한 순간";

    templateItem4.innerText =
    "우리의 이야기";

}

if(templateCategory === 2){

    templateItem0.innerText =
    "우리";

    templateItem1.innerText =
    "사랑";

    templateItem2.innerText =
    "동행";

    templateItem3.innerText =
    "함께";

    templateItem4.innerText =
    "소중한 순간";

}

if(templateCategory === 3){

    templateItem0.innerText =
    "성장";

    templateItem1.innerText =
    "행복";

    templateItem2.innerText =
    "미소";

    templateItem3.innerText =
    "추억";

    templateItem4.innerText =
    "사랑";

}
if(templateCategory === 4){

    templateItem0.innerText =
    "생일";

    templateItem1.innerText =
    "축하";

    templateItem2.innerText =
    "소원";

    templateItem3.innerText =
    "행복";

    templateItem4.innerText =
    "빛나는 하루";

}

if(templateCategory === 5){

    templateItem0.innerText =
    "청춘";

    templateItem1.innerText =
    "출발";

    templateItem2.innerText =
    "미래";

    templateItem3.innerText =
    "새로운 시작";

    templateItem4.innerText =
    "기억";

}

if(templateCategory === 6){

    templateItem0.innerText =
    "여행";

    templateItem1.innerText =
    "풍경";

    templateItem2.innerText =
    "추억";

    templateItem3.innerText =
    "발걸음";

    templateItem4.innerText =
    "새로운 만남";

}
        templateDrawer.classList.add(
            "show"
        );

    },700);

}
);

templateBtn.addEventListener(
"touchend",
()=>{

    clearTimeout(
        templateLongPressTimer
    );

}
);
document.addEventListener(
"contextmenu",
(e)=>{

    e.preventDefault();

}
);

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
leftTitleRy:0.82,

leftDescRx:0.06,
leftDescRy:0.89,

rightTitleRx:0.66,
rightTitleRy:0.85,

rightDescRx:0.60,
rightDescRy:0.95

},

layout2:{

titleRx:0.55,
titleRy:0.10,

leftTitleRx:0.04,
leftTitleRy:0.74,

leftDescRx:0.04,
leftDescRy:0.79,

rightTitleRx:0.66,
rightTitleRy:0.76,

rightDescRx:0.66,
rightDescRy:0.81

},
layout3:{

titleRx:0.28,
titleRy:0.08,

leftTitleRx:0.04,
leftTitleRy:0.76,

leftDescRx:0.04,
leftDescRy:0.81,

rightTitleRx:0.72,
rightTitleRy:0.60,

rightDescRx:0.72,
rightDescRy:0.65

},
layout4:{

titleRx:0.28,
titleRy:0.08,

leftTitleRx:0.04,
leftTitleRy:0.55,

leftDescRx:0.04,
leftDescRy:0.60,

rightTitleRx:0.72,
rightTitleRy:0.82,

rightDescRx:0.72,
rightDescRy:0.87

},
layout5:{

titleRx:0.15,
titleRy:0.08,

leftTitleRx:0.04,
leftTitleRy:0.78,

leftDescRx:0.04,
leftDescRy:0.83,

rightTitleRx:0.70,
rightTitleRy:0.56,

rightDescRx:0.70,
rightDescRy:0.61

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

    glow:0

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

document.addEventListener(
"touchstart",
(e)=>{

    if(
        !templateDrawer.contains(
            e.target
        )
        &&
        e.target !== templateBtn
    ){

        templateDrawer.classList.remove(
            "show"
        );

    }

}
);

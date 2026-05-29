// light.js
// 灯光系统
// 暖光
// 白光
// 镜子模式
const lightNames = [
    "白光",
    "暖光",
    "日光",
    "镜子"
];

if(productType === "photo"){

    lightModeBtn.style.display = "none";

}
lightModeBtn.innerText =
lightNames[lightMode];

lightModeBtn.addEventListener(
"click",
()=>{

    lightMode++;

    if(lightMode > 3){

        lightMode = 0;

    }

    lightModeBtn.innerText =
    lightNames[lightMode];

    draw();

});

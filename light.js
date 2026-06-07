// light.js
// 灯光系统
// 暖光
// 白光
// 镜子模式
const lightNames = [
    "백색",
    "전구색",
    "주광색",
    "거울 모드"
];

/*
if(productType === "photo"){

    lightModeBtn.style.display = "none";

}
*/
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

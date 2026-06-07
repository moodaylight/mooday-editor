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
if(lightModeBtn){

    lightModeBtn.innerText =
    lightNames[lightMode];

}

if(lightModeBtn){

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

}

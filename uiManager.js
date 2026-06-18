function updateButtons(){

    if(!currentConfig) return;

    const buttons = [

        uploadBtn,
        clarityBtn,
        moodBtn,
        frameBtn,
        textBtn,
        backgroundBtn,
        posterBtn,
        previewBtn,
        submitBtn

    ];

    buttons.forEach((btn,index)=>{

        const action =
        currentConfig.buttons[index];

        if(action){

            btn.style.display =
            "block";

           btn.innerText =
           BUTTON_LABELS[action] || "-";

            btn.onclick = null;

            if(action === "home"){

                btn.onclick = goHome;

            }

            else if(action === "upload"){

                btn.onclick = ()=>{

                    upload.click();

                };

            }

else if(action === "mood"){

    btn.onclick = moodBtn.onclick;

}

else if(action === "frame"){

    btn.onclick = frameBtn.onclick;

}

else if(action === "text"){

    btn.onclick = ()=>{

        templateDrawer.classList.toggle(
            "show"
        );

    };

}

else if(action === "background"){

    btn.onclick = backgroundBtn.onclick;

}

            else if(action === "light"){

                btn.onclick = ()=>{

                    alert(
                    "조명 기능 준비중"
                    );

                };

            }

            else if(action === "style"){

                btn.onclick = ()=>{

                    alert(
                    "스타일 기능 준비중"
                    );

                };

            }

            else if(action === "optimize"){

                btn.onclick = ()=>{

                    alert(
                    "자동 보정 준비중"
                    );

                };

            }

            else if(action === "adjust"){

                btn.onclick = ()=>{

                    alert(
                    "조절 기능 준비중"
                    );

                };

            }

            else if(action === "preview"){

                btn.onclick = ()=>{

                    alert(
                    "미리보기 준비중"
                    );

                };

            }

            else if(action === "submit"){

                btn.onclick = ()=>{

                    alert(
                    "제출 완료"
                    );

                };

            }

            else if(action === "download"){

                btn.onclick = ()=>{

                    alert(
                    "다운로드 기능 준비중"
                    );

                };

            }

        }else{

            btn.style.display =
            "none";

        }

    });

}
function updateOptions(){

    const statusContent =
    document.getElementById(
        "statusContent"
    );

    if(
        !currentConfig ||
        !currentConfig.options
    ){
        return;
    }

    statusContent.innerHTML = "";

    currentConfig.options.forEach(
    (option,index)=>{

        const btn =
        document.createElement(
            "button"
        );

        btn.className =
        "optionChip";

        if(index === 0){

            btn.classList.add(
                "activeOption"
            );

        }

        btn.innerText =
        option;

        statusContent.appendChild(
            btn
        );

    });

}

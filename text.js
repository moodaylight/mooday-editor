// =====================
// 文字系统
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

            }else{

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
function hideTextInput(){

    textInput.style.display = "none";

}

const FRAMES = {

    NONE:0,

    WHITE:1,

    BLACK:2,

    POLAROID:3,

    WOOD:4,

    METAL:5

};
frameBtn.onclick = ()=>{

    frameMode++;

    if(frameMode > FRAMES.METAL){

        frameMode = FRAMES.NONE;

    }

    draw();

};

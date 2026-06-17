const FRAMES = {

};
frameBtn.onclick = ()=>{

    decorations.push({

        content:
        decoList[decoIndex],

        x:200 + decoIndex * 20,

        y:200 + decoIndex * 20,

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

function applyStyle(id){

}
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

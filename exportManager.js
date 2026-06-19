
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

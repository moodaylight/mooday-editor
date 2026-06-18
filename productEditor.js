function selectProduct(type){

    currentProduct = type;
    currentConfig =
    PRODUCTS[type];

    updateButtons();

    console.log(
        currentConfig.buttons
    );

    updateOptions();

    document.getElementById(
        "homePage"
    ).style.display = "none";

    document.getElementById(
        "editorContainer"
    ).style.display = "block";

    document.getElementById(
        "editorPage"
    ).style.display = "flex";

    document.getElementById(
        "bottomPanel"
    ).style.display = "flex";

    resizeCanvas();

    if(type === "photo"){

        photoBtn.click();

    }

    if(type === "frame"){

        photoBtn.click();

    }

    if(type === "idcard"){

        photoBtn.click();

    }

    if(type === "mirror"){

        mirrorBtn.click();

    }

}

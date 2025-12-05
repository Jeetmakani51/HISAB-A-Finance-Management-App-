document.getElementById("saveBTN").addEventListener("click",function(){
    const fields = [
        "profMobile",
        "profLoc",
        "profAboutShop",
        "profGST"
    ];

    fields.forEach(id => {
       const input = document.getElementById(id);
       const value = input.value.trim();

       const textElement = document.createElement("span");
       textElement.textContent = value || "Not Provided";
       textElement.classList.add("savedText");

       input.parentNode.replaceChild(textElement,input);
    });
})


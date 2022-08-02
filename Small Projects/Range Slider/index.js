let range = document.querySelector(".field input")
let proColor = document.querySelector(".field .pro-color")
let ProgressNumber = document.querySelector(".slider .sliderValue span")


range.oninput = (() => {
    rangeValue = range.value;
    ProgressNumber.textContent = rangeValue;
    ProgressNumber.style.left = `${(rangeValue/2)}%`;
    ProgressNumber.classList.add("active")
    proColor.style.right = `${100 - (rangeValue/2)}%`;
    proColor.style.width = "none";
})

range.onblur = (() => {
    ProgressNumber.classList.remove("active");
})
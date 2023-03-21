const optionMenu = document.querySelector(".select-menu"),
    selectBtn = optionMenu.querySelector(".select-btn"),
    sBtn_text = optionMenu.querySelector(".sBtn-text")

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"))

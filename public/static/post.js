const categoryNonAcademic = document.getElementById("categoryNonAcademic")
const categoryAcademic = document.getElementById("categoryAcademic")
const profileBtn = document.getElementById("profileBtn")
const anonymousToggle = document.getElementById("anonymousToggle")
const tagsArray = document.getElementById("tagsArray")
const tagBtn = document.getElementById("tagBtn")
const queryVal = document.getElementById("queryVal")
const postBtn = document.getElementById("postBtn")

tagsArray.value = [
    "#DSA",
    "#Programming",
    "#OOPS",
    "#Engineering",
    "#academic_controller",
] //TODO:Change this hardcode
tagBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (tagsArray.innerText) {
        tagsArray.innerText = ""
    } else {
        tagsArray.innerText = tagsArray.value
    }
})
console.log("Post JS Included")
postBtn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(queryVal)
    tagsArray.value = [
        "#DSA",
        "#Programming",
        "#OOPS",
        "#Engineering",
        "#academic_controller",
    ] //TODO:Change this hardcode
    console.log(anonymousToggle.value)
    let isAnonymous
    if (anonymousToggle.value === "on") {
        isAnonymous = true
    } else {
        isAnonymous = false
    }
    const data = {
        description: queryVal.value,
        tags: tagsArray.value, //TODO:Handle when you get it through AI
        anonymous: isAnonymous,
        force: true,
        type: "academic",
    }
    console.log(data)
    fetch("/createPost", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data.status === "ok") {
                console.log("Success")
            }
            if (data.status === "error") {
                //TODO:Dynamically render HTML
                console.log("error")
            }
        })
        .catch((error) => {
            console.error("Error:", error)
            //TODO:Dynamically render HTML
            // message.innerHTML = `<span class="actual-text" id="errorMsg">&nbsp;Something went wrong&nbsp;</span>
            // <span class="hover-text" id="errorMsgHover" aria-hidden="true">&nbsp;Something went wrong&nbsp;</span>`
        })
})

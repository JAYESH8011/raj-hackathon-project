const email = document.getElementById("email")
const password = document.getElementById("password")
const loginBtn = document.getElementById("loginBtn")
const message = document.getElementById("message")
console.log(email)
console.log(password)

console.log("Login JS Included")
loginBtn.addEventListener("click", (e) => {
    console.log(email.value)
    console.log(password.value)
    const data = { email: email.value, password: password.value }
    e.preventDefault()
    fetch("/userLogin", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log("Success")
            if (data.status === "ok") {
                window.location.reload()
            }
            if (data.status === "error") {
                //TODO:Dynamically render HTML
                message.innerHTML = `<span class="actual-text" id="errorMsg">&nbsp;Invalid Credentials&nbsp;</span>
                <span class="hover-text" id="errorMsgHover" aria-hidden="true">&nbsp;Invalid Credentials&nbsp;</span>`
            }
        })
        .catch((error) => {
            console.error("Error:", error)
            //TODO:Dynamically render HTML
            message.innerHTML = `<span class="actual-text" id="errorMsg">&nbsp;Something went wrong&nbsp;</span>
            <span class="hover-text" id="errorMsgHover" aria-hidden="true">&nbsp;Something went wrong&nbsp;</span>`
        })
})

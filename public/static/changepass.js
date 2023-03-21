const oldPassword = document.getElementById("oldPassword")
const newPassword = document.getElementById("newPassword")
const confirmPassword = document.getElementById("confirmPassword")
const submitButton = document.getElementById("submitButton")
const message = document.getElementById("message")
console.log("Change Password JS included")
console.log(oldPassword)
console.log(newPassword)
console.log(confirmPassword)
submitButton.addEventListener("click", async (e) => {
    e.preventDefault()

    console.log(oldPassword.value)
    console.log(newPassword.value)
    console.log(confirmPassword.value)

    if (newPassword.value != confirmPassword.value) {
        //TODO: Dynamically render HTML
        console.log("Error: New Password and Confirm password do not match")
        console.log(newPassword.value)
        console.log(confirmPassword.value)
    } else {
        const data = {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
        }
        fetch("/firstTimeChangePassword", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status)
                console.log(data)
                if (data.status === "ok") {
                    window.location.reload()
                }
                if (data.status === "error") {
                    message.innerHTML = `<span class="actual-text" id="errorMsg">&nbsp;Invalid Credentials&nbsp;</span>
                <span class="hover-text" id="errorMsgHover" aria-hidden="true">&nbsp;Invalid Credentials&nbsp;</span>`
                }
            })
            .catch((error) => {
                console.error("Error:", error)
                //TODO:Dynamically render HTML
                message.innerHTML = `<span class="actual-text" id="errorMsg">&nbsp;Something Went wrong&nbsp;</span>
                <span class="hover-text" id="errorMsgHover" aria-hidden="true">&nbsp;Something went wrong&nbsp;</span>`
            })
    }
})

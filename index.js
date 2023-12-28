

const chgBtn = document.getElementById("start-simulation")

function replaceText(selector, text) {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
}


chgBtn.onclick = function () {
    replaceText("demo", "no boom...")
    window.electron.send("button-clicked", { someData: "Hello" })
}

window.electron.receive((event, data) => {
    console.log("in receive");
    //console.log(data)
})






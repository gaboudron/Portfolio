async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let message = inputField.value.trim();
    if (message === "") return;

    let chatMessages = document.getElementById("chat-messages");

    let userMessage = document.createElement("div");
    userMessage.innerText = "👤 " + message;
    chatMessages.appendChild(userMessage);

    inputField.value = "";

    let response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });

    let data = await response.json();
    let botMessage = document.createElement("div");
    botMessage.innerText = "🤖 " + data.reply;
    chatMessages.appendChild(botMessage);
}

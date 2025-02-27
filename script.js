async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let message = inputField.value.trim();
    if (message === "") return;

    let chatMessages = document.getElementById("chat-messages");

    // Ajouter le message de l'utilisateur
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerText = "👤 " + message;
    chatMessages.appendChild(userMessage);

    // Ajouter un indicateur de chargement
    let loadingMessage = document.createElement("div");
    loadingMessage.classList.add("loading");
    loadingMessage.innerText = "🤖 ...";
    chatMessages.appendChild(loadingMessage);

    inputField.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll en bas du chat

    try {
        let response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        let data = await response.json();

        // Supprimer le chargement et afficher la réponse
        chatMessages.removeChild(loadingMessage);

        let botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.innerText = "🤖 " + data.reply;
        chatMessages.appendChild(botMessage);
    } catch (error) {
        chatMessages.removeChild(loadingMessage);

        let errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.innerText = "❌ Erreur de connexion avec le serveur.";
        chatMessages.appendChild(errorMessage);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll en bas du chat
}

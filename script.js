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


document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("project-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalTechno = document.getElementById("techno");
    const closeModal = document.querySelector(".modal .close");

    // Liste des projets avec leurs descriptions
    const projectsInfo = {
        "immobilier": {
            img: "asset/img_projects/projet_immobilier.png",
            title: "Projet Immobilier",
            description: "Un projet de simulation de marché immobilier avec des données dynamiques.",
            techno: "Java, Postgresql"
        },
        "app-detente": {
            img: "asset/img_projects/app_detente.png",
            title: "App Détente",
            description: "Une application de relaxation avec de la musique et des exercices de respiration.",
            techno: "Swift"
        },
        "epidemie": {
            img: "asset/img_projects/virus_propagation.gif",
            title: "Propagation d'une Épidémie",
            description: "Simulation de propagation d'un virus dans une population donnée.",
            techno: "Java, Numpy, Matplotlib"
        },
        "sudoku": {
            img: "asset/img_projects/sudoku.gif",
            title: "Solveur de Sudoku",
            description: "Un solveur de Sudoku automatique utilisant des algorithmes d'intelligence artificielle.",
            techno: "Python"
        },
        "mastermind": {
            img: "asset/img_projects/mastermind.jpg",
            title: "Mastermind",
            description: "Une version numérique du célèbre jeu de logique Mastermind.",
            techno: "Java"
        },
        "train": {
            img: "asset/img_projects/train.png",
            title: "Optimisation de trajets en train",
            description: "Un projet d'optimisation des itinéraires ferroviaires pour réduire le temps de trajet.",
            techno: "Java, Postgresql"
        },
        "site": {
            img: "asset/img_projects/site.png",
            title: "Site Volley",
            description: "Un site web interactif pour gérer une équipe de volley et suivre les statistiques.",
            techno: "HTML, CSS, JavaScript"
        },
        "taquin": {
            img: "asset/img_projects/jeu_taquin.gif",
            title: "Jeu du Taquin",
            description: "Un jeu classique où il faut remettre les chiffres dans l'ordre en les glissant.",
            techno: "C"
        },
        "pendu": {
            img: "asset/img_projects/pendu.png",
            title: "Jeu du Pendu",
            description: "Un jeu de devinette de mots avec un système de scores.",
            techno: "Python"
        }
    };

    // Ajoute un écouteur d'événement sur chaque projet
    document.querySelectorAll(".projects").forEach(project => {
        project.addEventListener("click", function () {
            const projectId = this.id;

            if (projectsInfo[projectId]) {
                modalImg.src = projectsInfo[projectId].img;
                modalTitle.textContent = projectsInfo[projectId].title;
                modalDescription.textContent = projectsInfo[projectId].description;
                modalTechno.textContent = projectsInfo[projectId].techno;
                const technos = modalTechno.textContent.split(", ").map(lang => `<span class="tag">${lang}</span>`).join("");
                modalTechno.innerHTML = technos;
                modal.style.display = "flex";
            }
        });
    });

    // Fermer la modale quand on clique sur X
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Fermer la modale quand on clique en dehors du contenu
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});


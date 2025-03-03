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
    const modalCours = document.getElementById("modal-cours");
    const modalGithub = document.getElementById("modal-github");
    const modalTechno = document.getElementById("techno");
    const closeModal = document.querySelector(".modal .close");

    // Liste des projets avec leurs descriptions
    const projectsInfo = {
        "immobilier": {
            img: "asset/img_projects/projet_immobilier.png",
            title: "Projet Immobilier",
            description: "Un projet de gestion de parcs immobiliers. Inscription et connexion nécessaire pour accéder à son espace. Ajout et suppression d'immeubles, d'appartements, de syndicat, de locataires et de propriétaires. Statistiques sur son parc immobilier.",
            cours: "Technologie Web Serveur",
            github: "https://github.com/gaboudron/projet-immobilier",
            techno: "Java, Postgresql"
        },
        "app-detente": {
            img: "asset/img_projects/app_detente.png",
            title: "App Détente",
            description: "Une application voulue pour fonctionner sur une montre connectée Apple Watch. Elle permet de mesurer sa détente verticale en prenant en compte le temps passé en vol. La détente verticale, utile dans de nombreux sports (volley-ball, basketball, handball, etc), l'utilisateur démarre l'application au début de sa séance d'entraînement et peut lorsque celle ci fini observer ses statistiques. En cours de développement.",
            cours: "Projet personnel",
            github: "https://github.com/gaboudron/AnalyseDetente",
            techno: "Swift"
        },
        "epidemie": {
            img: "asset/img_projects/virus_propagation.gif",
            title: "Propagation d'une Épidémie",
            description: "Simulation de propagation d'un virus dans une population donnée. Basé sur le réputé 'jeu de la vie', ce projet simule de manières aléatoires la propagation d'un virus. L'aléatoire, ou plutôt ici le pseudo-aléatoire, fonctionne grâce au générateur de nombre aléatoire de Matsumoto, le Mersenne Twister. Le nombre en fonction du temps de personnes infectées, rétablies, exposées et susceptibles est représenté sous la forme de courbes.",
            cours: "Projet Informatique - Générer l'aléatoire",
            github: "https://github.com/gaboudron/Epidemie",
            techno: "Java, Numpy, Matplotlib"
        },
        "sudoku": {
            img: "asset/img_projects/sudoku.gif",
            title: "Solveur de Sudoku",
            description: "Un solveur de Sudoku automatique utilisant divers algorithmes : parcours en profondeur, parcours en largeur, recherche gloutonne best-first, recherche A*. Le temps d'exécution pour chaque algortihme est donné et permet, dans le cas du sudoku et en fonction de sa difficulté, de résoudre efficacement ce dernier.",
            cours: "Algorithme pour la résolution de problème",
            github: "https://github.com/gaboudron/Sudoku",
            techno: "Python"
        },
        "mastermind": {
            img: "asset/img_projects/mastermind.jpg",
            title: "Mastermind",
            description: "Une version numérique du célèbre jeu de logique Mastermind. Implémentation des classes nécessaires en Java. Plusieurs paramètres modifiable lorsqu'une partie est commencé, tels que le nombre de pions, le nombre couleurs, le nombre d'essais, etc. On peut sauvegarder une partie et la reprendre plus tard, comme on peut jouer à deux ou bien tout seul.",
            cours: "Programmation Java",
            github: "https://github.com/gaboudron/Mastermind",
            techno: "Java"
        },
        "train": {
            img: "asset/img_projects/train.png",
            title: "Gestion de trains",
            description: "Un projet de gestion de trains. On peut ajouter des trains, de différents types (TER, Intercités, TGV) et leur attribué un numéro. On peut créer des lignes, en indiquant la ville de départ ainsi que la ville d'arrivée. On peut définir les heures de départ.",
            cours: "Implémentation de base de données",
            github: "https://github.com/gaboudron/projet-train",
            techno: "Java, Postgresql"
        },
        "site": {
            img: "asset/img_projects/site.png",
            title: "Site Volley",
            description: "Un site web pour promouvoir un club de volley. La page d'accueil permet de présenter le club, et des pages pour voir chaque équipe sont disponibles. Une page pour visualiser les différents tarifs de licence est en place, et chaque visiteur peut laisser un message via une chatbox, que le club peut récupérer.",
            cours: "Technologie Web Client",
            github: "https://github.com/gaboudron/Website-Volley",
            techno: "HTML, CSS, JavaScript"
        },
        "taquin": {
            img: "asset/img_projects/jeu_taquin.gif",
            title: "Jeu du Taquin",
            description: "Un jeu classique où il faut remettre les chiffres dans l'ordre en les glissant. La taille du plateau est personnalisable et on peut sauvegarder une partie pour la reprednre plus tard.",
            cours: "Programmation Avancée en C",
            github: "https://github.com/gaboudron/Taquin",
            techno: "C"
        },
        "pendu": {
            img: "asset/img_projects/pendu.png",
            title: "Jeu du Pendu",
            description: "Un jeu de devinette de mots avec un système de scores. Plusieurs paramètres personnalisable : l'affichage des lettres manquantes, l'usage d'une interface graphique, le nombre d'erreurs possible.",
            cours: "Projet Informatique - Python",
            github: "https://github.com/gaboudron/Jeu-du-pendu",
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
                modalCours.textContent = projectsInfo[projectId].cours;
                modalGithub.href = projectsInfo[projectId].github;
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


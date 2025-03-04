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
            img: "../asset/img_projects/projet_immobilier.png",
            title: "Real Estate",
            description: "A property management project. Registration and login required to access your space. Add and delete buildings, flats, syndicates, tenants and owners. Statistics on your property portfolio.",
            cours: "Web Server Technology",
            github: "https://github.com/gaboudron/projet-immobilier",
            techno: "Java, Postgresql"
        },
        "app-detente": {
            img: "../asset/img_projects/app_detente.png",
            title: "Jump Height Analysis",
            description: "An application designed to run on an Apple Watch. It measures vertical rebound by taking into account the time spent in flight. Vertical rebound is useful in a number of sports (volleyball, basketball, handball, etc.). The user starts the application at the beginning of a training session and can look at his or her statistics once the session is over. Under development.",
            cours: "Personal project",
            github: "https://github.com/gaboudron/AnalyseDetente",
            techno: "Swift"
        },
        "epidemie": {
            img: "../asset/img_projects/virus_propagation.gif",
            title: "Epidemic",
            description: "Simulation of the spread of a virus in a given population. Based on the famous 'game of life', this project simulates the spread of a virus in a random way. The randomness, or rather the pseudo-randomness here, works using Matsumoto's random number generator, the Mersenne Twister. The number of infected, recovered, exposed and susceptible people over time is represented in the form of curves.",
            cours: "IT project - Generate randomness",
            github: "https://github.com/gaboudron/Epidemie",
            techno: "Java, Numpy, Matplotlib"
        },
        "sudoku": {
            img: "../asset/img_projects/sudoku.gif",
            title: "Sudoku solver",
            description: "An automatic Sudoku solver using various algorithms: depth-first search, width-first search, gluttonous best-first search, A* search. The execution time for each algorithm is given and, in the case of Sudoku and depending on its difficulty, enables it to be solved efficiently.",
            cours: "Problem-solving algorithms",
            github: "https://github.com/gaboudron/Sudoku",
            techno: "Python"
        },
        "mastermind": {
            img: "../asset/img_projects/mastermind.jpg",
            title: "Mastermind",
            description: "A digital version of the famous Mastermind logic game. Java implementation of the necessary classes. Several parameters that can be modified once a game has started, such as the number of pawns, the number of colours, the number of tries, etc. You can save a game and resume it later, and you can play alone or in pairs.",
            cours: "Java programming",
            github: "https://github.com/gaboudron/Mastermind",
            techno: "Java"
        },
        "train": {
            img: "../asset/img_projects/train.png",
            title: "Train management",
            description: "A train management project. You can add trains of different types (TER, Intercités, TGV) and assign them a number. You can create lines, indicating the departure and arrival towns. You can define departure times.",
            cours: "Database implementation",
            github: "https://github.com/gaboudron/projet-train",
            techno: "Java, Postgresql"
        },
        "site": {
            img: "../asset/img_projects/site.png",
            title: "Volley website",
            description: "A website to promote a volleyball club. The home page introduces the club, and there are pages for each team. There is also a page showing the different licence fees, and visitors can leave a message via a chatbox, which can be retrieved by the club.",
            cours: "Web Client Technology",
            github: "https://github.com/gaboudron/Website-Volley",
            techno: "HTML, CSS, JavaScript"
        },
        "taquin": {
            img: "../asset/img_projects/jeu_taquin.gif",
            title: "Sliding game",
            description: "A classic game where you have to put the numbers back in order by dragging them. The size of the board can be customised, and you can save a game to play again later.",
            cours: "Advanced programming in C",
            github: "https://github.com/gaboudron/Taquin",
            techno: "C"
        },
        "pendu": {
            img: "../asset/img_projects/pendu.png",
            title: "Hangman game",
            description: "A word guessing game with a scoring system. Several customisable settings: display of missing letters, use of a graphical interface, number of possible errors.",
            cours: "IT project - Python",
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


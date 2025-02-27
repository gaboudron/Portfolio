import ollama
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "http://127.0.0.1:3000"}})


# Chargement du fichier JSON
def load_json_data():
    with open("server/data.json", "r", encoding="utf-8") as file:
        json_data = json.load(file)  # Charger le JSON en tant que dictionnaire
    return json_data

# Fonction pour analyser la question et rechercher des informations pertinentes
def analyze_and_search(question, json_data):
    question = question.lower()
    
    # Rechercher si une compétence spécifique est mentionnée
    for category in json_data:
        for item in json_data[category]:
            if isinstance(item, dict) and "name" in item:
                # Si un nom spécifique de compétence est mentionné dans la question
                if item["name"].lower() in question:
                    # Retourner la description spécifique de la compétence
                    return item.get("description", "Aucune description disponible.")
    
    # Si aucune compétence spécifique n'a été trouvée, rechercher des informations plus générales
    if "compétence" in question or "skills" in question:
        return ", ".join([skill["name"] for skill in json_data["skills"]])
    elif "certification" in question:
        return ", ".join([cert["name"] for cert in json_data["certifications"]])
    elif "langue" in question or "language" in question:
        return ", ".join([f"{lang['name']} ({lang['level']})" for lang in json_data["languages"]])
    
    # Si aucune correspondance n'est trouvée, renvoyer une réponse générique
    return "Je ne comprends pas bien la question. Pourriez-vous reformuler ?"

@app.route("/chat", methods=["POST"])
def chat():
    user_question = request.json["message"]

    # Charger le fichier JSON
    json_data = load_json_data()

    # Analyser la question et rechercher dans le JSON les informations pertinentes
    context = analyze_and_search(user_question, json_data)
    print(context)

    # Si une réponse a été trouvée dans le JSON, renvoie-la
    prompt = f"""
        Tu es un étudiant en 3ème année de licence informatique et tu es là pour répondre à des questions sur toi,
        ton cursus, tes compétences, tes hobbys, etc. Réponds à la question en utilisant le contexte et uniquement cela,
        que je te donne juste en dessous :

        Contexte :
        {context}

        Question : {user_question}
    """

    # Génération de la réponse avec Ollama
    try:
        response = ollama.chat(model="mistral", messages=[{"role": "user", "content": prompt}])
        ai_reply = response["message"]["content"]
    except Exception as e:
        ai_reply = "Désolé, il y a eu une erreur en générant la réponse."

    return jsonify({"reply": ai_reply})

if __name__ == "__main__":
    app.run(debug=True)
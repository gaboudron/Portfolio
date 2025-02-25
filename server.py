from flask import Flask, request, jsonify
from neo4j import GraphDatabase
import openai
import os

app = Flask(__name__)

# Connexion à Neo4j
URI = "bolt://localhost:7687"  # Modifier si nécessaire
AUTH = ("neo4j", "password")
driver = GraphDatabase.driver(URI, auth=AUTH)

# API OpenAI
openai.api_key = "TA_CLE_API_OPENAI"

def query_neo4j(query, parameters={}):
    with driver.session() as session:
        result = session.run(query, parameters)
        return [record for record in result]

@app.route("/chat", methods=["POST"])
def chat():
    user_question = request.json["message"]

    # Requête pour chercher la réponse la plus pertinente dans Neo4j
    cypher_query = """
    MATCH (n)
    WHERE n.name CONTAINS $question OR n.description CONTAINS $question
    RETURN n.name AS name, n.description AS description LIMIT 3
    """
    results = query_neo4j(cypher_query, {"question": user_question})

    # Format des résultats
    context = "\n".join([f"{r['name']}: {r.get('description', 'Aucune description')}" for r in results])

    # Génération de réponse avec OpenAI
    prompt = f"Réponds à la question en te basant sur ces informations :\n{context}\n\nQuestion: {user_question}"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": "Tu es un assistant qui répond aux questions sur Ton Nom."},
                  {"role": "user", "content": prompt}]
    )

    return jsonify({"reply": response["choices"][0]["message"]["content"]})

if __name__ == "__main__":
    app.run(port=5000)

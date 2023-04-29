from flask import Flask, request, session
import io
from processing import *
import PyPDF2
import openai
import os
import sqlite3
from datetime import datetime
from flask_session import Session

# Create the application instance and configures session
app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Validates the OpenAI API key
@app.route('/key/', methods=['POST'])
def validate_key():
    try:
        key = request.json['key']
        openai.api_key = key
        model_list = openai.Model.list() # Attempts to call the openai API
    
        os.environ["OPENAI_API_KEY"] = key
        return {'is_valid': True}
    except:
        return {'is_valid': False}
    
@app.route('/signup/', methods=['POST'])
def signup():
    username = request.json["username"]
    password = request.json["password"]

    signup_valid = signup_user(username, password)
    if signup_valid:
        session['name'] = username
        return {'success': True, 'username': username}
    else:
        return {'success': False}

# Validates the user's login information
@app.route('/login/', methods=['POST'])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user_valid = validate_user(username, password)
    if user_valid:
        session['name'] = username
        return {'success': True, 'username': username}
    else:
        return {'success': False}

# Case where user uploads PDF
@app.route('/upload_pdf/', methods=['POST'])
def upload_pdf():
    try:
        file = request.files['file']
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file))

        store_text(pdf_reader)
        return {'success': True}
    except:
        return {'success': False}

# Case where user prompts chatbot for answer
@app.route('/chat/', methods=['POST'])
def chat():
    try:
        data = request.json['message']
        response = get_reply(data)
        return {'success': True, 'response': response}
    except:
        return {'success': False, 'response': None}
    
if __name__ == "__main__":
    # app.run()
    # pdf_reader = PyPDF2.PdfReader("223 textbook 2022-23.pdf")
    # store_text(pdf_reader)
    print(get_reply("Explain what happened in world war two"))
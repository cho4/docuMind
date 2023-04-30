from flask import Flask, request, session
import io
from processing import *
import PyPDF2
import openai
import os
import sqlite3
from datetime import datetime
from flask_cors import CORS

SESSION = [""]
# Create the application instance and configures session
app = Flask(__name__)
CORS(app)
app.secret_key = os.urandom(24)
# app.config["SESSION_PERMANENT"] = False
# app.config["SESSION_TYPE"] = "redis"
# app.config["SESSION_COOKIE_NAME"] = "pagetalk"

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
        # session['name'] = username
        SESSION[0] = username
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
        # session['name'] = username
        SESSION[0] = username
        return {'success': True, 'username': username}
    else:
        return {'success': False}

# Case where user uploads PDF
@app.route('/upload_pdf/', methods=['POST'])
def upload_pdf():
    try:
        file = request.files['file']
        pdf_reader = PyPDF2.PdfReader(file)
        SESSION[0] = 'bob'
        store_text(pdf_reader, file.filename, SESSION[0]) # passes PDF, file name which is part of request object, and username
        return {'success': True}
    except:
        return {'success': False}

# Case where user prompts chatbot for answer
@app.route('/chat/', methods=['POST'])
def chat():
    try: 
        query = request.json['message']
        title = request.json['title']
        # response = get_reply(query, title, session['name'])
        response = get_reply(query, title, SESSION[0])

        return {'success': True, 'response': response}
    except Exception as e:
        print(e)
        return {'success': False, 'response': None}
    

@app.route('/access_messages/', methods=['POST'])
def access_messages():
    try:
        title = request.json['title']
        # messages = get_chats(session['name'], title)
        messages = get_chats(SESSION[0], title)

        return {'success': True, 'chat': messages}
    except:
        return {'success': False, 'chat': None}



if __name__ == "__main__":
    app.run()

from flask import Flask, request
import io
from processing import *
import PyPDF2
import openai
import os

app = Flask(__name__)

@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():

    try:
        file = request.files['file']
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file))

        store_text(pdf_reader)
        
        return {'success': True}
     
    except:
        return {'success': False}


@app.route('/key', methods=['POST'])
def validate_key():

    try:
        key = request.json['key']
        openai.api_key = key
        model_list = openai.Model.list() # Attempts to call the openai API
    
        os.environ["OPENAI_API_KEY"] = key
        return {'is_valid': True}

    except:
        return {'is_valid': False}



@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json['message']
        response = get_reply(data)
        
        return {'success': True, 'response': response}
     
    except:
        return {'success': False, 'response': None}
    

@app.route('/test', methods=['GET'])
def test():

    return {'info': 'this is a test'}


if __name__ == "__main__":
    # app.run()

    # pdf_reader = PyPDF2.PdfReader("223 textbook 2022-23.pdf")
    # store_text(pdf_reader)
    # print('done')

    print(get_reply("Explain what happened in world war two"))
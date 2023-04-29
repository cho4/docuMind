from flask import Flask, request
import io
from processing import *
import PyPDF2

app = Flask(__name__)

@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():

    try:
        file = request.files['file']
        pdf_reader = PyPDF2.PdfFileReader(io.BytesIO(file))

        chain = store_text(pdf_reader)
        
        return {'status': 'success'}
     
    except:
        return {'status': 'failure'}

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json['message']
        response = get_reply(data['message'])
        
        return {'status': 'success', 'response': response}
     
    except:
        return {'status': 'failure'}
    
@app.route('/test', methods=['GET'])
def test():

    return {'info': 'this is a test'}


if __name__ == "__main__":
    app.run()

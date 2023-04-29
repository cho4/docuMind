from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter
import sqlite3
import datetime
import pickle
import os

def signup_user(username, password):
    conn = sqlite3.connect("pagetalk.db")
    cur = conn.cursor()
    cur.execute('SELECT * FROM Users WHERE username=?', (username))
    if cur.fetchone() is None:
        cur.execute('INSERT INTO Users VALUES (?, ?)', (username, password))
        conn.commit()
        return True
    else:
        return False

def validate_user(username, password):
    conn = sqlite3.connect("pagetalk.db")
    cur = conn.cursor()
    cur.execute('SELECT * FROM Users WHERE username=? AND password=?', (username, password))
    if cur.fetchone() is None:
        return False
    else:
        return True

def get_reply(query):
    with open('db.pickle', 'rb') as f:
        db = pickle.load(f)

    with open('chain.pickle', 'rb') as f:
        chain = pickle.load(f)

    docs = db.similarity_search(query)
    return chain.run(input_documents=docs, question=query)

def store_text(pdf_reader):

    text = get_text(pdf_reader) # Retrieves the raw text from the pdf
    chunks = chunk_text(text) # Separates the text into chunks 

    embeddings = OpenAIEmbeddings()
    db = FAISS.from_texts(chunks, embeddings)
    chain = load_qa_chain(OpenAI(), chain_type="stuff")

    db_serialized = pickle.dumps(db)
    chain_serialized = pickle.dumps(chain)

    # FIGURE THIS OUT

    conn = sqlite3.connect("pagetalk.db")
    cur = conn.cursor()
    cur.execute('INSERT INTO Chats (?, ?, ?, ?)', (db_serialized, chain_serialized))

    
    # with open('db.pickle', 'wb') as f:
    #     pickle.dump(db, f)

    # with open('chain.pickle', 'wb') as f:
    #     pickle.dump(chain, f)
    
    print('done storing text')


def chunk_text(text):
    text_splitter = CharacterTextSplitter(
        separator = '\n',
        chunk_size = 2000,
        chunk_overlap = 200,
        length_function = len,
    )

    chunks = text_splitter.split_text(text)
    print('done chunking text')
    return chunks

def get_text(pdf_reader):
    raw_text = ''
    for i, page in enumerate(pdf_reader.pages):
        text = page.extract_text()
        if text:
            raw_text += text

    print('done fetching text from pdf')
    return raw_text

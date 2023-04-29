from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter
import sqlite3
import datetime
import pickle
import os

# Validates user signup, checks existing usernames
def signup_user(username, password):
    conn = sqlite3.connect("pagetalk.db")
    cur = conn.cursor()
    cur.execute('SELECT * FROM Users WHERE username=?', (username))
    if cur.fetchone() is None:
        cur.execute('INSERT INTO Users VALUES (?, ?)', (username, password))
        conn.commit()
        conn.close()
        return True
    else:
        conn.close()
        return False

# Validates user login, checks match between username and password
def validate_user(username, password):
    conn = sqlite3.connect("pagetalk.db")
    cur = conn.cursor()
    cur.execute('SELECT * FROM Users WHERE username=? AND password=?', (username, password))
    if cur.fetchone() is None:
        conn.close()
        return False
    else:
        conn.close()
        return True

# Runs query through the similarity search and question answering chain
def get_reply(query, conversation, username):
    conn = sqlite3.connect("pagetalk.db")
    cur = conn.cursor()
    cur.execute('SELECT * FROM Chats WHERE username=? AND conversation=?', (username, conversation))
    results = cur.fetchone()
    chain = pickle.loads(results[2])
    db = pickle.loads(results[3])

    docs = db.similarity_search(query)
    return chain.run(input_documents=docs, question=query)

# Stores text, and all relevant information in the database
def store_text(pdf_reader, title, username):
    text = get_text(pdf_reader) # Retrieves the raw text from the pdf
    chunks = chunk_text(text) # Separates the text into chunks 

    os.environ["OPENAI_API_KEY"] = '' # TEMPORARY HARD CODED LINE

    embeddings = OpenAIEmbeddings()
    db = FAISS.from_texts(chunks, embeddings)
    chain = load_qa_chain(OpenAI(), chain_type="stuff")

    db_serialized = pickle.dumps(db)
    chain_serialized = pickle.dumps(chain)

    conn = sqlite3.connect("pagetalk.db")
    cur = conn.cursor()
    cur.execute('INSERT INTO Chats VALUES(?, ?, ?, ?)', (title, username, db_serialized, chain_serialized))
    conn.commit()
    conn.close()
    

# Separates text into chunks for token limit
def chunk_text(text):
    text_splitter = CharacterTextSplitter(
        separator = '\n',
        chunk_size = 2000,
        chunk_overlap = 200,
        length_function = len,
    )

    chunks = text_splitter.split_text(text)
    return chunks

# Retrieves raw text from pdf
def get_text(pdf_reader):
    raw_text = ''
    for page in pdf_reader.pages:
        text = page.extract_text()
        if text:
            raw_text += text

    return raw_text

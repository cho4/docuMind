from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter

import pickle



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
    db = FAISS.from_documents(text, embeddings)
    chain = load_qa_chain(OpenAI(), chain_type="stuff")

    with open('db.pickle', 'wb') as f:
        pickle.dump(db, f)

    with open('chain.pickle', 'wb') as f:
        pickle.dump(chain, f)



def chunk_text(text):
    text_splitter = CharacterTextSplitter(
        separator = '\n',
        chunk_size = 1000,
        chunk_overlap = 200,
        length_function = len,
    )

    chunks = text_splitter.split_text(text)
    return chunks


def get_text(pdf_reader):
    raw_text = ''
    for i, page in enumerate(pdf_reader.pages):
        text = page.extract_text()
        if text:
            raw_text += text

    return raw_text

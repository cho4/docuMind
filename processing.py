from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI

embeddings = OpenAIEmbeddings()

db = FAISS.from_documents(texts, embeddings)
chain = load_qa_chain(OpenAI(), chain_type="stuff")



def get_reply(query):
    docs = db.similarity_search(query)
    return chain.run(input_documents=docs, question=query)




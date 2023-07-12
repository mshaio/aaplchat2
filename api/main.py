from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from secrets import OPENAI_API_KEY
from chat_utils import ask
import openai

openai.api_key = OPENAI_API_KEY
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ask_aapl/")
async def ask_aapl(query_prompt: str):
  return {"result": ask(query_prompt)}
  
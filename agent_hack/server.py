from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app import ai_generate_character, ai_generate_life_event, ai_generate_consequence

app = FastAPI()

# Allow frontend (Vite) requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
class CharacterRequest(BaseModel):
    name: str = "any"
    gender: str = "any"
    starting_location: str = "any"
    nationality: str = "any"
    ethnicity: str = "any"

class LifeEventRequest(BaseModel):
    character: dict
    category: str

class ConsequenceRequest(BaseModel):
    character: dict
    event: str
    choice: str


@app.get("/")
def home():
    return {"message": "FastAPI server is running 🚀"}


@app.post("/generate_character")
async def generate_character(req: CharacterRequest):
    result = ai_generate_character(req.dict())
    return result


@app.post("/generate_event")
def generate_event(request: LifeEventRequest):
    data = ai_generate_life_event(request.character, request.category)
    return {"event": data}


@app.post("/generate_consequence")
def generate_consequence(request: ConsequenceRequest):
    data = ai_generate_consequence(request.character, request.event, request.choice)
    return {"consequence": data}

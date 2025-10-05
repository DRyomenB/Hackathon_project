from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema.output_parser import StrOutputParser
from dotenv import load_dotenv
import os
import json

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# -----------------------------
# PROMPTS
# -----------------------------

ai_character_prompt = PromptTemplate.from_template("""
You are an AI that generates a unique character profile for a life simulation game.
Use the following user preferences if provided; otherwise, generate freely. 
                                                   

User preferences:
- Name: {name}
- Gender: {gender}
- Nationality: {nationality}


Respond with a brief (3-6 traits, backstory at most 4 sentences) character description in this format:
Name: ...
Gender: ...
Age: ...
Nationality: ...
Personality: ...
Physical traits: ...
Backstory: ...
""")

life_event_prompt = PromptTemplate.from_template("""
You are an AI that generates a life event for a character in a life simulation game.

Character info:
- Name: {name}
- Age: {age}
- Traits: {traits}
- Location: {location}

Generate a life event in the "{category}" category (career, relationships, family, etc.).
Keep it realistic and concise (2–4 sentences).
""")

consequence_prompt = PromptTemplate.from_template("""
You are an AI that determines the consequences of a player's choice in a life simulation game.

Character info:
- Name: {name}
- Age: {age}

Life event: {event}
Player choice: {choice}

Generate the consequence (2–4 sentences).
""")

# -----------------------------
# HELPER FUNCTIONS FOR BACKEND
# -----------------------------

def ai_generate_character(preferences: dict):
    """Generate a character profile using LangChain."""
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.9, openai_api_key=api_key)
    chain = ai_character_prompt | llm | StrOutputParser()
    response = chain.invoke(preferences)

    # Parse response into dict
    lines = response.strip().split('\n')
    char_data = {}
    for line in lines:
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip().lower().replace(' ', '_')
            value = value.strip()
            if key == "physical_traits":
                char_data[key] = [t.strip() for t in value.split(',')]
            else:
                char_data[key] = value

    # Ensure some required fields exist
    if "current_age" not in char_data and "age" in char_data:
        char_data["current_age"] = char_data["age"]

    return char_data


def ai_generate_life_event(character: dict, category: str):
    """Generate a life event given a character and category."""
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.8, openai_api_key=api_key)
    chain = life_event_prompt | llm | StrOutputParser()
    response = chain.invoke({
        "name": character.get("name", "Unnamed"),
        "age": character.get("current_age", "unknown"),
        "category": category,
        "traits": ", ".join(character.get("physical_traits", [])),
        "location": character.get("starting_location", "unknown")
    })
    return response


def ai_generate_consequence(character: dict, event: str, choice: str):
    """Generate a consequence given a character, event, and choice."""
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7, openai_api_key=api_key)
    chain = consequence_prompt | llm | StrOutputParser()
    response = chain.invoke({
        "name": character.get("name", "Unnamed"),
        "age": character.get("current_age", "unknown"),
        "event": event,
        "choice": choice
    })
    return response

# 🎮 Life Simulator - AI-Powered Character Life Simulation

A Python-based life simulation game where you create a character and guide them through life events with AI-generated consequences. Your choices matter - and death is permanent!

## 🌟 Features

### Character Creation
- **Manual Creation**: Design your own character with custom traits
- **AI Generation**: Let AI create a unique character for you
- **Character Attributes**: Name, gender, physical traits, location, nationality, ethnicity

### Life Event System
- **7 Life Categories**: Education, Career, Family, Relationships, Health, Travel, Crime
- **AI-Generated Events**: Realistic life scenarios based on character traits and age
- **Choice-Based Gameplay**: Make decisions that shape your character's destiny
- **Consequence System**: AI generates realistic outcomes for your choices

### Death Detection
- **Permanent Death**: Characters can die from their choices
- **Automatic Termination**: Program stops when character dies
- **Death Screen**: Dramatic death announcement with life summary
- **Life History**: Complete record of all events and choices

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- OpenAI API key
- Required Python packages (see Installation)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd agent_hack
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the project root:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Run the simulation**
   ```bash
   python app.py
   ```

## 🎯 How to Play

### 1. Character Creation
```
Welcome to Life Simulator
========================
1. Create my own character
2. Let the AI create one for me

Enter your choice (1 or 2):
```

**Option 1 - Manual Creation:**
- Enter character details manually
- Customize all attributes

**Option 2 - AI Generation:**
- Provide preferences or let AI choose
- AI creates unique character with realistic attributes

### 2. Life Simulation
```
--- Age 18 ---
1. Experience a life event
2. Age up
3. Exit simulation

What would you like to do?
```

**Life Event Categories:**
1. **Education** - School, learning, academic achievements
2. **Career** - Jobs, promotions, professional milestones  
3. **Family** - Family events, relationships, traditions
4. **Relationships** - Friendships, romance, social connections
5. **Health** - Illnesses, fitness, medical events
6. **Travel** - Vacations, moves, cultural experiences
7. **Crime** - Legal issues, justice system involvement

### 3. Making Choices
```
EVENT: Armed Robbery at Convenience Store
============================================================
You're working the night shift when armed robbers enter...

What do you do?
1. Hide behind the counter and call 911
2. Try to be a hero and confront them
3. Run for the exit immediately

Enter your choice (1-3):
```

### 4. Consequences
- AI generates realistic outcomes
- Choices can lead to positive or negative results
- **Death is permanent** - program stops if character dies

## 💀 Death System

The simulation includes a comprehensive death detection system:

### Death Keywords Detected:
- "died", "death", "deceased", "passed away"
- "killed", "murdered", "didn't survive"
- "lost their life", "perished", "succumbed"
- "fatal", "lethal", "dead", "expired"

### Death Screen:
```
============================================================
💀 CHARACTER DEATH 💀
============================================================
John has died at age 22.
Final event: Armed Robbery at Convenience Store
Last choice: Try to be a hero and confront them
Consequence: John decided to confront the armed robber, but tragically didn't survive...
============================================================

Game Over. John lived to age 22.
```

## 📁 Project Structure

```
agent_hack/
├── app.py               # Main life simukation game 
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (create this)
├── venv/               # Virtual environment
└── README.md           # This file
```

## 🔧 Technical Details

### Dependencies
- `langchain` - AI framework for prompt management
- `langchain-openai` - OpenAI integration
- `pydantic` - Data validation and settings
- `python-dotenv` - Environment variable management
- `flask` - Web API framework (for app.py)

### AI Models Used
- **GPT-4o-mini** - Character generation and life events
- **Temperature 0.7** - Balanced creativity and consistency

### Key Classes
- `Character_creation` - Character data model
- `life_event_engine` - Life event generation and management
- `simulate_life` - Main game loop

## 🎮 Game Mechanics

### Age Progression
- Start at age 18
- Age up manually or through events
- Events become more complex with age

### Choice Impact
- Every choice has consequences
- Consequences affect future events
- Character traits influence available choices

### Life History
- Complete record of all events
- Shows choices made and outcomes
- Highlights death events prominently

## 🚨 Important Notes

- **Death is Permanent**: Once a character dies, the game ends
- **API Costs**: Uses OpenAI API - monitor your usage
- **Random Events**: AI generates unpredictable scenarios
- **Realistic Consequences**: Not all choices lead to happy endings

## 🔮 Future Enhancements

- [ ] Save/load character progress
- [ ] Multiple character support
- [ ] Achievement system
- [ ] Family tree generation
- [ ] Career progression tracking
- [ ] Relationship status system
- [ ] Health and aging mechanics

## 🐛 Troubleshooting

### Common Issues

**"OPENAI_API_KEY environment variable is required"**
- Make sure you have a `.env` file with your OpenAI API key
- Check that the key is valid and has credits

**"Invalid choice!" errors**
- Make sure to enter numbers (1, 2, 3) for choices
- Check that you're selecting valid options

**Character not generating properly**
- Check your internet connection
- Verify OpenAI API key is working
- Try reducing temperature in the LLM settings

## 📄 License

This project is for educational and entertainment purposes. Please respect OpenAI's usage policies when using their API.

## 🤝 Contributing

Feel free to fork this project and add your own features! Some ideas:
- New life event categories
- More sophisticated death detection
- Character relationship systems
- Visual interface improvements

---

**Enjoy your virtual life! Remember - every choice matters! 🎲**
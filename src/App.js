import "./App.css";
import React, { useState } from "react";

function App() {
  const [randomDie, setRandomDie] = useState(null);
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [hints, setHints] = useState([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState("main");
  const [showReviewSection, setShowReviewSection] = useState(false);

  const elements = [
    "Algorithms",
    "Brand Style Guide",
    "Conversion Funnels",
    "Cybersecurity",
    "Editorial",
    "Green IT and Eco Design",
    "HTML/CSS",
    "Relational Databases",
    "Soft Skills",
    "Traffic Acquisition",
    "Using the Internet",
    "Wireframes",
  ];

  const difficulties = ["Easy", "Medium", "Hard", "Mystery"];

  const difficultyColors = {
    Easy: "#2A9D8F",
    Medium: "#F4A261",
    Hard: "#E76F51",
    Mystery: "purple",
  };

  const difficultyPoints = {
    Easy: "5",
    Medium: "10",
    Hard: "15",
    Mystery: "2x current",
  };

  const hintsData = {
    Algorithms: {
      Easy: [
        "Hint 1: It can follow instructions.",
        "Hint 2: Often seen in sci-fi movies.",
        "Hint 3: Sometimes replaces humans in factories.",
      ],
      Medium: [
        "Hint 1: It's used to solve math problems.",
        "Hint 2: Essential for computers to process data.",
        "Hint 3: Algorithms perform millions of these in seconds.",
      ],
      Hard: [
        "Hint 1: A popular app powered by recommendation algorithms.",
        "Hint 2: Known for short videos and viral trends.",
        "Hint 3: Its 'For You' page learns your preferences over time.",
      ],
    },
    "Green IT and Eco Design": {
      Easy: [
        "Hint 1: It's the study of nature and the environment.",
        "Hint 2: Focuses on how living things interact with each other and their surroundings.",
        "Hint 3: A key concept in sustainability.",
      ],
      Medium: [
        "Hint 1: A search engine that plants trees.",
        "Hint 2: An eco-friendly alternative to Google.",
        "Hint 3: The more you search, the more trees get planted!",
      ],
      Hard: [
        "Hint 1: A term for products or practices that are good for the environment.",
        "Hint 2: Often associated with reducing waste and pollution.",
        "Hint 3: Synonym for 'sustainable' or 'green.'",
      ],
    },
    Editorial: {
      Easy: [
        "Hint 1: A website where people write articles or share personal stories.",
        "Hint 2: Often updated regularly with new content.",
        "Hint 3: Popular among influencers and companies for communication.",
      ],
      Medium: [
        "Hint 1: A plan that organizes tasks or events by time.",
        "Hint 2: Helps ensure content is posted at the right moment.",
        "Hint 3: Synonym for 'calendar' or 'timeline.'",
      ],
      Hard: [
        "Hint 1: A company known for social media platforms like Facebook and Instagram.",
        "Hint 2: It’s also a term for describing something about itself, like 'metadata.'",
        "Hint 3: Recently rebranded to focus on the metaverse.",
      ],
    },
    "Relational Databases": {
      Easy: [
        "Hint 1: It's what databases store and organize.",
        "Hint 2: Another word for 'data.'",
        "Hint 3: Essential for making decisions or answering questions.",
      ],
      Medium: [
        "Hint 1: A computer or system that provides data to other devices.",
        "Hint 2: Often stored in data centers.",
        "Hint 3: Think of it as the 'brain' behind a website or application.",
      ],
      Hard: [
        "Hint 1: Where data is kept in a database.",
        "Hint 2: Can be physical (hard drives) or virtual (cloud).",
        "Hint 3: Synonym for 'saving' or 'keeping.'",
      ],
    },
    "HTML/CSS": {
      Easy: [
        "Hint 1: It’s what developers write to build websites and apps.",
        "Hint 2: HTML and CSS are examples of this.",
        "Hint 3: It often lives in files with extensions like .html or .css.",
      ],
      Medium: [
        "Hint 1: It refers to the process of creating software or websites.",
        "Hint 2: There are front-end and back-end types of this.",
        "Hint 3: Tools like VS Code and Git are commonly used in this.",
      ],
      Hard: [
        "Hint 1: In HTML, this tag contains everything visible on a webpage.",
        "Hint 2: It is defined using <body>...</body>.",
        "Hint 3: It works alongside the <head> tag in an HTML document.",
      ],
    },
    "Conversion Funnels": {
      Easy: [
        "Hint 1: They are the people who buy products or services.",
        "Hint 2: Businesses always try to attract more of them.",
        "Hint 3: They are often referred to as 'clients' or 'buyers.'",
      ],
      Medium: [
        "Hint 1: A narrow path that connects two places.",
        "Hint 2: Used metaphorically to describe the steps in a sales process.",
        "Hint 3: It’s dark and long in the real world, but digital in marketing.",
      ],
      Hard: [
        "Hint 1: It happens when a user completes a desired action (e.g., making a purchase).",
        "Hint 2: Often seen as the goal of a funnel in marketing.",
        "Hint 3: Think of it as 'turning visitors into buyers.'",
      ],
    },
    "Brand Style Guide": {
      Easy: [
        "Hint 1: It represents a company or brand.",
        "Hint 2: Often includes symbols, text, or both.",
        "Hint 3: Found on business cards, websites, and products.",
      ],
      Medium: [
        "Hint 1: A selection of hues used in branding.",
        "Hint 2: Designers use this to create a consistent look.",
        "Hint 3: Often includes primary, secondary, and accent tones.",
      ],
      Hard: [
        "Hint 1: A document outlining visual rules for a brand.",
        "Hint 2: Includes information about typography, colors, and logos.",
        "Hint 3: Essential for maintaining a consistent identity across media.",
      ],
    },
    Wireframes: {
      Easy: [
        "Hint 1: It’s about creating user-friendly experiences.",
        "Hint 2: Short for 'User Experience.'",
        "Hint 3: Focuses on how users interact with a website or app.",
      ],
      Medium: [
        "Hint 1: A popular tool for creating wireframes and prototypes.",
        "Hint 2: It’s collaborative and works in your browser.",
        "Hint 3: Designers love it for its ease of use and versatility.",
      ],
      Hard: [
        "Hint 1: Ensures designs are comfortable and easy to use.",
        "Hint 2: A principle of making interfaces fit users' needs.",
        "Hint 3: Often associated with usability and accessibility.",
      ],
    },
    Cybersecurity: {
      Easy: [
        "Hint 1: You need it to access your accounts.",
        "Hint 2: It should always be unique and strong.",
        "Hint 3: Combine letters, numbers, and symbols to make it secure.",
      ],
      Medium: [
        "Hint 1: A scam to steal personal information.",
        "Hint 2: Often disguised as fake emails or websites.",
        "Hint 3: It lures you into giving away passwords or credit card details.",
      ],
      Hard: [
        "Hint 1: A digital barrier that protects your computer or network.",
        "Hint 2: Keeps unauthorized users from accessing your data.",
        "Hint 3: Think of it as a 'wall of fire' for your online safety.",
      ],
    },
    "Soft Skills": {
      Easy: [
        "Hint 1: The skill of sharing information clearly.",
        "Hint 2: It can be verbal, written, or non-verbal.",
        "Hint 3: Essential for teamwork and relationships.",
      ],
      Medium: [
        "Hint 1: How you act in different situations.",
        "Hint 2: Can be professional, friendly, or inappropriate.",
        "Hint 3: Reflects your attitude and personality.",
      ],
      Hard: [
        "Hint 1: Related to mental well-being in social contexts.",
        "Hint 2: Helps you understand how emotions and interactions affect people.",
        "Hint 3: Important for creating a healthy and supportive workplace.",
      ],
    },
    "Traffic Acquisition": {
      Easy: [
        "Hint 1: People who come to your website.",
        "Hint 2: The goal is to attract as many of them as possible.",
        "Hint 3: They can come from ads, search engines, or social media.",
      ],
      Medium: [
        "Hint 1: Stands for 'Search Engine Optimization.'",
        "Hint 2: Helps websites rank higher on Google.",
        "Hint 3: Involves keywords, backlinks, and good content.",
      ],
      Hard: [
        "Hint 1: A metric used in online advertising.",
        "Hint 2: It measures how much you pay each time someone clicks on your ad.",
        "Hint 3: Abbreviated as 'CPC.'",
      ],
    },
    "Using the Internet": {
      Easy: [
        "Hint 1: Tools like Google, Bing, or Yahoo.",
        "Hint 2: They help you find information online.",
        "Hint 3: Type a keyword, and they show you results.",
      ],
      Medium: [
        "Hint 1: What you look for when you search online.",
        "Hint 2: Can be in the form of text, images, or videos.",
        "Hint 3: The internet is full of it—both true and false!",
      ],
      Hard: [
        "Hint 1: The process that organizes web pages for search engines.",
        "Hint 2: Makes it easier to find websites based on keywords.",
        "Hint 3: Google bots do this to understand what’s on a webpage.",
      ],
    },
  };

  const handleRollDice = () => {
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    const randomDifficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];
    setRandomDie({ element: randomElement, difficulty: randomDifficulty });
  };

  const handleShowHints = () => {
    setCurrentHintIndex((prevIndex) =>
      Math.min(prevIndex + 1, hints.length - 1)
    );
  };

  const handleElementChange = (e) => {
    setSelectedElement(e.target.value);
    setSelectedDifficulty("");
    setHints([]);
    setCurrentHintIndex(0);
  };

  const handleDifficultyChange = (e) => {
    const difficulty = e.target.value;
    setSelectedDifficulty(difficulty);
    if (selectedElement && difficulty) {
      setHints(hintsData[selectedElement][difficulty] || []);
      setCurrentHintIndex(0);
    }
  };

  return (
    <div className="App">
      <video autoPlay loop muted className="App-video-background">
        <source
          src={`${process.env.PUBLIC_URL}/videos/cloudbackground.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {currentPage === "main" && (
        <div className="App-header">
          <h1 className="App-header-title">Head in the Clouds</h1>
          <p className="App-header-subtitle">
            Welcome to the Head in the Clouds game!
          </p>
          <div className="App-header-actions">
            <button
              className="App-header-actions-roll-dice-button"
              onClick={handleRollDice}
            >
              Randomize
            </button>
          </div>
          <div id="dice-result" className="App-header-dice-result">
            {randomDie !== null && (
              <p>
                You got: {randomDie.element} -{" "}
                <span
                  style={{
                    color: difficultyColors[randomDie.difficulty],
                    textShadow:
                      randomDie.difficulty === "Mystery"
                        ? "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px purple, 0 0 30px purple, 0 0 40px purple, 0 0 55px purple, 0 0 75px purple"
                        : "none",
                  }}
                >
                  {randomDie.difficulty}{" "}
                  {difficultyPoints[randomDie.difficulty]} points
                </span>
              </p>
            )}
          </div>
        </div>
      )}
      {currentPage === "hints" && (
        <div className="App-hints">
          <h1 className="App-header-title">Stuck? Need a hint?</h1>
          <div className="App-hint-form">
            <select
              className="App-hint-form-element-select"
              value={selectedElement}
              onChange={handleElementChange}
            >
              <option value="">Select Element</option>
              {elements.map((element) => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
            <select
              className="App-hint-form-difficulty-select"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <option value="">Select Difficulty</option>
              {difficulties
                .filter((difficulty) => difficulty !== "Mystery")
                .map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
            </select>

            <div className="App-hints-list">
              {hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                <p key={index} className="App-hints-list-item">
                  {hint}
                </p>
              ))}
            </div>
            {currentHintIndex < hints.length - 1 && (
              <button
                className="App-header-actions-show-hint-menu"
                onClick={handleShowHints}
              >
                {"Show Another Hint"}
              </button>
            )}
          </div>
        </div>
      )}
      {currentPage === "rules" && (
        <div className="App-rules">
          <h1 className="App-header-title">Rules of the game</h1>
          <h2>
            <strong>Game Title: Head in the Clouds</strong>
          </h2>

          <h3>
            <strong>
              !! WARNING THESE RULES ARE FOR ADVANCED ENGLISH SPEAKERS !!
            </strong>
          </h3>

          <h3>
            <strong>Objective of the Game</strong>
          </h3>
          <p>
            The objective of the game is to find your identity which is written
            on your post-it on your head.
          </p>

          <h3>
            <strong>Game Components</strong>
          </h3>
          <ul>
            <li>
              A box for the packaging of the game (with a QR CODE on the inside
              of the lead and rules on the bottom)
            </li>
            <li>
              Cards for each level and each topic (12 topics x 4 levels +
              creative cards)
            </li>
            <li>Virtual dice on your smartphone</li>
            <li>
              Post-it notes or other materials to write the players' identities
              and stick them on each player's forehead
            </li>
          </ul>

          <h3>
            <strong>Setup</strong>
          </h3>

          <li>
            Create 12 stacks of cards, one for each theme (e.g., cybersecurity,
            algorithms, etc.).
          </li>
          <li>
            Choose the person who is the least comfortable in English to start
            the game.
          </li>

          <h3>
            <strong>How to Play</strong>
          </h3>
          <ol>
            <li>
              <strong>Start the game</strong>
              <ul>
                <li>
                  After selecting the first person to play, the first person
                  says the difficulty he wants out loud, either easy, medium or
                  hard, then the person to the left of the first player picks a
                  card and writes the word of the card onto a post-it note, the
                  player can only look at the card category, and then he sticks
                  the post it to his forehead without looking at the word.
                </li>
                <li>
                  Repeat the action so that all players have an 'identity' and
                  you can then start the game.
                </li>
              </ul>
            </li>
            <li>
              <strong>Turn Structure</strong>
              <ul>
                <li>
                  Each player takes turns asking yes/no questions to narrow down
                  the possibilities until they are more or less sure of the
                  word. Then they get 2-3 tries to guess the word.
                </li>
              </ul>
            </li>
            <li>
              <strong>Actions</strong>
              <ul>
                <li>Ask a yes/no question.</li>
                <li>
                  Guess the specific word if you think you have found your
                  identity.
                </li>
              </ul>
            </li>
          </ol>

          <h3>
            <strong>Winning the Game</strong>
          </h3>
          <p>
            The player guesses the word right and amasses a total of 30 points.
          </p>
          <p>As a reminder, each level earns you the following points:</p>
          <ul>
            <li>
              <strong>Easy</strong> = 5 points
            </li>
            <li>
              <strong>Medium</strong> = 10 points
            </li>
            <li>
              <strong>Hard</strong> = 15 points
            </li>
            <li>
              <strong>Mystery</strong> = x2 of your level
            </li>
          </ul>
        </div>
      )}
      <img
        src={`${process.env.PUBLIC_URL}/images/popup.png`}
        alt="Popup"
        className="popup-image"
        onClick={() => setShowReviewSection(!showReviewSection)}
      />
      {showReviewSection && (
        <div className={`App-reviews ${showReviewSection ? "expanded" : ""}`}>
          <p className="App-header-instructions">Please review our game!</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScV0t29HsNYqeNbGqbMbd-kUC1CmXCOHO94gWKXzeAXpgdCww/viewform?pli=1&usp=pp_url"
            target="_blank"
            rel="noopener noreferrer"
            className="App-header-link-button"
          >
            Go to Link
          </a>
        </div>
      )}
      <div className="App-footer">
        <button
          className={`App-footer-button ${
            currentPage === "main" ? "active" : ""
          }`}
          onClick={() => setCurrentPage("main")}
        >
          Main Page
        </button>
        <button
          className={`App-footer-button ${
            currentPage === "hints" ? "active" : ""
          }`}
          onClick={() => setCurrentPage("hints")}
        >
          Hints Page
        </button>
        <button
          className={`App-footer-button ${
            currentPage === "rules" ? "active" : ""
          }`}
          onClick={() => setCurrentPage("rules")}
        >
          Rules Page
        </button>
      </div>
    </div>
  );
}

export default App;

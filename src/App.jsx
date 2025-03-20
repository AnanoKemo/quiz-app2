import "./App.css";
import circle from "./assets/circle.png";
import one from "./assets/1.png";
import two from "./assets/2.png";
import three from "./assets/3.png";
import four from "./assets/4.png";
import circle2 from "./assets/circle2.png";
import circle3 from "./assets/circle3.png";
import circle4 from "./assets/circle4.png";
import { useState, useEffect } from "react";
import { data } from "./questions.js";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedOption, setSelectedOption] = useState(null);
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const pageImages = {
    home: circle,
    html: one,
    css: two,
    js: three,
    accessibility: four,
  };

  const selectedTopic = data.find((topic) => topic.title.toLowerCase() === currentPage);
  const currentQuestion = selectedTopic?.questions[step];

  const handleBoxClick = (index) => {
    if (!answered) {
      setSelectedOption(index);
    }
  };

  const handleNextQuestion = () => {
    if (step < selectedTopic.questions.length - 1) {
      setStep(step + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleRestartQuiz = () => {
    setQuizFinished(false);
    setCurrentPage("home");
    setStep(0);
    setScore(0);
    setSelectedOption(null);
    setAnswered(false);
  };

  const renderQuizPage = (subject) => (
    <div className="quiz-page fade-in">
      <div className="quiz-header">
        <img src={pageImages[currentPage]} alt="Page Image" />
        <h1>{subject} Quiz</h1>
        <p>{currentQuestion?.questionNumber}</p>
      </div>

      <div className="question-name">
        <h2>{currentQuestion?.question}</h2>
        <div className="options-container">
          {currentQuestion?.options.map((option, index) => (
            <div
              key={index}
              className={`box 
                ${selectedOption === index ? "selected" : ""} 
                ${answered && index === currentQuestion.correctAnswerIndex ? "correct" : ""}
                ${answered && selectedOption === index && index !== currentQuestion.correctAnswerIndex ? "wrong" : ""}
              `}
              onClick={() => handleBoxClick(index)}
            >
              <div className="letter-box">{String.fromCharCode(65 + index)}</div>
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="submit-answer">
        {!answered ? (
          <button className="submit-button" disabled={selectedOption === null} onClick={handleSubmitAnswer}>
            Submit answer
          </button>
        ) : (
          <button className="next-button" onClick={handleNextQuestion}>
            {step < selectedTopic.questions.length - 1 ? "Next question" : "Finish quiz"}
          </button>
        )}
      </div>

      <div className="mode-toggle" onClick={toggleDarkMode}>
        <div className={`circle ${darkMode ? "move" : ""}`}></div>
      </div>
    </div>
  );

  return (
    <div className="background">
      {quizFinished ? (
        <div className="quiz-end fade-in">
          <h1>quiz completed!</h1>
          <p>You scored {score} out of {selectedTopic.questions.length}!</p>
          <button className="restart-button" onClick={handleRestartQuiz}>Go to homepage</button>
        </div>
      ) : currentPage === "home" ? (
        <div>
          <div className="image-wrapper">
            <img src={darkMode ? circle4 : circle} alt="Circle" />
          </div>
          <div className="overlay">
            <p>
              <span className="normal">Welcome to the </span>
              <span className="bold">frontend quiz!</span>
              <br />
              <span className="lighter">Pick a subject to get started</span>
            </p>
          </div>
          <div className="container">
            {["html", "css", "js", "accessibility"].map((topic, index) => (
              <div className="box" key={topic} onClick={() => setCurrentPage(topic)}>
                <img src={[one, two, three, four][index]} alt={topic} className="box-img" />
                {topic.toUpperCase()}
              </div>
            ))}
          </div>
          <div className="mode-toggle" onClick={toggleDarkMode}>
            <div className={`circle ${darkMode ? "move" : ""}`}></div>
          </div>
          <img src={darkMode ? circle3 : circle2} alt="Circle2" className="circle2" />
        </div>
      ) : (
        renderQuizPage(selectedTopic.title)
      )}
    </div>
  );
}

export default App;

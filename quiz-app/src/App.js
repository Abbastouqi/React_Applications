import React, { useState } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newCorrectOption, setNewCorrectOption] = useState('');

  const addQuestion = () => {
    if (newQuestion && newOptions.every(option => option) && newCorrectOption) {
      setQuestions([...questions, {
        question: newQuestion,
        options: newOptions,
        correctOption: newCorrectOption
      }]);
      setNewQuestion('');
      setNewOptions(['', '', '', '']);
      setNewCorrectOption('');
    }
  };

  const startQuiz = () => {
    if (questions.length > 0) {
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
    }
  };

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctOption) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>QUIZ APP BY ABBAS</h1>
      </header>
      <div className="app-content">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : currentQuestion !== null ? (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">{questions[currentQuestion].question}</div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswerOptionClick(String.fromCharCode(97 + index))}>
                  {String.fromCharCode(97 + index)}) {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="setup-section">
            <h2>Add Questions</h2>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter question"
            />
            {newOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...newOptions];
                  updatedOptions[index] = e.target.value;
                  setNewOptions(updatedOptions);
                }}
                placeholder={`Enter option ${String.fromCharCode(97 + index)}`}
              />
            ))}
            <select
              value={newCorrectOption}
              onChange={(e) => setNewCorrectOption(e.target.value)}
            >
              <option value="">Select correct option</option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="d">d</option>
            </select>
            <button onClick={addQuestion}>Add Question</button>
            <div>Total Questions: {questions.length}</div>
            <button onClick={startQuiz} disabled={questions.length === 0}>
              Start Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
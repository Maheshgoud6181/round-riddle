import React, { useState } from 'react';
import './App.css';

const quizData = [
  {
    question: "In the mountains, steep and cold, find the age of the rock that's old. Next, to the rivers, winding and deep, count the bends before they sleep.",
    answer: "507"
  },
  {
    question: "In the rivers, clear and bright, measure the length of the fish in sight. Next, to the mountains, rugged and high, find the temperature where snowflakes lie.",
    answer: "-8"
  },
  {
    question: "In the mountains, near the sky, find the type of rock that’s dry. Next, to the trees, with leaves so green, count the types that can be seen.",
    answer: "6"
  },
  {
    question: "To the animals, quick and sly, find the number of the foxes nearby. Next, to the rivers, deep and grand, measure the width where they span.",
    answer: "103"
  },
  {
    question: "In the trees, old and new, find the height of the tallest bamboo. Next, to the mountains, crisp and clean, find the altitude where clouds convene.",
    answer: "3025"
  },
  {
    question: "In the rivers, swift and free, find the length where the otters flee. Next, to the trees, ancient and wise, find the diameter of the redwood’s size.",
    answer: "56"
  }
];

const tabData = {
  mountains: [
    { name: 'Hint 1', info: <ul>
      <li>'Think about the Paleozoic Era, a time when the Earth was experiencing significant evolutionary developments; rocks from this era mark a period roughly spanning half a billion years in geological history. When the Earth\'s crust began to mold, it was halfway through its first billion years.'</li>
      <li>"At high altitudes, where the air is thin, snowflakes can form when the
temperature is colder than the freezing point, but not colder than ten degrees below
it."</li>
      <li>"In the mountainous terrain, look for the type of rock that's known for its
durability and commonly used in countertops. It's the first choice in a series and
shares its name with a strong, solid material </li>
<li>“The altitude where clouds convene is the same as the number of tons of
paper produced using 51,000 fully</li>
      
       </ul> },
    { name: 'Hint 2', info: <ul> 
      <li>'When the Earth's crust began to mold, it was halfway through its first billion years.'</li>
      <li>"Snowflakes lie on the rugged peaks when the temperature is below zero but
      not as cold as the two digits of ne</li>
      <li>"Among the mountain peaks, seek the type of rock that shares its name with a
tough and enduring stone used in buildings and sculptures. It's often associated with
countertops and is coded as the first number you'd count on your fin</li>
      <li>"The altitude where clouds line is the same as the number of days in almost 8
      years (rounded off to nearest thousand)."</li>
      </ul> },
    ],
  rivers: [
    { name: 'Hint 1', info: <ul>
     <li> 'This river meanders with care, creating a number of bends that match the colors of the rainbow.' </li>
     <li>
     "In the river's depths, the fish you seek is twice the length of a standard ruler."
     </li>
     <li>"Measure the width of the river where it spans, equivalent to the number of
     cents in a dollar."</li>
     <li>"The length where otters flee is equivalent to the length of an Olympic
     swimming pool."</li>
      </ul>},
    { name: 'Hint 2', info:<ul> 
      <li>'Count each twist and turn, and you\'ll find the same number as the days in a week.' </li>
      <li>"This fish spans the same distance as the number of hands you use to clap.</li>
      <li>
      "Measure the width of the river where they span; it's the same as the number
      of years in a century.
      </li>
      <li>“The length of otter’s path is equivalent to the number of overs in ODI.”</li>
      </ul>}
  ],
  animals: [
    { name: 'Hint 1', info: <ul><h1 class="sub-heading">TREES</h1>
      <li>'The types of trees seen match the date we celebrate as “World EnvironmentDay.'</li>
      <li>"Look around at the various tree types; you'll find same as number of rings in
      Olympic flag</li>
      <li>“In the grove of trees, the height of tallest bamboo is equivalent to number of
      small cubes in a standard Rubik's cube minus 1.</li>
      <li>The height of tallest bamboo is equivalent to earths axial tilt in degrees
      (round of to 5 multiples)</li>
      <li> “The diameter of the redwood is equivalent to the number of official languages
      of the UN.”</li>
      <li>"Find the diameter of the redwood; it's the same as the number of continents
      that are significantly inha</li>
      
      </ul> },
    { name: 'Hint 2', info: <ul><h1 class="sub-heading">Animals</h1>
      <li>'Count the number of foxes nearby, which is the same as the number of primary colors' </li>
      <li>"Find the number of foxes nearby, which corresponds to the number of
      months in a quarter of a year</li>
    </ul>}
  ],
};

function App() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(""));
  const [showScore, setShowScore] = useState(false);
  const [activeTab, setActiveTab] = useState('mountains');
  const [popupData, setPopupData] = useState(null);

  function handleAnswerChange(e) {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  }

  function totalScore() {
    return answers.reduce((score, answer, i) => {
      if (answer.trim().toLowerCase() === quizData[i].answer.trim().toLowerCase()) {
        return score + 1;
      }
      return score;
    }, 0);
  }

  function nextQuestion() {
    if (index < quizData.length - 1) {
      setIndex(index + 1);
    }
  }

  function prevQuestion() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function handleTabClick(tab) {
    setActiveTab(tab);
    setPopupData(null); // Close popup when switching tabs
  }

  function handleItemClick(item) {
    setPopupData(item);
  }

  function handleClosePopup() {
    setPopupData(null);
  }

  return (
    <div className='container'>
      {showScore ? (
        <div className='score-container'>
          <h1 className='score-title'>Quiz Completed!</h1>
          <p className='score-text'>You scored {totalScore()} out of {quizData.length}.</p>
        </div>
      ) : (
        <div className='quiz-section'>
          <div className='content-left'>
            <div className='question'>
              <h1 className='question-title'>Q.{index + 1}) {quizData[index].question}</h1>
            </div>
            <div className='answer'>
              <input
                type="text"
                className='answer-input'
                placeholder='Type your answer here...'
                value={answers[index]}
                onChange={handleAnswerChange}
              />
            </div>
            <div className='navigation-buttons'>
              <button className='nav-btn prev' onClick={prevQuestion}>Previous</button>
              {index === quizData.length - 1 ? (
                <button className='nav-btn submit' onClick={() => setShowScore(true)}>Submit</button>
              ) : (
                <button className='nav-btn next' onClick={nextQuestion}>Next</button>
              )}
            </div>
          </div>
          <div className='tabs-images-right'>
            <div className='tabs'>
              <button className={`tab-btn ${activeTab === 'mountains' ? 'active' : ''}`} onClick={() => handleTabClick('mountains')}>Mountains</button>
              <button className={`tab-btn ${activeTab === 'rivers' ? 'active' : ''}`} onClick={() => handleTabClick('rivers')}>Rivers</button>
              <button className={`tab-btn ${activeTab === 'animals' ? 'active' : ''}`} onClick={() => handleTabClick('animals')}>Animals</button>
            </div>
            <div className='image-space'>
              <img
                src={`/images/question${index + 1}.jpg`}
                alt={`Question ${index + 1} Image`}
                className='question-image'
              />
            </div>
            <div className='items'>
              {tabData[activeTab].map((item, idx) => (
                <div key={idx} className='item' onClick={() => handleItemClick(item)}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {popupData && (
        <div className='popup'>
          <div className='popup-content'>
            <h2 className='popup-title'>{popupData.name}</h2>
            <p className='popup-text'>{popupData.info}</p>
            <button className='close-btn' onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

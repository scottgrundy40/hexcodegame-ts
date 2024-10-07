import { useEffect, useState } from "react";
import "./App.css";

const getRandomColour = () => {
  const values = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const randomColour = new Array(6)
    .fill("")
    .map(() => values[Math.floor(Math.random() * values.length)])
    .join("");

  return `#${randomColour}`;
};

function App() {
  const [colour, setColour] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [counter, setCounter] = useState<number>(0);

  const pickColour = () => {
    const actualColour = getRandomColour();
    setColour(actualColour);
    setAnswers(
      [actualColour, getRandomColour(), getRandomColour()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  const handleAnswerClicked = (answers: string) => {
    if (answers === colour) {
      setIsCorrect(true);
      pickColour();
      setCounter((prevCount) => prevCount + 1);
    } else {
      setIsCorrect(false);
      setCounter(0);
    }
  };

  useEffect(() => {
    pickColour();
  }, []);

  return (
    <div className="App">
      <div className="col">
        <div className="counter">Score: {counter}</div>
        <div className="box" style={{ backgroundColor: colour }} />
        {answers.map((answers) => (
          <button
            className="btn"
            key={answers}
            onClick={() => handleAnswerClicked(answers)}
          >
            {answers}
          </button>
        ))}
        {isCorrect === true && <div className="correct">Well Done!</div>}
        {isCorrect === false && <div className="wrong">Try again!</div>}
      </div>
    </div>
  );
}

export default App;

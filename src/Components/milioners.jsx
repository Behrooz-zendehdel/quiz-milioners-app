import { useEffect, useState } from "react";
//imported sounds
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

const Milioners = ({ data, setStop, setQuestionNumber, questionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  //set play sound
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);
  //set interval
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    delay(
      3000,
      () => {
        setClassName(a.correct ? "answer correct" : "answer wrong");
      },
      3000
    );
    delay(5000, () => {
      if (a.correct) {
        correctAnswer(); //set correct sound
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        delay(1000, () => {
          setStop(true);
          wrongAnswer(); //set wrong sound
        });
      }
    });
  };
  return (
    <>
      <div className="team">
        <div className="question">{question?.question}</div>
        <div className="answers">
          {question?.answers.map((a) => (
            <div
              className={selectedAnswer === a ? className : "answer"}
              onClick={() => handleClick(a)}
            >
              {a.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Milioners;

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Milioners from "./Components/milioners";
import { data } from "./db/data";
import Timer from "./Timer";


function App() {
  const [questionNumber, setQuestionNumber] = useState(1);

  const [stop, setStop] = useState(false);
  const [pool, setPool] = useState("$ 0");
  

  const moneyPuramid = useMemo(
    () =>
      [
        { id: 1, amount: " $ 100" },
        { id: 2, amount: " $ 200" },
        { id: 3, amount: " $ 300" },
        { id: 4, amount: " $ 500" },
        { id: 5, amount: " $ 1000" },
        { id: 6, amount: " $ 2000" },
        { id: 7, amount: " $ 4000" },
        { id: 8, amount: " $ 8000" },
        { id: 9, amount: " $ 16000" },
        { id: 10, amount: " $ 32000" },
        { id: 11, amount: " $ 64000" },
        { id: 12, amount: " $ 125000" },
        { id: 13, amount: " $ 250000" },
        { id: 14, amount: " $ 500000" },
        { id: 15, amount: " $ 1000000" },
      ].reverse(),
    []
  );
  useEffect(() => {
    questionNumber > 1 &&
      setPool(moneyPuramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPuramid, questionNumber]);
  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <h1 className="amount">موجودی کیف پول شما تا به این لحظه : {pool}</h1>
        ) : (
          <>
            <div className="top">
              <div className="timer">
                <Timer setStop={setStop} questionNumber={questionNumber} />
              </div>
            </div>
            <div className="bottom">
              <Milioners
                data={data}
                setStop={setStop}
                setQuestionNumber={setQuestionNumber}
                questionNumber={questionNumber}
              />
            </div>
          </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneylist">
          {moneyPuramid.map((m) => (
            <li
              key={m.id}
              className={
                questionNumber === m.id
                  ? "moneyListItem active"
                  : "moneyListItem"
              }
            >
              <span className="moneyListItenNumber">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

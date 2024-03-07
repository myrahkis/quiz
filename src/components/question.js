import "./question.css";
import Timer from "./timer";

function Question({ question, answer, dispatch, index, q, seconds }) {
  const isAnswered = answer !== null;

  return (
    <div className="q-wrapper">
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            disabled={isAnswered}
            className={`option-btn ${answer === i + 1 && "answer"} ${
              isAnswered
                ? i + 1 === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: i + 1 })}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="btn-wrapper">
        <Timer dispatch={dispatch} seconds={seconds}/>
        {isAnswered && index + 1 < q && (
          <button
            className="next-btn"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Следующий
          </button>
        )}
      </div>
      {isAnswered && index + 1 === q && (
        <div className="btn-wrapper">
          <button
            className="next-btn"
            onClick={() => dispatch({ type: "finished" })}
          >
            Итоги
          </button>
        </div>
      )}
    </div>
  );
}

export default Question;

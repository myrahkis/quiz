import "./question.css";

function Question({ index, question, answer, dispatch }) {
  const isAnswered = answer !== null;

  return (
    <div className="q-wrapper">
      <h4>
        <span>{index + 1}</span>. {question.question}
      </h4>
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
      {isAnswered && (
        <div className="btn-wrapper">
          <button
            className="next-btn"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Следующий
          </button>
        </div>
      )}
    </div>
  );
}

export default Question;

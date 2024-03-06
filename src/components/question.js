import "./question.css";

function Question({ question, answer, dispatch }) {
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
      {isAnswered && (
        <div className="btn-wrapper">
          <button className="next-btn">Следующий</button>
        </div>
      )}
    </div>
  );
}

export default Question;
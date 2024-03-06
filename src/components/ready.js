import "./ready.css";

function Ready({ q, dispatch }) {
  return (
    <div className="ready-wrapper">
      <div className="info-wr">
        <h2>Добро пожаловать в The Quiz!</h2>
        <p>{q} вопросов на самые разные темы</p>
      </div>
      <button className="start-btn" onClick={() => dispatch({ type: "start" })}>
        Поехали
      </button>
    </div>
  );
}

export default Ready;

import "./progressBar.css";

function ProgressBar({ index, q, points, maxPoints }) {
  return (
    <div className="progress">
      <progress max={q} value={index} />
      <p>
        Question <strong>{index + 1}</strong>/{q}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </div>
  );
}

export default ProgressBar;

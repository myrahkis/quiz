function Finished({ points, maxPoints, best, dispatch }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  return (
    <>
      <p className="finished">
        Вы набрали <strong>{points}</strong> из {maxPoints} баллов. Это целых{" "}
        {percentage}%!
      </p>
      <p className="best-result">Лучший результат: {best}</p>
      <button className="restart-btn" onClick={() => dispatch({type: 'restart'})}>Пройти снова</button>
    </>
  );
}

export default Finished;

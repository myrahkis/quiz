import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
import Loader from "./components/loader";
import Error from "./components/error";
import Ready from "./components/ready";
import Question from "./components/question";
import ProgressBar from "./components/progressBar";
import Finished from "./components/finished";
import questionsNotAPI from "./questions.json";

const initState = {
  questions: [],
  status: "loading", //loading, ready, error, active, finished
  index: 0,
  answer: null,
  points: 0,
  best: 0,
  seconds: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      const good = state.questions === questionsNotAPI.questions;

      return {
        ...state,
        status: good ? "ready" : "error",
        questions: action.payload,
      };
    case "start":
      return {
        ...state,
        status: "active",
        seconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        best: state.points > state.best ? state.points : state.best,
      };
    case "restart":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
        seconds: 5,
      };
    case "timer":
      return {
        ...state,
        status: state.seconds === 0 ? "finished" : state.status,
        seconds: state.seconds - 1,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, best, seconds },
    dispatch,
  ] = useReducer(reducer, initState);

  const q_amount = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((e) =>
        dispatch({ type: "dataFailed", payload: questionsNotAPI.questions })
      );
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Ready q={q_amount} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              q={q_amount}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              index={index}
              q={q_amount}
              seconds={seconds}
              dispatch={dispatch}
            />
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            maxPoints={maxPoints}
            best={best}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/header";
import Main from "./components/main";

const initState = {
  questions: [],
  status: "loading", //loading, ready, error, active, finished
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((e) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        <p>1/15</p>
        <p>questions</p>
      </Main>
    </div>
  );
}

export default App;

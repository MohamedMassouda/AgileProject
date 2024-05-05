import React, { useState } from "react";
import ReactDOM from "react-dom";

import InputCode from "./CodeConfirmation.jsx";

import "./Code.css";

 export default function Page() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <h1>Code Input</h1>

      <InputCode
        length={6}
        label="Code Label"
        loading={loading}
        onComplete={code => {
          setLoading(true);
          setTimeout(() => setLoading(false), 10000);
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Page />, rootElement);

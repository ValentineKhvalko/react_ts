import React from "react";
import '../styles/style.scss';
import Articles from "./Articles";

const App: React.FC = () => {
  return (
    <div id="app">
      <h1 className="header">Search articles App</h1>
      <Articles />
    </div>
    
  );
};

export default App;
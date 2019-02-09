import React, { Component } from "react";
import styles from "../style/App.module.scss";
import Sketch from "./Sketch";

class App extends Component {
  updateToolInfo = data => {
    console.log(data);
  };
  render() {
    return (
      <div className={styles.container}>
        <Sketch
          tool="pencil"
          color="#344"
          toolInfo={{ Tools: [] }}
          updateToolInfo={this.updateToolInfo}
        />
      </div>
    );
  }
}

export default App;

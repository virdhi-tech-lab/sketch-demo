import React, { Component } from "react";
import styles from "../style/App.module.scss";
import Sketch from "./Sketch";
import { TOOL } from "./constants";

class App extends Component {
  state = {
    toolInfo: {
      Tools: []
    },
    tool: TOOL.PENCIL,
    color: "#234494"
  };

  updateToolInfo = data => {
    this.setState({ toolInfo: data });
  };

  render() {
    const { color, toolInfo, tool } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.toolsPanel}>tools is under construction</div>
        <div className={styles.sketch}>
          <Sketch
            tool={tool}
            color={color}
            toolInfo={toolInfo}
            updateToolInfo={this.updateToolInfo}
          />
        </div>
      </div>
    );
  }
}

export default App;

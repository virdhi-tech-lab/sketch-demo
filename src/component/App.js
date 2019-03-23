import React, { Component } from "react";
import styles from "../style/App.module.scss";
import Sketch from "./Sketch";
import { TOOL } from "./constants";

class App extends Component {
  state = {
    drawInput: [],
    tool: TOOL.PENCIL,
    color: "#234494"
  };

  updateToolInfo = data => {
    this.setState({ drawInput: data });
  };

  render() {
    const { color, tool, drawInput } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.toolsPanel}>
          <div className="mx-auto">Color</div>
          <input
            type="color"
            className="mx-auto color-picker"
            name="colorPicker"
            title="Color Picker"
            value={color}
            onChange={e => this.setState({ color: e.target.value })}
          />
        </div>
        <div className={styles.sketch}>
          <Sketch
            tool={tool}
            color={color}
            drawInput={drawInput}
            updateToolInfo={this.updateToolInfo}
          />
        </div>
      </div>
    );
  }
}

export default App;

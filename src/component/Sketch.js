import React from "react";

export default class Sketch extends React.Component {
  constructor(props) {
    super(props);
    this.down = { x: "", y: "" };
    this.pencil = {};
    this.ctx = {};
    this.canvas = {};
    this.toolEnable = false;
    this.state = {
      toolEnable: false
    };
  }
  static defaultProps = {
    width: window.innerWidth * 0.75,
    height: ((window.innerWidth * 0.75) / 4) * 5
  };
  componentDidMount() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    // let { annotation } = this.props;
    // let pencilTools = _.filter(annotation.toolInfo.Tools, tool => {
    //   return tool.toolType == appConstants.TOOL.pencil;
    // });
    // pencilTools.forEach(tool => {
    //   for (let i = 0; i < tool.Xpos.length - 1; i++) {
    //     this.renderLine(
    //       tool.Xpos[i],
    //       tool.Ypos[i],
    //       tool.Xpos[i + 1],
    //       tool.Ypos[i + 1],
    //       tool.color
    //     );
    //   }
    // });
  }

  componentDidUpdate() {
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // let { annotation } = this.props;
    // let pencilTools = _.filter(annotation.toolInfo.Tools, tool => {
    //   return tool.toolType == appConstants.TOOL.pencil;
    // });
    // pencilTools.forEach(tool => {
    //   for (let i = 0; i < tool.Xpos.length - 1; i++) {
    //     this.renderLine(
    //       tool.Xpos[i],
    //       tool.Ypos[i],
    //       tool.Xpos[i + 1],
    //       tool.Ypos[i + 1],
    //       tool.color
    //     );
    //   }
    // });
  }
  componentWillUnmount() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  renderLine(x1, y1, x2, y2, color) {
    this.ctx.strokeStyle = color;
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.stroke();
  }
  onMouseMove(e) {
    let canvas = document.getElementById("canvas");
    if (this.toolEnable) {
      let context = canvas.getContext("2d");
      context.globalCompositeOperation = "source-over";
      context.beginPath();
      context.moveTo(this.down.x, this.down.y);
      context.lineTo(
        e.clientX - canvas.getBoundingClientRect().left,
        e.clientY - canvas.getBoundingClientRect().top
      );
      context.strokeStyle = this.props.color;
      context.lineWidth = 2;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
      this.down.x = e.clientX - canvas.getBoundingClientRect().left;
      this.down.y = e.clientY - canvas.getBoundingClientRect().top;
      this.pencil.Xpos.push(e.clientX - canvas.getBoundingClientRect().left);
      this.pencil.Ypos.push(e.clientY - canvas.getBoundingClientRect().top);
    }
  }

  onMouseDown(e) {
    const { toolInfo, updateToolInfo, color, tool } = this.props;
    const tempTool = {
      toolType: "",
      Xpos: [],
      Ypos: [],
      textContent: "",
      color: ""
    };
    this.toolEnable = true;
    const canvas = document.getElementById("canvas");
    this.down.x = e.clientX - canvas.getBoundingClientRect().left;
    this.down.y = e.clientY - canvas.getBoundingClientRect().top;

    if (tool == "pencil") {
      this.ctx = canvas.getContext("2d");
      this.ctx.fillStyle = color;
      tempTool.toolType = tool;
      tempTool.Xpos.push(this.down.x);
      tempTool.Ypos.push(this.down.y);
      tempTool.color = color;
      this.pencil = tempTool;
    }
    updateToolInfo({ ...toolInfo, Tools: toolInfo.Tools.concat(tempTool) });
  }
  updateToolInfo = e => {
    e.preventDefault();
    const { toolInfo, updateToolInfo } = this.props;
    if (this.toolEnable) {
      updateToolInfo({
        ...toolInfo,
        Tools: toolInfo.Tools.concat(this.pencil)
      });
    }
    this.pencil = {};
    this.toolEnable = false;
  };

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        id="canvas"
        width={width}
        height={height}
        ref={el => (this.canvas = el)}
        onMouseMove={e => this.onMouseMove(e)}
        onMouseDown={e => this.onMouseDown(e)}
        onMouseLeave={e => this.updateToolInfo(e)}
        onMouseUp={e => this.updateToolInfo(e)}
      >
        This is not supported
      </canvas>
    );
  }
}

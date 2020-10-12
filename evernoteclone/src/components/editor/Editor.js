import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers.js";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles.js";

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      id: null,
      text: null,
    };
  }
  updateBody = async (val) => {
    await this.setState({ text: val });
    console.log(this.state.text);
    this.update();
  };
  update = debounce(() => {
    console.log("updated");
  }, 1500);
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ReactQuill
          value={this.state.text}
          className={classes.editorContainer}
          onChange={this.updateBody}
        ></ReactQuill>
      </div>
    );
  }
}
export default withStyles(styles)(Editor);

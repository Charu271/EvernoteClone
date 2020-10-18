import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers.js";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles.js";
import { ThreeSixtyTwoTone } from "@material-ui/icons";

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      id: "",
      text: "",
    };
  }
  updateBody = async (val) => {
    await this.setState({ text: val });
    console.log(this.state.text);
    this.update();
  };
  updateTitle = async (val) => {
    await this.setState({ title: val });
    this.update();
  };
  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text,
    });
  }, 1500);
  componentDidMount = () => {
    this.setState({
      text: this.props.selectedNote.body,
      id: this.props.selectedNote.id,
      title: this.props.selectedNote.title,
    });
  };
  componentDidUpdate = () => {
    if (this.state.id !== this.props.selectedNote.id) {
      this.setState({
        text: this.props.selectedNote.body,
        id: this.props.selectedNote.id,
        title: this.props.selectedNote.title,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input
          className={classes.titleInput}
          placeholder="Note title...."
          value={this.state.title}
          onChange={(e) => this.updateTitle(e.target.value)}
        />

        <ReactQuill
          value={this.state.text}
          className={classes.editorContainer}
          onChange={this.updateBody}
          style={{ overflow: "hidden" }}
        ></ReactQuill>
      </div>
    );
  }
}
export default withStyles(styles)(Editor);

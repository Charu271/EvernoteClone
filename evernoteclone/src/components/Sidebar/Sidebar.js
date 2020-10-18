import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers.js";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles.js";
import { Button, List } from "@material-ui/core";
import SidebarItem from "../SidebarItem/SidebarItem.js";

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null,
    };
  }
  addNewNote = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  };
  updateTitle = (e) => {
    this.setState({ title: e.target.value });
  };
  createNewNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ addingNote: false, title: "" });
  };
  selectHandler = (note, index) => {
    this.props.selectNote(note, index);
  };
  deleteHandler = (note, index) => {
    this.props.deleteNote(note, index);
  };
  copyHandler = (note, index) => {
    this.props.copyNote(note, index);
  };
  render() {
    const { classes, notes, selectedNoteIndex } = this.props;
    if (notes) {
      return (
        <div className={classes.sidebarContainer}>
          <Button className={classes.newNoteBtn} onClick={this.addNewNote}>
            {this.state.addingNote ? "Cancel" : "New Note"}
          </Button>
          {this.state.addingNote ? (
            <div>
              <input
                type="text"
                placeholder="title.."
                className={classes.newNoteInput}
                onKeyUp={this.updateTitle}
              />
              <Button
                className={classes.newNoteSubmitBtn}
                onClick={this.createNewNote}
              >
                Submit
              </Button>
            </div>
          ) : null}
          <List>
            {notes.map((note, id) => {
              return (
                <div id={id}>
                  <SidebarItem
                    note={note}
                    index={id}
                    selectedNoteIndex={selectedNoteIndex}
                    deleteHandler={this.deleteHandler}
                    selectHandler={this.selectHandler}
                    copyHandler={this.copyHandler}
                  ></SidebarItem>
                </div>
              );
            })}
          </List>
        </div>
      );
    } else return <div></div>;
  }
}
export default withStyles(styles)(Sidebar);

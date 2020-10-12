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
    console.log("new note");
  };
  updateTitle = (e) => {
    this.setState({ title: e.target.value });
    console.log(e.target.value);
    console.log(this.state.title);
  };
  createNewNote = () => {
    console.log(this.state);
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

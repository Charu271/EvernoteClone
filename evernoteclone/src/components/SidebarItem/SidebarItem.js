import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles.js";
import { ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers.js";
class SidebarItem extends React.Component {
  render() {
    const { classes, note, index, selectedNoteIndex } = this.props;
    return (
      <div key={index}>
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === index}
          alignItems="flex-start"
        >
          <div
            className={classes.textSection}
            onClick={() => this.select(note, index)}
          >
            <ListItemText
              primary={note.title}
              secondary={removeHTMLTags(note.body.substring(0, 30) + "...")}
            ></ListItemText>
          </div>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={() => this.deletefield(note, index)}
          ></DeleteIcon>
        </ListItem>
      </div>
    );
  }
  deletefield = (note, index) => {
    if (window.confirm(`Do you want to delete ${note.title}`))
      this.props.deleteHandler(note, index);
  };
  select = (note, index) => {
    this.props.selectHandler(note, index);
  };
}
export default withStyles(styles)(SidebarItem);

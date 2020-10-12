import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles.js";
import { ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
class SidebarItem extends React.Component {
  render() {
    const { classes, note, index, selectedNoteIndex } = this.props;
    return (
      <div key={index}>
        <ListItem className={classes.listItem}>
          <div className={classes.textSection}>
            <ListItemText>
              <DeleteIcon className={classes.deleteIcon}></DeleteIcon>
            </ListItemText>
          </div>
        </ListItem>
      </div>
    );
  }
}
export default withStyles(styles)(SidebarItem);

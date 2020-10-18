import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles.js";
import { ListItem, ListItemText, Divider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { removeHTMLTags } from "../helpers.js";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

function SidebarItem(props) {
  const { classes, note, index, selectedNoteIndex } = props;
  const [open, setOpen] = useState(false);
  const handleTooltipClose = () => {
    console.log("I am closed");
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    console.log("I am open");
    setOpen(true);
  };
  const deletefield = (note, index) => {
    if (window.confirm(`Do you want to delete ${note.title}`))
      props.deleteHandler(note, index);
  };
  const select = (note, index) => {
    props.selectHandler(note, index);
  };
  const copy = (note, index) => {
    setOpen(true);
    props.copyHandler(note, index);
  };
  return (
    <div key={index}>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === index}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => select(note, index)}
        >
          <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0, 30) + "...")}
          ></ListItemText>
        </div>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => deletefield(note, index)}
        ></DeleteIcon>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <FileCopyIcon
              className={classes.copyIcon}
              onClick={() => copy(note, index)}
            ></FileCopyIcon>
            {open ? (
              <Tooltip
                className={classes.tooltip}
                placement="right-end"
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied to Clipboard"
              >
                <span></span>
              </Tooltip>
            ) : null}
          </div>
        </ClickAwayListener>
      </ListItem>
      <Divider></Divider>
    </div>
  );
}
export default withStyles(styles)(SidebarItem);

import { FormatSize } from "@material-ui/icons";

const styles = (theme) => ({
  listItem: {
    cursor: "pointer",
  },
  textSection: {
    maxWidth: "85%",
  },
  deleteIcon: {
    position: "absolute",
    right: "35px",
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "red",
    },
  },
  copyIcon: {
    position: "absolute",
    right: "5px",
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "grey",
    },
  },
  tooltip: {
    position: "absolute",
    right: "-115px",
    fontSize: "1.5rem",
  },
});

export default styles;

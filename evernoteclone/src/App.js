import React from "react";
import "./App.css";
import Editor from "./components/editor/Editor.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
const firebase = require("firebase");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    };
  }
  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((update) => {
        const notes = update.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  };
  render() {
    return (
      <div>
        <Sidebar
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}
        />
        <Editor />
      </div>
    );
  }
}
export default App;

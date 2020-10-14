import React from "react";
import "./App.css";
import Editor from "./components/editor/Editor.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
const firebase = require("firebase");
let count = 0;
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    };
  }

  render() {
    return (
      <div>
        <Sidebar
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          newNote={this.newNote}
        />
        {this.state.selectedNote ? (
          <Editor
            notes={this.state.notes}
            selectedNoteIndex={this.state.selectedNoteIndex}
            selectedNote={this.state.selectedNote}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </div>
    );
  }
  newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };
    const newDB = await firebase.firestore().collection("notes").add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const newId = newDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter((note) => (note.id = newId))[0]
    );
    console.log(
      "%%%" +
        this.state.selectedNote +
        "%%%    " +
        this.state.selectedNoteIndex +
        "        " +
        newNoteIndex
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex,
    });
  };
  noteUpdate = (id, noteobj) => {
    firebase.firestore().collection("notes").doc(id).update({
      title: noteobj.title,
      body: noteobj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  };
  deleteNote = async (note, index) => {
    if (this.state.selectedNoteIndex === index) {
      await this.setState({ selectedNote: null, selectedNoteIndex: null });
    } else {
      console.log(this.state.selectedNoteIndex + "               " + index);
      if (this.state.selectedNoteIndex > index)
        await this.setState({
          selectedNote: this.state.notes[this.state.selectedNoteIndex - 1],
          selectedNoteIndex: this.state.selectedNoteIndex - 1,
        });
    }
    console.log("&&&&&");
    console.log(
      "*******" +
        this.state.selectedNote +
        " " +
        this.state.selectedNoteIndex +
        "********"
    );
    await this.setState({
      notes: this.state.notes.filter((cnote) => cnote.id !== note.id),
    });
    firebase.firestore().collection("notes").doc(note.id).delete();
    console.log("deleted");
    console.log(this.state.notes);
  };
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
}
export default App;

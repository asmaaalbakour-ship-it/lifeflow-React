import { useEffect, useState } from "react";
import "./Notes.css";

function Notes() {
  const [note, setNote] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("lifeflow-notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "lifeflow-notes",
      JSON.stringify(notes)
    );
  }, [notes]);

  const addNote = () => {
    if (!note.trim()) return;

    const newNote = {
      id: Date.now(),
      text: note.trim(),
    };

    setNotes((previous) => [
      ...previous,
      newNote,
    ]);

    setNote("");
  };

  const deleteNote = (id) => {
    setNotes((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return (
    <section className="notes-section">
      <div className="notes-header">
        <div>
          <h2>My Notes 📝</h2>

          <p>
            Write down your thoughts and important ideas.
          </p>
        </div>
      </div>

      <div className="note-input">
        <textarea
          placeholder="Write a note..."
          value={note}
          onChange={(event) =>
            setNote(event.target.value)
          }
        />

        <button onClick={addNote}>
          + Add Note
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-notes">
            <span>📝</span>

            <h3>No notes yet</h3>

            <p>
              Write your first note above.
            </p>
          </div>
        ) : (
          notes.map((item) => (
            <div
              className="note-card"
              key={item.id}
            >
              <p>{item.text}</p>

              <button
                onClick={() =>
                  deleteNote(item.id)
                }
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Notes;
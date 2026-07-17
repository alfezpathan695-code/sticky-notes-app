document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.getElementById("open-modal-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const noteModal = document.getElementById("note-modal");
    const saveNoteBtn = document.getElementById("save-note-btn");
    
    const noteTitle = document.getElementById("note-title");
    const noteDesc = document.getElementById("note-desc");
    const dynamicNotesContainer = document.getElementById("dynamic-notes");
    const clearAllBtn = document.getElementById("clear-all-btn");

    // Load saved notes from Local Storage
    let notesArray = JSON.parse(localStorage.getItem("grid-notes")) || [];

    // Render notes into the UI layout grid
    function renderNotes() {
        dynamicNotesContainer.innerHTML = "";
        
        notesArray.forEach((note, index) => {
            const noteCard = document.createElement("div");
            noteCard.className = "note-card";
            
            noteCard.innerHTML = `
                <div class="note-header-area">
                    <h3>${note.title}</h3>
                </div>
                <p>${note.desc}</p>
                <div class="note-footer-area">
                    <span>${note.date}</span>
                    <button class="single-delete-btn" onclick="deleteNote(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            dynamicNotesContainer.appendChild(noteCard);
        });

        // Sync to user local storage
        localStorage.setItem("grid-notes", JSON.stringify(notesArray));
    }

    // Modal Display Controls
    openModalBtn.addEventListener("click", () => noteModal.classList.add("show"));
    closeModalBtn.addEventListener("click", () => {
        noteModal.classList.remove("show");
        clearInputs();
    });

    function clearInputs() {
        noteTitle.value = "";
        noteDesc.value = "";
    }

    // Add / Save new object entry
    saveNoteBtn.addEventListener("click", () => {
        const titleText = noteTitle.value.trim();
        const descText = noteDesc.value.trim();

        if (titleText === "" || descText === "") {
            alert("Please fill out both Title and Description fields!");
            return;
        }

        const currentDate = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        notesArray.push({
            title: titleText,
            desc: descText,
            date: currentDate
        });

        noteModal.classList.remove("show");
        clearInputs();
        renderNotes();
    });

    // Delete single unique item element
    window.deleteNote = (index) => {
        notesArray.splice(index, 1);
        renderNotes();
    };

    // Wipe out full data stack
    clearAllBtn.addEventListener("click", () => {
        if(notesArray.length === 0) return;
        if(confirm("Are you sure you want to delete all notes?")) {
            notesArray = [];
            renderNotes();
        }
    });

    // Initial launch rendering
    renderNotes();
});
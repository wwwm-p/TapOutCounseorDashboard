// ---------------------------------------------------------------------
//  STUDENT DATA (You can connect this to Sheets or DB later)
// ---------------------------------------------------------------------
let assignedStudents = [
    { name: "Alex Johnson", grade: 10, email: "alex.johnson@schoolgmail.com" },
    { name: "Maria Lopez", grade: 12, email: "maria.lopez@schoolgmail.com" },
    { name: "James Carter", grade: 9, email: "james.carter@schoolgmail.com" }
];

// ---------------------------------------------------------------------
//  LOCAL STORAGE HELPERS (PERSIST NOTES)
// ---------------------------------------------------------------------
function getNotes(studentName) {
    return localStorage.getItem("notes_" + studentName) || "";
}

function saveNotes(studentName, text) {
    localStorage.setItem("notes_" + studentName, text);
}

// ---------------------------------------------------------------------
//  MODAL ELEMENTS
// ---------------------------------------------------------------------
const studentsModal = document.getElementById("studentsModal");
const studentList = document.getElementById("studentList");
const studentsBtn = document.getElementById("studentsBtn");
const closeStudents = document.getElementById("closeStudents");

// ---------------------------------------------------------------------
//  SORT FUNCTIONS
// ---------------------------------------------------------------------
function sortByAlphabetical() {
    assignedStudents.sort((a, b) => a.name.localeCompare(b.name));
    renderStudents();
}

function sortByGrade() {
    assignedStudents.sort((a, b) => a.grade - b.grade);
    renderStudents();
}

// ---------------------------------------------------------------------
//  RENDER STUDENT CARDS
// ---------------------------------------------------------------------
function renderStudents() {
    studentList.innerHTML = "";

    // Build sorting UI first
    const sortControls = document.createElement("div");
    sortControls.style.marginBottom = "15px";
    sortControls.innerHTML = `
        <button class="btn" id="sortAZ">Sort A–Z</button>
        <button class="btn" id="sortGrade">Sort by Grade</button>
    `;
    studentList.appendChild(sortControls);

    document.getElementById("sortAZ").addEventListener("click", sortByAlphabetical);
    document.getElementById("sortGrade").addEventListener("click", sortByGrade);

    // Render each student card
    assignedStudents.forEach(student => {
        const card = document.createElement("div");
        card.classList.add("student-card");

        const savedNotes = getNotes(student.name);

        card.innerHTML = `
            <h3>${student.name}</h3>
            <p>Grade: ${student.grade}</p>
            <p>Email: ${student.email}</p>

            <button class="btn notesBtn">Notes</button>
            <textarea 
                class="notes-area" 
                style="display:none;"
            >${savedNotes}</textarea>
            <button 
                class="btn saveNotesBtn" 
                style="display:none; margin-top:6px;"
            >Save Notes</button>
        `;

        const notesBtn = card.querySelector(".notesBtn");
        const notesArea = card.querySelector(".notes-area");
        const saveBtn = card.querySelector(".saveNotesBtn");

        notesBtn.addEventListener("click", () => {
            const isOpen = notesArea.style.display === "block";
            notesArea.style.display = isOpen ? "none" : "block";
            saveBtn.style.display = isOpen ? "none" : "block";
        });

        // Save notes to localStorage
        saveBtn.addEventListener("click", () => {
            saveNotes(student.name, notesArea.value.trim());
            alert("Notes saved for " + student.name);
        });

        studentList.appendChild(card);
    });
}

// ---------------------------------------------------------------------
//  OPEN STUDENTS MODAL
// ---------------------------------------------------------------------
studentsBtn.addEventListener("click", () => {
    renderStudents();
    studentsModal.style.display = "flex";
});

// ---------------------------------------------------------------------
//  CLOSE STUDENTS MODAL
// ---------------------------------------------------------------------
closeStudents.addEventListener("click", () => {
    studentsModal.style.display = "none";
});

studentsModal.addEventListener("click", (e) => {
    if (e.target === studentsModal) {
        studentsModal.style.display = "none";
    }
});

// ---------------------------------------------------------------------
//  EXISTING ROW CLICK LOGIC
// ---------------------------------------------------------------------
document.getElementById("crisisRow").addEventListener("click", () => {
    alert("Crisis row clicked.");
});
document.getElementById("moderateRow").addEventListener("click", () => {
    alert("Moderate row clicked.");
});
document.getElementById("mildRow").addEventListener("click", () => {
    alert("Mild row clicked.");
});
document.getElementById("unurgentRow").addEventListener("click", () => {
    alert("Unurgent row clicked.");
});

// ---------------------------------------------------------------------
//  CALENDAR + SIGN IN BUTTONS
// ---------------------------------------------------------------------
document.getElementById("openCalendar").addEventListener("click", () => {
    alert("Calendar functionality goes here.");
});

document.getElementById("signIn").addEventListener("click", () => {
    alert("Sign-in functionality goes here.");
});

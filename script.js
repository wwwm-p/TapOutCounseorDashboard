// ----------------------
// SIMULATED STUDENT DATA
// ----------------------
let students = [
    { name: "Alice Johnson", grade: 12, email: "alice.johnson@school.org", notes: [] },
    { name: "Michael Smith", grade: 10, email: "michael.smith@school.org", notes: [] },
    { name: "Brian Lee", grade: 11, email: "brian.lee@school.org", notes: [] },
    { name: "Sofia Martinez", grade: 9, email: "sofia.martinez@school.org", notes: [] }
];

// Load stored notes from localStorage
if (localStorage.getItem("studentNotes")) {
    let saved = JSON.parse(localStorage.getItem("studentNotes"));
    students.forEach(stu => {
        if (saved[stu.email]) stu.notes = saved[stu.email];
    });
}

let selectedStudent = null;


// ----------------------
// STUDENT PANEL FUNCTIONS
// ----------------------
function toggleStudentsPanel() {
    document.getElementById("studentsPanel").classList.toggle("hidden");
    renderStudentList();
}

function renderStudentList() {
    let list = document.getElementById("studentList");
    let sort = document.getElementById("sortOption").value;
    let query = document.getElementById("studentSearchHeader").value.toLowerCase();

    let filtered = students.filter(s => s.name.toLowerCase().includes(query));

    if (sort === "alpha") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filtered.sort((a, b) => a.grade - b.grade);
    }

    list.innerHTML = "";

    filtered.forEach(stu => {
        let li = document.createElement("li");
        li.textContent = stu.name + " (Grade " + stu.grade + ")";
        li.onclick = () => openStudentDetail(stu);
        list.appendChild(li);
    });
}

document.getElementById("studentSearchHeader")
    .addEventListener("input", renderStudentList);


// ----------------------
// STUDENT DETAIL FUNCTIONS
// ----------------------
function openStudentDetail(student) {
    selectedStudent = student;

    document.getElementById("studentDetailPanel").classList.remove("hidden");
    document.getElementById("studentsPanel").classList.add("hidden");

    document.getElementById("studentName").textContent = student.name;
    document.getElementById("studentEmail").textContent = student.email;

    renderNotes();
}

function closeStudentDetail() {
    document.getElementById("studentDetailPanel").classList.add("hidden");
}


// ----------------------
// NOTES
// ----------------------
function renderNotes() {
    let history = document.getElementById("notesHistory");
    history.innerHTML = "";

    if (selectedStudent.notes.length === 0) {
        history.innerHTML = "<li>No notes yet.</li>";
        return;
    }

    selectedStudent.notes.forEach(n => {
        let li = document.createElement("li");
        li.textContent = n;
        history.appendChild(li);
    });
}

function saveNote() {
    let text = document.getElementById("newNote").value.trim();
    if (text === "") return;

    selectedStudent.notes.push(text);
    document.getElementById("newNote").value = "";

    saveNotesToLocalStorage();
    renderNotes();
}

function saveNotesToLocalStorage() {
    let storage = {};
    students.forEach(s => storage[s.email] = s.notes);
    localStorage.setItem("studentNotes", JSON.stringify(storage));
}


// ----------------------
// CALENDAR
// ----------------------
function openCalendar() {
    alert("Calendar feature will open here.");
}

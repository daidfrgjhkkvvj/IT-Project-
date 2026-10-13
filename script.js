// Student Management System
// Simple IT practical project

// array that holds all the student objects
const students = [];

// getting the elements from the page
const nameInput = document.getElementById("name");
const matricInput = document.getElementById("matricNo");
const levelInput = document.getElementById("level");
const departmentInput = document.getElementById("department");

const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");

const message = document.getElementById("message");
const studentList = document.getElementById("studentList");
const studentTable = document.getElementById("studentTable");
const emptyText = document.getElementById("emptyText");
const count = document.getElementById("count");

// shows a message under the form (type is "error" or "success")
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

function addStudent() {
    const name = nameInput.value.trim();
    const matricNo = matricInput.value.trim();
    const level = levelInput.value.trim();
    const department = departmentInput.value.trim();

    // validation: no field should be empty
    if (name === "" || matricNo === "" || level === "" || department === "") {
        showMessage("Please enter all student information.", "error");
        return;
    }

    // stop the same matric number from being added twice
    for (let s of students) {
        if (s.matricNo.toLowerCase() === matricNo.toLowerCase()) {
            showMessage("A student with this matric number already exists.", "error");
            return;
        }
    }

    const student = {
        name,
        matricNo,
        level: Number(level),
        department
    };

    students.push(student);
    showMessage(name + " added successfully.", "success");

    clearForm();
    displayStudents();
}

function removeLastStudent() {
    if (students.length > 0) {
        const removedStudent = students.pop();
        showMessage(removedStudent.name + " has been removed.", "success");
        displayStudents();
    } else {
        showMessage("There are no students to remove.", "error");
    }
}

function displayStudents() {
    // clear the old rows first
    studentList.innerHTML = "";

    count.textContent = students.length;

    // hide the table when there is nothing to show
    if (students.length === 0) {
        emptyText.style.display = "block";
        studentTable.style.display = "none";
        return;
    }

    emptyText.style.display = "none";
    studentTable.style.display = "table";

    let number = 1;

    for (let student of students) {
        const row = document.createElement("tr");

        const values = [
            number,
            student.name,
            student.matricNo,
            student.level,
            student.department
        ];

        for (let value of values) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        }

        studentList.appendChild(row);
        number++;
    }
}

function clearForm() {
    nameInput.value = "";
    matricInput.value = "";
    levelInput.value = "";
    departmentInput.value = "";
    nameInput.focus();
}

addBtn.addEventListener("click", addStudent);
removeBtn.addEventListener("click", removeLastStudent);

// show the empty state when the page first loads
displayStudents();

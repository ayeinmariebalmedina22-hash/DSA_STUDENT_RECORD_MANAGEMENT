// Store student records
let students = JSON.parse(localStorage.getItem("students")) || [];

let editID = "";

// Display student records
function displayStudents() {
    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
        table.innerHTML += `
            <tr>
                <td>${students[i].id}</td>
                <td>${students[i].name}</td>
                <td>${students[i].age}</td>
                <td>${students[i].course}</td>
                <td>${students[i].gpa.toFixed(2)}</td>
                <td>
                    <button onclick="editStudent('${students[i].id}')">Edit</button>
                    <button onclick="deleteStudent('${students[i].id}')">Delete</button>
                </td>
            </tr>
        `;
    }

    document.getElementById("recordCount").innerText =
        "Total Students: " + students.length;

    localStorage.setItem("students", JSON.stringify(students));
}

// Add or Update Student
document.getElementById("studentForm").onsubmit = function(event) {
    event.preventDefault();

    let id = document.getElementById("studentId").value;
    let name = document.getElementById("studentName").value;
    let age = Number(document.getElementById("studentAge").value);
    let course = document.getElementById("studentCourse").value;
    let gpa = Number(document.getElementById("studentGpa").value);

    // Check GPA
    if (gpa < 0 || gpa > 4) {
        alert("GPA must be between 0.00 and 4.00.");
        return;
    }

    // Check if ID already exists
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id && students[i].id !== editID) {
            alert("Student ID already exists!");
            return;
        }
    }

    // Create student record
    let student = {
        id: id,
        name: name,
        age: age,
        course: course,
        gpa: gpa
    };

    if (editID === "") {
        students.push(student);
        alert("Student added successfully!");
    } else {
        for (let i = 0; i < students.length; i++) {
            if (students[i].id === editID) {
                students[i] = student;
            }
        }

        editID = "";
        alert("Student updated successfully!");
    }

    document.getElementById("studentForm").reset();

    document.getElementById("formTitle").innerText = "Add Student Record";
    document.getElementById("submitButton").innerText = "Add Student";
    document.getElementById("cancelButton").hidden = true;

    displayStudents();
};

// Edit Student
function editStudent(id) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {

            document.getElementById("studentId").value = students[i].id;
            document.getElementById("studentName").value = students[i].name;
            document.getElementById("studentAge").value = students[i].age;
            document.getElementById("studentCourse").value = students[i].course;
            document.getElementById("studentGpa").value = students[i].gpa;

            editID = id;

            document.getElementById("formTitle").innerText = "Update Student Record";
            document.getElementById("submitButton").innerText = "Update Student";
            document.getElementById("cancelButton").hidden = false;
        }
    }
}

// Delete Student
function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {

        for (let i = 0; i < students.length; i++) {
            if (students[i].id === id) {
                students.splice(i, 1);
                break;
            }
        }

        displayStudents();
        alert("Student deleted successfully!");
    }
}

// Search Student by Name
document.getElementById("searchInput").addEventListener("input", function() {
    let search = this.value.toLowerCase();

    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
        if (students[i].name.toLowerCase().includes(search)) {
            table.innerHTML += `
                <tr>
                    <td>${students[i].id}</td>
                    <td>${students[i].name}</td>
                    <td>${students[i].age}</td>
                    <td>${students[i].course}</td>
                    <td>${students[i].gpa.toFixed(2)}</td>
                    <td>
                        <button onclick="editStudent('${students[i].id}')">Edit</button>
                        <button onclick="deleteStudent('${students[i].id}')">Delete</button>
                    </td>
                </tr>
            `;
        }
    }
});

// Sort by Student ID
function sortById() {
    students.sort(function(a, b) {
        return a.id.localeCompare(b.id);
    });

    displayStudents();
}

// Sort by Student Name
function sortByName() {
    students.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    displayStudents();
}

// Sort by GPA (Highest to Lowest)
function sortByGpa() {
    students.sort(function(a, b) {
        return b.gpa - a.gpa;
    });

    displayStudents();
}

// Cancel Update
document.getElementById("cancelButton").onclick = function() {
    editID = "";

    document.getElementById("studentForm").reset();

    document.getElementById("formTitle").innerText = "Add Student Record";
    document.getElementById("submitButton").innerText = "Add Student";
    this.hidden = true;
};

// Display records when opening the website
displayStudents();
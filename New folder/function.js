// Store student records
let students = JSON.parse(localStorage.getItem("students")) || [];

let editID = "";

function capitalizeName(input) {
    input.value = input.value
        .toLowerCase()
        .replace(/\b\w/g, letter => letter.toUpperCase());
}

// Apply capitalization to First Name
document.getElementById("studentFirstName").addEventListener("input", function() {
    capitalizeName(this);
});

// Apply capitalization to Last Name
document.getElementById("studentLastName").addEventListener("input", function() {
    capitalizeName(this);
});

// Display student records
function displayStudents() {
    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
        table.innerHTML += `
            <tr>
                <td>${students[i].id}</td>
                <td>${students[i].lastname}</td>
                <td>${students[i].firstname}</td>
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
    let lastname = document.getElementById("studentLastName").value;
    let firstname = document.getElementById("studentFirstName").value;
    let age = Number(document.getElementById("studentAge").value);
    let course = document.getElementById("studentCourse").value;
    let gpa = Number(document.getElementById("studentGpa").value);

     //Check age
    if (age < 17 || age > 25) {
        alert("Age must not be less than 17 or greater than 25.");
        return;
    }

    // Check GPA
    if (gpa < 1 || gpa > 4) {
        alert("GPA must be between 1.00 and 4.00.");
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
        lastname: lastname,
        firstname: firstname,
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
            document.getElementById("studentLastName").value = students[i].lastname;
            document.getElementById("studentFirstName").value = students[i].firstname;
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
    let search = this.value.toLowerCase().trim();

    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
        let fullName = students[i].firstname.toLowerCase() + " " +
                       students[i].lastname.toLowerCase();

        if (students[i].firstname.toLowerCase().includes(search) ||
            students[i].lastname.toLowerCase().includes(search) ||
            fullName.includes(search)) {

            table.innerHTML += `
                <tr>
                    <td>${students[i].id}</td>
                    <td>${students[i].lastname}</td>
                    <td>${students[i].firstname}</td>
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
    let lastNameCompare = a.lastname.localeCompare(b.lastname);

        if (lastNameCompare === 0) {
            return a.firstname.localeCompare(b.firstname);
        }

        return lastNameCompare;

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
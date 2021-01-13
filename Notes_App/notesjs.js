console.log("Notes App");
showNotes();
// Add notes
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (!notes) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
});

// Display notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let newcode = "";
    notesObj.forEach(function (key, val) {
        newcode += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${key.title}</h5>
                        <p class="card-text"> ${key.text}</p>
                        <button id="${val}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                    </div>
                </div>`;
    });
    let notesele = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesele.innerHTML = newcode;
    } else {
        notesele.innerHTML = `Notes is Emplty`;
    }
}

// Delete notes
function deleteNote(index) {
    console.log("Deleted note", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

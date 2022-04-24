showNotes();
let add_note = document.getElementById("add_note");
add_note.addEventListener("click", function (e) {
    let note_txt = document.getElementById("note_text");
    let notes = localStorage.getItem("notes");
    let note_title = document.getElementById("note_title"); //Note Title
    let title = localStorage.getItem("title");    // Note Title in local storage.
    let notesObj;
    let note_tle;
    if (notes == null) {
        notesObj = [];
        note_tle = [];    //Note Title
    }
    else {
        notesObj = JSON.parse(notes);
        note_tle = JSON.parse(title);
   }
    notesObj.push(note_txt.value);
    note_tle.push(note_title.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("title",JSON.stringify(note_tle));
    note_txt.value = "";
    note_title.value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    let notes_tle = localStorage.getItem("title"); //Notes Title in localstorage
    let notesObj;
    let notes_title_arr;
    if (notes == null) {
        notesObj = [];
        notes_title_arr = [];
    }
    else {
        notesObj = JSON.parse(notes);
        notes_title_arr = JSON.parse(notes_tle);
    }
    let note_display = "";
    notesObj.forEach(function (element, index) {
        note_display += `<div class="my-2 mx-2 card note_body" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${notes_title_arr[index]}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
    </div>`
    });
    let select_to_display = document.getElementById("notes");
    if (notesObj.length != 0) {
        select_to_display.innerHTML = note_display;
    }
    else {
        select_to_display.innerHTML = `No notes left for Display`;
    }
}

function deleteNode(index) {
    let note = localStorage.getItem("notes");
    let noteObj = JSON.parse(note);
    let note_tle = localStorage.getItem("title"); //Note title in localstorage
    let notes_title_arr = JSON.parse(note_tle);
    notes_title_arr.splice(index,1);
    noteObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    localStorage.setItem("title",JSON.stringify(notes_title_arr));
    showNotes();
}

let search = document.getElementById("searchNote");
search.addEventListener("input", function () {
    let input_txt = search.value;
    let card_sel = document.getElementsByClassName("note_body");
    // console.log(card_sel);
    Array.from(card_sel).forEach(function (element) {
        let content = element.getElementsByTagName("p")[0].innerText;
        if(content.includes(input_txt))
        {
            element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }
    });
})
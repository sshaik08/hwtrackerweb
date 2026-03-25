
console.log("JS part is running");

var audio = new Audio('music.mp3')

async function save() {
    try {
        //updating outerHTML based on user inputs
        const inputs = document.querySelectorAll("input");
        inputs.forEach(input => {
            if (input.type === "checkbox") {
                if (input.checked) {
                    input.setAttribute("checked", "");
                } else {
                    input.removeAttribute("checked");
                }
            } else {
                input.setAttribute("value", input.value);
            }
        });


        //getting outerHTML
        const file = document.documentElement.outerHTML;
        console.log("save method runs");


        //windows file picker
        const handle = await window.showSaveFilePicker({
            suggestedName: "website.html",
            types: [{
                description: "Text Files",
                accept: { "text/html": [".html"] },
            }],
        });


        //write this file
        const writable = await handle.createWritable();
        await writable.write(file);
        await writable.close();
        console.log("saved file");


    } catch (err) {
        if (err.name !== "AbortError") {
            console.error("save didnt work: " + err);
        }
    }
}

async function openFile() {
    console.log("open function runs");
    try {
        const [handle] = await window.showOpenFilePicker({
            types: [{
                description: "HTML Documents",
                accept: { "text/html": [".html"] },
            }],
            multiple: false
        });


        const file = await handle.getFile();
        const fileStr = await file.text();
        document.documentElement.innerHTML = fileStr;


        console.log("opened file");
    } catch (err) {
        if (err.name !== "AbortError") {
            console.error("open didnt work: " + err);
        }
    }
}

function newRow() {
    let table = document.getElementById("table");
    const newtr = document.createElement("tr");
    const datetd = document.createElement("td");
    const subjtd = document.createElement("td");
    const nametd = document.createElement("td");
    const completedtd = document.createElement("td");

    datetd.innerHTML = '<input type="date">';
    subjtd.innerHTML = '<input type="text" value="Subject">';
    nametd.innerHTML = '<input type="text" value="Name">';
    completedtd.innerHTML = '<input type="checkbox" class="cb">';

    table.appendChild(newtr)
    newtr.appendChild(datetd)
    newtr.appendChild(subjtd)
    newtr.appendChild(nametd)
    newtr.appendChild(completedtd)
}

function completeTask() {
    try {
        //picks all checkboxes on the page
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        //split table into rows
        let table = document.getElementById("table");
        const rows = table.rows;
        
        //input is each variable in checkboxes (which is the checkbox element). i is the index of the element in the collection of elements
        checkboxes.forEach((input, i) => {
            //if the checkbox element is checked
            if (input.checked) {
                //add one to the index bc the rows of the table start at 1 (bc heading is first row)
                const rowIndex = i + 1; 
                //if the rows array has that index
                if (rows[rowIndex]) {
                    //then DIRECTLY set that row to be hidden
                    rows[rowIndex].style.display = 'none';
                }
            }
        });

    } catch (err) {
        if (err.name !== "AbortError") {
            console.error("completeTask didnt work: " + err);
        }
    }
}

function egyptianMode() {
    console.log('egyptianMode')
    document.getElementById('css').setAttribute('href', 'styles2.css')
    audio.play();
}

function checkState() {
    const checkbox = document.getElementById("switch");
    if(checkbox.checked) {
        console.log("checked yes")
        egyptianMode;
    }
}

document.getElementById("open").addEventListener("click", openFile);
document.getElementById("save").addEventListener("click", save);
document.getElementById("enter").addEventListener("click", newRow);
document.addEventListener("click", completeTask);

// const checkbox = document.getElementById("switch");
// checkbox.addEventListener('click', function() {
//     if(checkbox.checked) {
//         console.log("checked yes")
//         egyptianMode;
//     }
// })

const toggle = document.getElementById("toggleinput") // actual checkbox input not label
toggle.addEventListener("change", () =>  {
    if (toggle.checked) {
        egyptianMode();
        console.log("reached if statement in event listener")
        audio.muted = false;
    } else {
        document.getElementById('css').setAttribute('href', 'styles.css')
        audio.muted = true;
    }
});
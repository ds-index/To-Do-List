const input = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");

const showTasks = document.getElementById("show-tasks");

const darkTheme = document.getElementById("dark-mode");
const lightTheme = document.getElementById("light-mode");

let container = [];

let isDarkMode = false;
let isLightMode = true;

function addUserInput() {
    if (input.value.length != "") {
        container.push(input.value);
        let result = `<li class="animate__animated animate__bounceIn">
        <p class="text">${input.value}
        </p>
        <div>
        <i class="comp fa-solid fa-check"></i>
        <i class="remove fa-solid fa-trash"></i>
        <i class="edit fa-solid fa-pen-to-square"></i>
        </div>
        </li>`;

        input.value = "";
        $("#tasks").append(result);

        console.log(container);
    } else {
        alert("Empty!");
    }
}

function handler() {
    document
        .getElementById("tasks")
        .addEventListener("click", function (event) {
            let target = event.target;
            let listItem = target.closest("li");

            if (!listItem) return;

            let taskText = listItem.querySelector("p");

            if (target.classList.contains("fa-check")) {
                taskText.classList.toggle("completed");
            } else if (target.classList.contains("fa-pen-to-square")) {
                let newText = prompt("Enter new Text:", taskText.textContent);
                if (newText) {
                    taskText.textContent = newText;
                }
            } else if (target.classList.contains("fa-trash")) {
                listItem.remove();
            }
        });
}

function clearData() {
    localStorage.clear();
    alert("Storage cleared please refresh the page.");
}

function saveData() {
    if (container.length !== 0) {
        if (localStorage.length !== 0) {
            let agoData = localStorage.getItem("value").split(",");
            let newData = [...agoData, ...container];
            localStorage.removeItem("value");
            localStorage.setItem("value", newData);
        } else {
            localStorage.setItem("value", container);
        }
        alert("Data saved in storage!");
    }
}

function renderDataFromLocalStorage() {
    if (localStorage.length !== 0) {
        let res = localStorage.getItem("value").split(",");

        for (let element of res) {
            let result = `<li class="animate__animated animate__bounceIn">
        <p class="text">${element}
        </p>
        <div>
        <i class="comp fa-solid fa-check"></i>
        <i class="remove fa-solid fa-trash"></i>
        <i class="edit fa-solid fa-pen-to-square"></i>
        </div>
        </li>`;

            $("#tasks").append(result);
        }
    }
}

clearBtn.addEventListener("click", clearData);

saveBtn.addEventListener("click", saveData);

addBtn.addEventListener("click", addUserInput);

handler();

renderDataFromLocalStorage();

showTasks.addEventListener("click", () => {
    $("#tasks").slideToggle("slow");
});

darkTheme.addEventListener("click", () => {
    isDarkMode = true;
    isLightMode = false;
    $("body").addClass("dark-mode");
    $("header").css("background-color", "#343a40");
    $(".input-header").css("color", "#e9ecef");
    $("#tasks li").css("background-color", "#343a40");
    $("#add-btn").css("background-color", "#0dcaf0");
    $("#tasks li div i:nth-child(1)").css("color", "#0dcaf0");
    $("#tasks li div i:nth-child(2)").css("color", "#ff4d4d");
    $("#tasks li div i:nth-child(3)").css("color", "#ffd43b");
});

lightTheme.addEventListener("click", () => {
    isDarkMode = false;
    isLightMode = true;
    $("body").removeClass("dark-mode");
    $("header").css("background-color", "#ffffff");
    $(".input-header").css("color", "#6c757d");
    $("#tasks li").css("background-color", "#ffffff");
    $("#add-btn").css("background-color", "#0d6efd");
    $("#tasks li div i:nth-child(1)").css("color", "#0d6efd");
    $("#tasks li div i:nth-child(2)").css("color", "#dc3545");
    $("#tasks li div i:nth-child(3)").css("color", "#ffc107");
});

if (isDarkMode) {
    $("#tasks li").css("background-color", "#343a40");
    $("#tasks li").removeClass("");
    $("#add-btn").css("background-color", "#0dcaf0");
    $("#tasks li div i:nth-child(1)").css("color", "#0dcaf0");
    $("#tasks li div i:nth-child(2)").css("color", "#ff4d4d");
    $("#tasks li div i:nth-child(3)").css("color", "#ffd43b");
}

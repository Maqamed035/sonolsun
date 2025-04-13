const toggleInputBtn = document.getElementById("toggleInputBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const inputContainer = document.getElementById("inputContainer");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const imageElement = document.getElementById("mainImage");

window.addEventListener("DOMContentLoaded", () => {
    addNewEditableTask();
});

toggleInputBtn.addEventListener("click", () => {
    addNewEditableTask();
});

saveTaskBtn.addEventListener("click", () => {
    const taskTextValue = taskInput.value.trim();
    if (taskTextValue === "") return;

    const li = document.createElement("li");

    const taskText = document.createElement("div");
    taskText.classList.add("task-text");
    taskText.textContent = taskTextValue;
    taskText.contentEditable = true;

    const deleteBtn = createDeleteButton(li);

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    setCaretToEnd(taskText);
});

function addNewEditableTask() {
    const li = document.createElement("li");

    const taskText = document.createElement("div");
    taskText.classList.add("task-text");
    taskText.contentEditable = true;

    const deleteBtn = createDeleteButton(li);

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    setCaretToEnd(taskText);
}

function createDeleteButton(parentLi) {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        parentLi.remove();
    });
    return deleteBtn;
}



// Şəkil hover effekti
const images = {
    photo1: "image/photo1.svg",
    photo2: "image/photo2.svg",
    photo3: "image/photo3.svg",
    photo4: "image/photo4.svg"
};

imageElement.addEventListener("mouseover", () => {
    const currentSrc = imageElement.getAttribute("src");
    if (currentSrc.includes("photo1")) {
        imageElement.src = images.photo2;
    } else if (currentSrc.includes("photo3")) {
        imageElement.src = images.photo4;
    }
});

imageElement.addEventListener("mouseout", () => {
    const currentSrc = imageElement.getAttribute("src");
    if (currentSrc.includes("photo2")) {
        imageElement.src = images.photo1;
    } else if (currentSrc.includes("photo4")) {
        imageElement.src = images.photo3;
    }
});
      
let isAscending = true;

imageElement.addEventListener("click", () => {
    sortTasksAlphabetically();
    const currentSrc = imageElement.getAttribute("src");
    if (currentSrc.includes("photo2")) {
        imageElement.src = images.photo4;
    } else if (currentSrc.includes("photo4")) {
        imageElement.src = images.photo2;
    }
});

function sortTasksAlphabetically() {
    const tasks = Array.from(taskList.querySelectorAll("li"));

    tasks.sort((a, b) => {
        const textA = a.querySelector(".task-text").textContent.toLowerCase();
        const textB = b.querySelector(".task-text").textContent.toLowerCase();

        return isAscending
            ? textA.localeCompare(textB)
            : textB.localeCompare(textA);
    });

    tasks.forEach(task => taskList.appendChild(task));
    isAscending = !isAscending;
}

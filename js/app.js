const elements = {
    taskInput: document.getElementById("taskInput"),
    addTaskBtn: document.getElementById("addTaskBtn"),
    loadSamplesBtn: document.getElementById("loadSamplesBtn"),
    taskList: document.getElementById("taskList"),
    taskMessage: document.getElementById("taskMessage"),
    totalCount: document.getElementById("totalCount"),
    pendingCount: document.getElementById("pendingCount"),
    completedCount: document.getElementById("completedCount")
};

const {
    taskInput,
    addTaskBtn,
    loadSamplesBtn,
    taskList,
    taskMessage,
    totalCount,
    pendingCount,
    completedCount
} = elements;

const EMPTY_MESSAGE = "Task cannot be empty";

const SAMPLE_TASKS = [
    "Review DOM selectors",
    "Practice createElement",
    "Study event delegation"
];

const TASK_BUTTONS = [
    { className: "complete-btn", label: "Complete" },
    { className: "edit-btn", label: "Edit" },
    { className: "remove-btn", label: "Remove" }
];

let taskCounter = 0;

function generateTaskId() {
    let taskId;

    do {
        taskCounter++;
        taskId = `task-${taskCounter}`;
    } while (taskList.querySelector(`[data-task-id="${taskId}"]`));

    return taskId;
}

function showMessage(text) {
    taskMessage.textContent = text;
}

function createButton({ className, label }) {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add(className);
    button.textContent = label;

    return button;
}

function createTaskElement(taskText, taskId) {
    const taskItem = document.createElement("li");

    taskItem.classList.add("task-item");
    taskItem.dataset.taskId = taskId;
    taskItem.dataset.state = "pending";

    const textSpan = document.createElement("span");

    textSpan.classList.add("task-text");
    textSpan.textContent = taskText;

    taskItem.appendChild(textSpan);

    TASK_BUTTONS.map(createButton).forEach((button) => {
        taskItem.appendChild(button);
    });

    return taskItem;
}

function addTask(taskText) {
    const cleanedText = taskText.trim();

    if (cleanedText === "") {
        showMessage(EMPTY_MESSAGE);
        return;
    }

    const taskItem = createTaskElement(cleanedText, generateTaskId());

    taskList.appendChild(taskItem);
    taskInput.value = "";
    showMessage("");
    updateTaskCounts();
}

function toggleTaskComplete(taskItem) {
    const isCompleted = taskItem.classList.toggle("completed");

    taskItem.dataset.state = isCompleted ? "completed" : "pending";
    updateTaskCounts();
}

function beginTaskEdit(taskItem) {
    const textSpan = taskItem.querySelector(".task-text");
    const editButton = taskItem.querySelector(".edit-btn");

    if (!textSpan) {
        return;
    }

    const editInput = document.createElement("input");

    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = textSpan.textContent;

    textSpan.replaceWith(editInput);
    editButton.textContent = "Save";
    editInput.focus();
}

function saveTaskEdit(taskItem) {
    const editInput = taskItem.querySelector(".edit-input");
    const editButton = taskItem.querySelector(".edit-btn");

    if (!editInput) {
        return;
    }

    const editedText = editInput.value.trim();

    if (editedText === "") {
        showMessage(EMPTY_MESSAGE);
        editInput.focus();
        return;
    }

    const newTextSpan = document.createElement("span");

    newTextSpan.classList.add("task-text");
    newTextSpan.textContent = editedText;

    editInput.replaceWith(newTextSpan);
    editButton.textContent = "Edit";
    showMessage("");
}

function handleEditAction(taskItem) {
    if (taskItem.querySelector(".edit-input")) {
        saveTaskEdit(taskItem);
    } else {
        beginTaskEdit(taskItem);
    }
}

function removeTask(taskItem) {
    taskItem.remove();
    updateTaskCounts();
}

function updateTaskCounts() {
    const tasks = [...taskList.querySelectorAll(".task-item")];

    const completed = tasks.filter(
        (task) => task.dataset.state === "completed"
    ).length;

    const pending = tasks.filter(
        (task) => task.dataset.state === "pending"
    ).length;

    totalCount.textContent = tasks.length;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}

const ACTION_HANDLERS = {
    "complete-btn": toggleTaskComplete,
    "edit-btn": handleEditAction,
    "remove-btn": removeTask
};

function handleTaskListClick(event) {
    const { target } = event;

    if (!target.matches("button")) {
        return;
    }

    const taskItem = target.closest(".task-item");

    if (!taskItem) {
        return;
    }

    const actionClass = Object.keys(ACTION_HANDLERS).find(
        (className) => target.classList.contains(className)
    );

    if (actionClass) {
        ACTION_HANDLERS[actionClass](taskItem);
    }
}

function loadSampleTasks() {
    const fragment = document.createDocumentFragment();

    SAMPLE_TASKS.forEach((taskText) => {
        fragment.appendChild(createTaskElement(taskText, generateTaskId()));
    });

    taskList.appendChild(fragment);
    showMessage("");
    updateTaskCounts();
}

addTaskBtn.addEventListener("click", () => {
    addTask(taskInput.value);
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask(taskInput.value);
    }
});

loadSamplesBtn.addEventListener("click", loadSampleTasks);

taskList.addEventListener("click", handleTaskListClick);

updateTaskCounts();
import { EMPTY_MESSAGE, SAMPLE_TASKS } from "./data.js";
import { cleanText, generateTaskId } from "./utils.js";
import {
    elements,
    showMessage,
    createTaskElement,
    toggleTaskComplete,
    beginTaskEdit,
    saveTaskEdit,
    removeTask,
    updateTaskCounts
} from "./display.js";

const { taskInput, addTaskBtn, loadSamplesBtn, taskList } = elements;

function addTask(taskText) {
    const cleanedText = cleanText(taskText);

    if (cleanedText === "") {
        showMessage(EMPTY_MESSAGE);
        return;
    }

    const taskItem = createTaskElement(cleanedText, generateTaskId(taskList));

    taskList.appendChild(taskItem);
    taskInput.value = "";
    showMessage("");
    updateTaskCounts();
}

function handleEditAction(taskItem) {
    if (taskItem.querySelector(".edit-input")) {
        saveTaskEdit(taskItem);
    } else {
        beginTaskEdit(taskItem);
    }
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
        fragment.appendChild(
            createTaskElement(taskText, generateTaskId(taskList))
        );
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
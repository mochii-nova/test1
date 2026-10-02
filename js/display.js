const DisplayModule = (() => {
    const { EMPTY_MESSAGE, TASK_BUTTONS } = DataModule;
    const { cleanText } = UtilsModule;

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

    function showMessage(text) {
        elements.taskMessage.textContent = text;
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

        const editedText = cleanText(editInput.value);

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

    function removeTask(taskItem) {
        taskItem.remove();
        updateTaskCounts();
    }

    function updateTaskCounts() {
        const tasks = [...elements.taskList.querySelectorAll(".task-item")];

        const completed = tasks.filter(
            (task) => task.dataset.state === "completed"
        ).length;

        const pending = tasks.filter(
            (task) => task.dataset.state === "pending"
        ).length;

        elements.totalCount.textContent = tasks.length;
        elements.pendingCount.textContent = pending;
        elements.completedCount.textContent = completed;
    }

    return {
        elements,
        showMessage,
        createTaskElement,
        toggleTaskComplete,
        beginTaskEdit,
        saveTaskEdit,
        removeTask,
        updateTaskCounts
    };
})();
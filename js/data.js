const DataModule = (() => {
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

    function nextTaskNumber() {
        taskCounter++;
        return taskCounter;
    }

    return { EMPTY_MESSAGE, SAMPLE_TASKS, TASK_BUTTONS, nextTaskNumber };
})();
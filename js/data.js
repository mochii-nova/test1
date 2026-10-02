export const EMPTY_MESSAGE = "Task cannot be empty";

export const SAMPLE_TASKS = [
    "Review DOM selectors",
    "Practice createElement",
    "Study event delegation"
];

export const TASK_BUTTONS = [
    { className: "complete-btn", label: "Complete" },
    { className: "edit-btn", label: "Edit" },
    { className: "remove-btn", label: "Remove" }
];

let taskCounter = 0;

export function nextTaskNumber() {
    taskCounter++;
    return taskCounter;
}
import { nextTaskNumber } from "./data.js";

export function cleanText(text) {
    return text.trim();
}

export function generateTaskId(taskList) {
    let taskId;

    do {
        taskId = `task-${nextTaskNumber()}`;
    } while (taskList.querySelector(`[data-task-id="${taskId}"]`));

    return taskId;
}
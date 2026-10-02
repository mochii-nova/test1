const UtilsModule = (() => {
    const { nextTaskNumber } = DataModule;

    function cleanText(text) {
        return text.trim();
    }

    function generateTaskId(taskList) {
        let taskId;

        do {
            taskId = `task-${nextTaskNumber()}`;
        } while (taskList.querySelector(`[data-task-id="${taskId}"]`));

        return taskId;
    }

    return { cleanText, generateTaskId };
})();
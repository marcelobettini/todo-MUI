export const getTasksFromStorage = () => {
    const storedTasks = window.localStorage.getItem("tasks");
    let tasks = [];
    if (storedTasks != null) tasks = JSON.parse(storedTasks);
    return tasks;
};
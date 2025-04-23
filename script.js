//#region Current Date

const today = new Date();

const day = today.getDate();
const month = today.toLocaleString('default', { month: 'long' });
const year = today.getFullYear();

const pDate = document.querySelector(".p__date");
pDate.innerHTML = `${day} ${month}, ${year}`;

//#endregion

//#region Themes

const divThemes = document.querySelectorAll(".div__theme");
const root = document.documentElement;

let hue = localStorage.getItem("hue") || 277;

divThemes.forEach(divTheme => {
    if (hue === divTheme.getAttribute("data-hue")) {
        divTheme.classList.add("is-active");
        root.style.setProperty("--hue", hue);
    }

    divTheme.addEventListener("click", () => {
        const previousActveTheme = document.querySelector(".div__theme.is-active")
        previousActveTheme?.classList.remove("is-active");
    
        divTheme.classList.add("is-active");

        hue = divTheme.getAttribute("data-hue");
        console.log(divTheme);
        root.style.setProperty("--hue", hue);

        localStorage.setItem("hue", hue);
    });
});

//#endregion

//#region App Info

const divAppInfo = document.querySelector(".div__app-info");
divAppInfo.addEventListener("click", () => {
    document.querySelector(".main .div__app-info").classList.remove("is-hidden");
});

const buttonOK = document.querySelector(".button__ok");
buttonOK.addEventListener("click", () => {
    document.querySelector(".main .div__app-info").classList.add("is-hidden");
});

//#endregion

//#region Task Array
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// const tasks = [
//     "Morning workout – 30 minutes of stretching or a quick jog",
//     "Make a healthy breakfast – Try something new like overnight oats",
//     "Check and respond to urgent emails",
//     "Plan your top 3 goals for the day",
//     "Finish 1 major work task/project milestone",
//     "Attend scheduled meetings or check-ins",
//     "Organize your workspace – Clear out clutter",
//     "Take a 15-minute walk or screen break midday",
//     "Hydrate! Aim for 2L of water",
//     "Call or message a friend/family member – stay connected",
//     "Update your calendar or planner",
//     "Do a 5-minute meditation or breathing exercise",
//     "Complete a household chore – e.g., dishes, laundry",
//     "Learn something new – Watch a short documentary or read an article",
//     "Declutter one digital space – Inbox, desktop, photo library",
//     "Make progress on a personal project or hobby",
//     "Prep dinner or plan meals for tomorrow",
//     "Journal or reflect on the day",
//     "Set up your to-do list for tomorrow",
//     "Unwind screen-free for 30 mins before bed"
// ];

//#endregion

//#region Theme Toggle Button

const buttonThemeToggler = document.querySelector(".button__theme-toggler");
const divThemeAndAppInfo = document.querySelector(".div__theme-and-app-info");
buttonThemeToggler.addEventListener("click", () => {
    divThemeAndAppInfo.classList.toggle("is-hidden");
});

//#endregion

//#region Display Slogan

function displaySlogan() {
    const divSlogan = document.querySelector(".div__slogan");
    if (tasks.length === 0) {
        divSlogan.classList.remove("is-hidden");
    }
    else {
        divSlogan.classList.add("is-hidden"); 
    }
}

displaySlogan();

//#endregion

//#region Generate Task List
function generateTasks() {
    displaySlogan();
    const ulTaskList = document.querySelector(".ul__task-list");
    let taskListItemHTML = ``;
    for (let i = 0; i < tasks.length; i++) {
        taskListItemHTML += `
            <li class="li_task-list-item">
                <button class="button__check-icon" data-tasks-index=${i}>
                    <span class="span__check-icon"></span>
                </button>
                <p class="p__task-text">${tasks[i]}</p>

                <button class="button__trash-outline" data-tasks-index=${i}>
                    <svg class="svg__trash-outline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                        <path d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                            style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
                        <line x1="80" y1="112" x2="432" y2="112"
                            style="stroke:currentColor;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px" />
                        <path d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                            style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
                        <line x1="256" y1="176" x2="256" y2="400"
                            style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
                        <line x1="184" y1="176" x2="192" y2="400"
                            style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
                        <line x1="328" y1="176" x2="320" y2="400"
                            style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
                        </svg>
                </button>
            </li>
        `;
    }

    ulTaskList.innerHTML = taskListItemHTML;
    completeTask();
    deleteTask();
}

generateTasks();
//#endregion

//#region Hide or Show the Add a task text
const textboxAddTask = document.querySelector(".textbox__add-task");
const spanAddTask = document.querySelector('.span__add-task');

function toggleAddTaskText(task) {
    if (task === "") {
        spanAddTask.classList.remove("is-hidden");
    }
    else {
        spanAddTask.classList.add("is-hidden");
    }
}

textboxAddTask.addEventListener("blur", () => {
    const task = textboxAddTask.value;
    toggleAddTaskText(task);
});

document.addEventListener("DOMContentLoaded", () => {
    const task = textboxAddTask.value;
    toggleAddTaskText(task);
});

const svgEllipseOutline = document.querySelector(".svg__ellipse-outline");
svgEllipseOutline.addEventListener("click", () => {
    textboxAddTask.value = "";
    toggleAddTaskText("");
});

//#endregion

//#region Add task
textboxAddTask.addEventListener("keydown", event => {
    const task = textboxAddTask.value;
    if (task === "") {
        return;
    }

    if (event.key === "Enter") {
        tasks.unshift(task);
        textboxAddTask.value = "";

        localStorage.setItem("tasks", JSON.stringify(tasks));
        generateTasks();
    }
});

//#endregion

//#region Delete Task

function deleteTask() {
    const buttonTrashOutlines = document.querySelectorAll(".button__trash-outline");
    buttonTrashOutlines.forEach(buttonTrashOutline => {
        const index = buttonTrashOutline.getAttribute("data-tasks-index");
        buttonTrashOutline.addEventListener("click", () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));

            const deletedSound = new Audio("./sounds/delete.mp3");
            deletedSound.play();

            generateTasks();
        });
    });
}

//#endregion

//#region Complete Task

function completeTask() {
    const buttonCheckIcons = document.querySelectorAll(".button__check-icon");
    buttonCheckIcons.forEach(buttonCheckIcon => {
        const index = buttonCheckIcon.getAttribute("data-tasks-index");
        buttonCheckIcon.addEventListener("click", () => {
            const liTaskListItem = buttonCheckIcon.closest(".li_task-list-item");
            const spanCheckIcon = buttonCheckIcon.querySelector(".span__check-icon");

            liTaskListItem.classList.add("is-completed");
            spanCheckIcon.classList.add("is-checked");

            const taskCompleteSound = new Audio("./sounds/task-complete.mp3");
            taskCompleteSound.play();

            setTimeout(() => {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                generateTasks();
            }, 250);
        });
    });
}

//#endregion





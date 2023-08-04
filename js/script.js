import {DatePicker} from "./datePicker.js";

const datePicker = new DatePicker();

const ADD_TASK__BTN = document.querySelector('.add-task__btn');
const MODAL_OVERLAY = document.querySelector('.modal-overlay');
const ADD_TASK__MODAL = document.querySelector('.add-task__modal');
const SET_DEADLINE_BTN = document.querySelector('.set-deadline');

const TASK_TITLE = document.querySelector('#task-title');
const TASK_DESCR = document.querySelector('#task-descr');
const TASK_CONTAINER = document.querySelector('.tasks__wrapper');
const BODY = document.querySelector('body');

ADD_TASK__BTN.addEventListener('click', function (e) {
    MODAL_OVERLAY.classList.add('active');
    ADD_TASK__MODAL.classList.add('active');

    BODY.style.overflow = 'hidden'
})


ADD_TASK__MODAL.addEventListener('click', function (e) {
    const target = e.target;


    if (target.closest('.close-btn')) {
        MODAL_OVERLAY.classList.remove('active')
        ADD_TASK__MODAL.classList.remove('active')
        BODY.style.overflow = 'auto'
    } else if (target.closest('.send-task')) {
        console.log(TASK_TITLE.value, TASK_DESCR.value);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const hours = datePicker.selectedDate.getHours();
        const minutes = datePicker.selectedDate.getMinutes();

        const date = `${datePicker.selectedDate.getDate()} ${months[datePicker.selectedDate.getUTCMonth()]} at ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

        TASK_CONTAINER.insertAdjacentHTML(
            "beforeend",
            `<div class="task">
                    <svg class="options-task__btn" xmlns="http://www.w3.org/2000/svg" height="1em"
                         viewBox="0 0 448 512">
                        <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/>
                    </svg>

                    <div class="task__main-info">
                        <h2 class="task-title">${TASK_TITLE.value}</h2>
                        <p class="task-deadline">${date}</p>
                    </div>

                    <div class="task__part-info">
                        <div class="category">
                            <svg fill="#000000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M16 6.28a1.23 1.23 0 0 0-.62-1.07l-6.74-4a1.27 1.27 0 0 0-1.28 0l-6.75 4a1.25 1.25 0 0 0 0 2.15l1.92 1.12v2.81a1.28 1.28 0 0 0 .62 1.09l4.25 2.45a1.28 1.28 0 0 0 1.24 0l4.25-2.45a1.28 1.28 0 0 0 .62-1.09V8.45l1.24-.73v2.72H16V6.28zm-3.73 5L8 13.74l-4.22-2.45V9.22l3.58 2.13a1.29 1.29 0 0 0 1.28 0l3.62-2.16zM8 10.27l-6.75-4L8 2.26l6.75 4z"></path>
                                </g>
                            </svg>
                            <span class="category-title">University</span>
                        </div>
                        <div class="priority">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M5 1C4.44772 1 4 1.44772 4 2V22C4 22.5523 4.44772 23 5 23C5.55228 23 6 22.5523 6 22V14H19C19.3603 14 19.6927 13.8062 19.8702 13.4927C20.0477 13.1792 20.0429 12.7944 19.8575 12.4855L17.1662 8L19.8575 3.5145C20.0429 3.20556 20.0477 2.82081 19.8702 2.5073C19.6927 2.19379 19.3603 2 19 2L6 2C6 1.44772 5.55228 1 5 1ZM6 4V12H17.2338L15.1425 8.5145C14.9525 8.19781 14.9525 7.80219 15.1425 7.4855L17.2338 4H6Z"
                                    ></path>
                                </g>
                            </svg>
                            <span class="priority-value">1</span>
                        </div>
                    </div>
                </div>`
        )

    }
})


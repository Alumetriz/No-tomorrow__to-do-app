const ADD_TASK__BTN = document.querySelector('.add-task__btn');
const MODAL_OVERLAY = document.querySelector('.modal-overlay');
const ADD_TASK__MODAL = document.querySelector('.add-task__modal');

ADD_TASK__BTN.addEventListener('click', function (e) {
    MODAL_OVERLAY.classList.add('active');
    ADD_TASK__MODAL.classList.add('active');
})


const TASK_TITLE = document.querySelector('#task-title');
const TASK_DESCR = document.querySelector('#task-descr');

ADD_TASK__MODAL.addEventListener('click', function (e) {
    const target = e.target;

    if (target.closest('.close-btn')) {
        MODAL_OVERLAY.classList.remove('active')
        ADD_TASK__MODAL.classList.remove('active')
    } else if (target.closest('.send-task')) {
        console.log(TASK_TITLE.value, TASK_DESCR.value);
    }
})


document.addEventListener('DOMContentLoaded', () => {
    let actions = document.querySelectorAll('.action');
    actions.forEach((action) => {
        action.addEventListener('click', () => {updateClickedAction(action)})
    });

    let subactions = document.querySelectorAll('.subaction');
    subactions.forEach((subaction) => {
        subaction.addEventListener('click', () => {updateClickedSubaction(subaction)});
    });

    let subSubactions = document.querySelectorAll('.sub-subaction');
    subSubactions.forEach((subSubaction) => {
        subSubaction.addEventListener('click', () => {updateClickedSubSubaction(subSubaction)});
    });

    document.querySelector('.side-bar__user').
    addEventListener('click', () => {
        if (document.querySelector('.user-tooltip').style.visibility === 'visible') {
            document.querySelector('.user-tooltip').style.transform = 'translateY(10rem)';
            document.querySelector('.user-more').classList = `ri-arrow-down-s-fill user-more`;
            document.querySelector('.user-tooltip').style.visibility = 'hidden';

        } else {
            document.querySelector('.user-tooltip').style.transform = 'translateY(0)';
            document.querySelector('.user-more').classList = `ri-arrow-up-s-fill user-more`;
            document.querySelector('.user-tooltip').style.visibility = 'visible';
        }
    });
});

function updateClickedAction(action) {
    if (action.classList.contains('action-active')) {
        action.classList.remove('action-active');
        if (action.querySelector('a i')) {
            action.querySelector('a i').classList = 'ri-arrow-right-s-line chevron_right';
        }
        return
    };

    removeActiveSubSubaction();
    removeActiveSubAction();
    let currentActive = document.querySelector('.action-active');
    if (currentActive) {
        currentActive.classList.remove('action-active');
        if (currentActive.querySelector('a i')) {
            currentActive.querySelector('a i').classList = 'ri-arrow-right-s-line chevron_right';
            console.log(document.querySelector(`#${currentActive.dataset.actionName}`));
            document.querySelector(`#${currentActive.dataset.actionName}`).classList.add('collapsing');
            document.querySelector(`#${currentActive.dataset.actionName}`).classList.remove('show');
            document.querySelector(`#${currentActive.dataset.actionName}`).classList.remove('collapsing');
        };
    }

    action.classList.add('action-active');
    if (action.querySelector('a i')) {
        action.querySelector('a i').classList = 'ri-arrow-down-s-line chevron_right';
    }
}

function updateClickedSubaction(subaction) {
    if (subaction.classList.contains('subaction-active')) {
        subaction.classList.remove('subaction-active');
        if (subaction.querySelector('a i')) {
            subaction.querySelector('a i').classList = 'ri-arrow-right-s-line';
        }
        return
    };

    removeActiveSubAction();
    removeActiveSubSubaction();
    subaction.classList.add('subaction-active');
    if (subaction.querySelector('a i')) {
        subaction.querySelector('a i').classList = 'ri-arrow-down-s-line';
    }
}

function updateClickedSubSubaction(subSubaction) {
    removeActiveSubSubaction();
    subSubaction.classList.add('sub-subaction-active');
}

function removeActiveSubAction() {
    let currentActive = document.querySelector('.subaction-active');
    if (currentActive) {
        currentActive.classList.remove('subaction-active');
        if (currentActive.querySelector('a i')) {
            currentActive.querySelector('a i').classList = 'ri-arrow-right-s-line';
            console.log(document.querySelector(`#${currentActive.dataset.actionName}`));
            document.querySelector(`#${currentActive.dataset.actionName}`).classList.add('collapsing');
            document.querySelector(`#${currentActive.dataset.actionName}`).classList.remove('show');
            document.querySelector(`#${currentActive.dataset.actionName}`).classList.remove('collapsing');
        };
    }
    if (document.querySelector('.subaction-active')) {
        document.querySelector('.subaction-active').classList.remove('subaction-active');
    }
}

function removeActiveSubSubaction() {
    if (document.querySelector('.sub-subaction-active')) {
        document.querySelector('.sub-subaction-active').classList.remove('sub-subaction-active');
    }
}

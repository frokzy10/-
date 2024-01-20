// dropdown//////////
let togglemenu = document.getElementById('subMenu');
let toggleclose = document.querySelector('.submenu_close');
let searchSystem = document.getElementById('searchSystem');
let fieldContainer = document.querySelector('.field-container');
let inputColor = document.querySelector('.field');
let ClosePanel = document.querySelector('.icon-close')
let All = document.querySelector('body')

function hideMenu() {
    togglemenu.classList.remove('open');
}

function toggleMenu() {
    togglemenu.classList.toggle("open")
    hideModal()
}

function hideModal() {
    fieldContainer.classList.remove('activeInput');
}

togglemenu.addEventListener("click", () => {
    togglemenu.classList.toggle('open');
    hideModal();
});

toggleclose.addEventListener("click", () => {
    toggleclose.classList.remove('open');
});


// gallery////////////////////////////////
const filterButtons = document.querySelectorAll(".filter_buttons button");
const filterableCards = document.querySelectorAll('.filterable_cards .card');

const filterCards = e => {
    document.querySelector(".activeButtons").classList.remove('activeButtons');
    e.target.classList.add('activeButtons');

    filterableCards.forEach(card => {
        card.classList.add('hide');

        if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === "All") {
            card.classList.remove('hide');
        }
    });
};

filterButtons.forEach(buttons => buttons.addEventListener("click", filterCards));
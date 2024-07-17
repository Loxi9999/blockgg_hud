"use strict";
// ELements
const modalElement = document.querySelector('[modal]');
const modalOverlay = document.querySelector('[modalOverlay]');
const modalCloseButton = document.querySelector('[modalCloseButton]');
const yankesLink = document.querySelector('.yankes-link');
// Functions
const hideModal = () => {
    fetch('https://blockgg_hud/settings/hideModal', { method: 'POST' }).then(() => {
        modalElement.classList.add('hidden');
    });
};
const showModal = () => {
    modalElement.classList.remove('hidden');
};
const onShowModal = ({ data }) => {
    if (data.action === 'showModal') {
        showModal();
    }
};
const openWebsite = (link) => {
    // @ts-ignore
    window.invokeNative(link);
};
// Event listeners
window.addEventListener('message', onShowModal);
modalOverlay.addEventListener('click', () => hideModal());
modalCloseButton.addEventListener('click', () => hideModal());

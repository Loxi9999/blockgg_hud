"use strict";
// Elements
const hudContainerElement = document.querySelector('[hudContainer]');
const colorInputElement = document.querySelector('[colorInput]');
const posButtons = document.querySelectorAll('.pos-selector button');
const classicHudSwitcherElement = document.querySelector('[classicHudSwitcher]');
const sendHudUpdate = (setting, value) => {
    fetch('https://blockgg_hudnew/settings/sendHudUpdate', {
        method: 'POST',
        body: JSON.stringify({
            setting: setting, value: value
        })
    });
};
const huds = {
    newHud: document.querySelector('[newHud]'),
    gtaHud: document.querySelector('[gtaHud]')
};
const getActiveHud = () => {
    const activeHud = document.querySelector('.active');
    return activeHud === null || activeHud === void 0 ? void 0 : activeHud.className;
};
Object.keys(huds).map((key) => {
    const hud = huds[key];
    hud.addEventListener('click', () => {
        const activeHud = document.querySelector('.active');
        if (activeHud != null && activeHud.textContent !== hud.textContent) {
            activeHud.classList.remove('active');
            hud.classList.add('active');
            localStorage.setItem('hudmode', key);
            sendHudUpdate('hudmode', key);
            if (key == 'gtaHud') {
                const hud = document.querySelector('.hud-container');
                hud.classList.add('hidden');
                document.body.classList.add('classic');
                carhudClassic.style.display = 'block';
            }
            else {
                document.body.classList.remove('classic');
                carhudClassic.style.display = 'none';
                if (key == 'newHud') {
                    const hud = document.querySelector('.hud-container');
                    const carhud = document.querySelector('.carhud .new');
                    hud.classList.remove('hidden');
                    carhud === null || carhud === void 0 ? void 0 : carhud.classList.remove('hidden');
                }
            }
        }
    });
});
// Varibles
let currentPosition = 'bc';
// Color Input
colorInputElement.addEventListener('input', (e) => {
    // @ts-ignore
    const value = e.target.value;
    document.body.style.setProperty('--primary', value);
    localStorage.setItem('color', value);
    sendHudUpdate('color', value);
});
// Hud Postion
const changePosition = (newPosition) => {
    hudContainerElement.classList.replace(currentPosition, newPosition);
    currentPosition = newPosition;
    localStorage.setItem('pos', newPosition);
};
const clearFilledPosButtons = () => posButtons.forEach((button) => button.classList.remove('filled'));
posButtons.forEach((button) => button.addEventListener('click', (e) => {
    const pos = button.getAttribute('pos');
    changePosition(pos);
    clearFilledPosButtons();
    button.classList.add('filled');
}));
// Functions
const loadSettings = () => {
    const pos = localStorage.getItem('pos') || 'bc';
    const color = localStorage.getItem('color') || 'crimson';
    const hudMode = localStorage.getItem('hudmode') || 'newHud';
    const hud = document.querySelector('.hud-container');
    const carhud = document.querySelector('.newCarhud');
    const classicCarhud = document.querySelector('.carhud-classic');
    sendHudUpdate('color', color);
    sendHudUpdate('hudmode', hudMode);
    if (hudMode == 'newHud') {
        document.body.classList.remove('classic');
        carhudClassic.style.display = 'none';
    }
    else if (hudMode == 'gtaHud') {
        carhudClassic.style.display = 'block';
        hud.classList.add('hidden');
        carhud === null || carhud === void 0 ? void 0 : carhud.classList.add('hidden');
        document.body.classList.add('classic');
    }
    huds[hudMode].classList.toggle('active');
    currentPosition = pos;
    hudContainerElement.classList.add(pos);
    posButtons.forEach((button) => {
        const pos = button.getAttribute('pos');
        if (pos === currentPosition) {
            button.classList.add('filled');
        }
    });
    document.body.style.setProperty('--primary', color);
};
window.addEventListener('DOMContentLoaded', loadSettings);

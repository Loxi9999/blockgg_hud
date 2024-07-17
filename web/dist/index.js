"use strict";
// Elements
const healthElement = document.querySelector('[health]');
const armourElement = document.querySelector('[armour]');
const voiceElement = document.querySelector('[voice]');
const carhud = document.querySelector('[carhud]');
const carhudClassic = document.querySelector('[carhudClassic]');
const districtElement = document.querySelector('[district]');
const rpmElement = document.querySelector('[rpm]');
const zoneElement = document.querySelector('[zone]');
const directionElements = document.querySelectorAll('[direction]');
const headingElement = document.querySelector('[heading]');
const streetElements = document.querySelectorAll('[street]');
const speedElements = document.querySelectorAll('[speed]');
const gearElement = document.querySelector('[gear]');
const tunroverBarElement = document.querySelector('[turnoverBar]');
// Functions
const setHudElement = (element, fill) => {
    const underFill = 60 - fill;
    element.style.setProperty('--fill', `${fill}%`);
    element.style.setProperty('--under-fill', `${underFill}%`);
};
const setValueForAll = (value, elements) => elements.forEach((e) => e.innerText = value);
// Functions
const onUpdate = ({ data }) => {
    if (data.action !== 'updateHud')
        return;
    if (data.health) {
        setHudElement(healthElement, data.health);
    }
    if (data.armor !== undefined && data.armor !== null) {
        setHudElement(armourElement, data.armor);
    }
    if (data.voice) {
        setHudElement(voiceElement, data.voice);
    }
};
const onVoiceActive = ({ data }) => {
    if (data.action !== 'updateIsTalking')
        return;
    if (data.isTalking) {
        voiceElement.classList.add('active');
    }
    else {
        voiceElement.classList.remove('active');
    }
};
const directions = {
    N: 'North',
    NW: 'North-West',
    W: 'West',
    SW: 'South-West',
    S: 'South',
    SE: 'South-East',
    E: 'East',
    NE: 'North-East',
};
const cache = {
    gear: 0
};
const onCarHudUpdate = ({ data }) => {
    var _a;
    if (data.action !== 'updateCarhud')
        return;
    if (data.isInVehicle != undefined && data.isInVehicle != null) {
        if (data.isInVehicle == true) {
            carhud.classList.remove('hidden');
            carhudClassic.classList.remove('hidden');
        }
        else {
            carhud.classList.add('hidden');
            carhudClassic.classList.add('hidden');
        }
    }
    if (data.direction) {
        setValueForAll(directions[data.direction], directionElements);
    }
    if (data.heading) {
        headingElement.style.transform = `rotate(${-45 + data.heading}deg)`;
    }
    if (data.street) {
        setValueForAll(data.street, streetElements);
    }
    if (data.speed) {
        setValueForAll(`${data.speed} ${((_a = getActiveHud()) === null || _a === void 0 ? void 0 : _a.includes('gtaHud')) ? 'kmh' : ''}`, speedElements);
    }
    if (data.gear) {
        gearElement.innerText = data.gear;
        cache.gear = data.gear;
    }
    if (data.tunrover) {
        let mappedEl = (data.tunrover / 100) * 75;
        tunroverBarElement.setAttribute('stroke-dasharray', `${mappedEl}, 100`);
    }
    if (data.district) {
        districtElement.innerHTML = `
            ${data.district.district} <span style="color: #aa18ff">/ ${data.district.zone}</span>
        `;
    }
    if (data.rpm) {
        rpmElement.innerHTML = data.rpm + ` rpm/<span class="stroked-text yellow">${cache.gear}</span>`;
    }
};
// Event listeners
window.addEventListener('message', onUpdate);
window.addEventListener('message', onVoiceActive);
window.addEventListener('message', onCarHudUpdate);

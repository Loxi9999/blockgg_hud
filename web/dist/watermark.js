"use strict";
// Elements
const cashElement = document.querySelector('[cash]');
const timeElement = document.querySelector('[time]');
const playerServerIdElement = document.querySelector('[playerServerId]');
// Constants
const minute = 1000 * 60;
// Functions
const formatNumber = (number) => {
    const units = ["", "tyś", "mln", "mld", "bln", "bld"];
    const numberOfZeros = Math.floor(Math.log10(number) / 3);
    const unit = units[numberOfZeros];
    const formattedNumber = number / Math.pow(1000, numberOfZeros);
    const roundedNumber = Math.round(formattedNumber * 100) / 100;
    return (unit || unit === '') ? roundedNumber.toString().replace('.', ',') + " " + unit : number;
};
const onWatermarkUpdate = ({ data }) => {
    if (data.action !== 'updateWatermark')
        return;
    if (data.cash) {
        const formattedCash = formatNumber(data.cash);
        cashElement.innerText = `${formattedCash}`;
    }
    if (data.id) {
        playerServerIdElement.innerText = data.id.toString();
    }
};
const getTime = () => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
};
const updateTime = () => {
    const time = getTime();
    timeElement.innerText = time;
};
// Functions Call & Intervals
updateTime();
setInterval(updateTime, minute);
// Event Listeners
window.addEventListener('message', onWatermarkUpdate);

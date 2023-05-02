let input = document.querySelector("#local");
let alarmBtn = document.querySelector("#alarm");
let selectedTime = input.value;
let errorMessage = document.querySelector("#error-message");
let clock = document.querySelector(".clock");
let intervalId = null;


alarmBtn.addEventListener("click", () => {
    const date = new Date(input.value);
    let newTime = date.getTime();
    let now = new Date();
    let time = now.getTime();
    if (time > newTime) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You Cannot set Alarm from the past!',
        })          
    } else {
        Swal.fire({
            title: 'Great!',
            text: "Alarm Setted successfully!",
            imageUrl: './img/running-clock.gif',
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: 'Running Clock',
        })
        intervalId = setInterval(() => {
            let now = new Date();
            let hours = now.getHours()
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            let currentTime = `${hours}:${minutes}:${seconds}`;
            console.log("currentTime:", currentTime);
            console.log("input.value:", input.value);
            // input.value = selectedTime
            // let timeOnly = selectedTime.slice(11, 16);
            clock.textContent = currentTime;
            if (currentTime === input.value + ":00") {
                playAlarm();
            }
        }, 1000);      
    }
});

function playAlarm() {
    let audio = new Audio('Wake up to reality.mp3');
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });
    Swal.fire({
        title: 'Wake up!',
        text: 'Time to get up!',
        imageUrl: './img/alarm-clock.gif',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Alarm Clock',
        onClose: () => {
            clearInterval(intervalId);
            resetAlarm();
        }
    });
}


function resetAlarm() {
    input.value = "";
    clock.textContent = "00:00:00";
    intervalId = null;
}

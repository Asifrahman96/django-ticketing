function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + "" + seconds;

        if (--timer < 0) {
            timer = duration;
        } else if (timer == 0) {
            window.location.href = "/timeout";
        }
        //   console.log(parseInt(seconds))
        window.localStorage.setItem("seconds", seconds)
        window.localStorage.setItem("minutes", minutes)
    }, 1000);
}

window.onload = function () {
    sec = parseInt(window.localStorage.getItem("seconds"))
    min = parseInt(window.localStorage.getItem("minutes"))

    if (parseInt(min * sec)) {
        var fiveMinutes = (parseInt(min * 60) + sec);
    } else {
        var fiveMinutes = 60 * 10;
    }
    // var fiveMinutes = 60 * 5;
    display = document.querySelector('#countdown');
    startTimer(fiveMinutes, display);
};
    
// const startingMinutes = 5;
// let time = startingMinutes * 60;

// const countdownEl = document.getElementById('countdown');

// setInterval(updateCountdown, 1000);

// function updateCountdown(){
//     const minutes = Math.floor(time / 60);
//     let seconds = time % 60;

//     seconds = seconds < 10 ? '0' + seconds : seconds;

//     countdownEl.innerHTML = `${minutes}:${seconds}`;
//     time--;
// }

// function start() {
//     startTime = parseInt(localStorage.getItem('startTime') || Date.now());
//     localStorage.setItem('startTime', startTime);
//     timer = setInterval(clockTick, 100);
//   }


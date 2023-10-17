arrowKeyDown = false;

function logTime() {
  if (arrowKeyDown === false) {
    getCurrentTime();
  }

  currentHourInTwelveHourFormat = currentHour % 12 || 12;
  currentMeridiem = currentHour >= 12 ? "PM" : "AM";

  currentTimeInSecs =
    currentHour * 60 ** 2 + currentMinute * 60 + currentSecond;
  currentTimeInHours = currentTimeInSecs / 60 ** 2;

  hourDisp.textContent = currentHourInTwelveHourFormat;
  meridiemDisp.textContent = currentMeridiem;

  if (!arrowKeyDown) {
    minAndSecDisp.textContent = `${formatTimeLengthTwo(
      currentMinute
    )}:${formatTimeLengthTwo(currentSecond)}`;
    msDisp.textContent = formatTimeLengthThree(currentMs);
  } else {
    minAndSecDisp.textContent = `${formatTimeLengthTwo(currentMinute)}:00`;
    msDisp.textContent = "000";
  }

  if (currentHour >= 6 && currentHour < 18) {
    sunAndMoonDisp.style.bottom =
      currentHour > 12
        ? ((currentTimeInHours - 12 - 6) * -1 - 19) * 10 + "px"
        : (currentTimeInHours - 25) * 10 + "px";
    sunAndMoonDisp.classList.remove("moon");
    sunAndMoonDisp.classList.add("sun");
  } else {
    sunAndMoonDisp.style.bottom =
      currentHour >= 0 && currentHour < 6
        ? ((currentTimeInHours - 6) * -1 - 19) * 10 + "px"
        : (currentTimeInHours - 12 - 25) * 10 + "px";
    sunAndMoonDisp.classList.remove("sun");
    sunAndMoonDisp.classList.add("moon");
  }
}

function getCurrentTime() {
  currentTime = new Date();
  currentHour = currentTime.getHours();
  currentMinute = currentTime.getMinutes();
  currentSecond = currentTime.getSeconds();
  currentMs = currentTime.getMilliseconds();
}

function formatTimeLengthTwo(input) {
  if (input < 10) {
    return "0" + input;
  }
  return input;
}

function formatTimeLengthThree(input) {
  if (input < 10) {
    return "00" + input;
  } else if (input < 100) {
    return "0" + input;
  }
  return input;
}

window.addEventListener("keydown", (e) => {
  currentSecond = 0;
  currentMs = 0;
  if (e.key === "ArrowUp") {
    arrowKeyDown = true;
    if (currentHour >= 24) {
      currentHour = 0;
    } else if (currentMinute >= 59) {
      currentHour++;
      currentMinute = 0;
    } else {
      currentMinute++;
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    getCurrentTime();

    setTimeout(() => {
      arrowKeyDown = false;
    }, 1000);
  }
});

setInterval(logTime, 1);

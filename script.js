// Variable declarations
let selectInput = document.querySelector('.select-input');
let labelHour = document.querySelector('.hour');
let labelMinute = document.querySelector('.minute');
let labelSecond = document.querySelector('.second');
let index = 0;
let arrayTimezones = [];

// Function declarations

// Fetch available timezones from the API
async function fetchArrayTimezones() {
  const APIResponse = await fetch(`https://timeapi.io/api/TimeZone/AvailableTimeZones`);

  if (APIResponse.status == 200) {
    const timezones = await APIResponse.json();
    arrayTimezones = timezones;
    addItems();
  }
}

// Fetch current time for the selected timezone
async function fetchTimezone(timezone) {
  const APIResponse = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${timezone}`);

  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
}

// Update time when timezone selection changes
async function realTime() {
  if (index != 0) {
    selectedTimezone = selectInput[index].value;
    const data = await fetchTimezone(selectedTimezone);
    labelHour.innerHTML = data.hour;
    labelMinute.innerHTML = data.minute;
    labelSecond.innerHTML = data.seconds;
  } else {
    labelHour.innerHTML = '00';
    labelMinute.innerHTML = '00';
    labelSecond.innerHTML = '00';
  }
}

// Add items to the select dropdown
function addItems() {
  for (let i = 0; i < arrayTimezones.length; i++) {
    let newElement = document.createElement('option');
    newElement.textContent = arrayTimezones[i];
    newElement.value = arrayTimezones[i];
    selectInput.appendChild(newElement);
  }
}

// Event listener for timezone selection change
selectInput.addEventListener('change', () => {
  index = selectInput.selectedIndex;
  realTime();
});

// Initial fetch of available timezones
fetchArrayTimezones();

setInterval(realTime, 1000);



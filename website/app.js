/* Global Variables */

const apiKey = "&appid=b4bb1f5cc6b0e8391e207625a3fd655d&units=metric";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// make a GET request to the OpenWeatherMap API.

const makeGet = async (url = "", zip = "", key = "") => {
  const api = await fetch(url + zip + key);
  return await api.json();
};

// Post Request to save object
const makePost = async (path = "", data = {}) => {
  try {
    await fetch(path, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  } catch (error) {
    console.log("error", error);
  }
};

// Updating the UI
const updateUI = async () => {
  try {
    const res = await fetch("/getAll");

    const responseData = await res.json();

    document.getElementById("date").innerHTML = responseData.date;
    document.getElementById("temp").innerHTML =
      Math.round(responseData.temperature) + "degrees";
    document.getElementById("content").innerHTML = responseData.userResponse;
  } catch (error) {
    console.log(error);
  }
};

// callback function to call async GET request with the parameters:
// base url
// user entered zip code (see input in html with id zip)
// personal API key
const performAction = () => {
  const zip = document.getElementById("zip").value;

  makeGet(baseUrl, zip, apiKey).then((data) => {
    const feelings = document.getElementById("feelings").value;
    makePost("/createData", {
      temperature: data.main.temp,
      date: newDate,
      userResponse: feelings,
    }).then(updateUI());
  });
};

// Create an event listener for the element with the id:
// generate, with a callback function to execute when it is clicked.
document.getElementById("generate").addEventListener("click", performAction);

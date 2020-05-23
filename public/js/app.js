console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const address = document.querySelector("input");

const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  message1.textContent = `Loading...`;
  fetch(`http://localhost:3002/weather?location=${address.value}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log("Error:", data.error);
          message1.textContent = `Something went wrong`;
        } else {
          message1.textContent = `It is  ${data.temperature}f and ${data.weather_descriptions[0]}.`;
        }
      });
    })
    .catch((error) => {
      message1.textContent = `Something went wrong`;
      console.log("Error in fetch", error);
    });
});

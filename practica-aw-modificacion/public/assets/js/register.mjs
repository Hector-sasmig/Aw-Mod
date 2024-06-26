import * as rest_api from "./modules/rest-api.mjs";

const registerHandler = async (event) => {
  event.preventDefault();
  const dataForm = new FormData(event.target)
  try {
    const response = await rest_api.registerUser(dataForm)
    const data = await response.json();
    if(!response.ok) {
      throw new Error(data.message)
    }
    window.location.replace('/')
  } catch(error) {
    alert(error.message)
  }
};

document.querySelector('form').addEventListener('submit', registerHandler);

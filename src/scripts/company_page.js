import { getEntryElement } from "./elements_helper.js"
var origin = "127.0.0.1:8082"
var url = `http://${origin}`

function config() {
  data = JSON.parse(localStorage.getItem("pageData"))
  console.log(data)
}

async function generateEmployeeElements() {
  let response = await fetchEmployees()
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  companies = await response.json()
  console.log(companies)
  let compContainer = document.getElementById("employees_container")
  let entry = await getEntryElement()
  companies.forEach(el => {
    let detailsEl = entry.clone()
    let titleEl = detailsEl.getElement
    let infoBtn = document.createElement("button", 
      { 
        type: "button", 
      })
    let deleteBtn = document.createElement("button", { type: "button", })

    infoBtn.innerText = "More Info"
    deleteBtn.innerText = "Delete"

    infoBtn.addEventListener("click", onMoreInfo)
    deleteBtn.addEventListener("click", onDeleteCompany)

    infoBtn.data = el
    deleteBtn.data = el

    titleEl.innerHTML = el.name
    detailsEl.innerHTML = el.description

    detailsEl.appendChild(titleEl)
    detailsEl.appendChild(infoBtn)
    detailsEl.appendChild(deleteBtn)

    compContainer.appendChild(detailsEl)
  });
}

function fetchEmployees() {
  return fetch(`${url}/companies/${data.id}/employees`)
  .then((x) => x.json())
  .then((x) => console.log(x))
}

console.log(test)
config()
generateEmployeeElements()
import { isValidTextInput } from "./inputs_helper.js"

var origin = "127.0.0.1:8082"
var url = `http://${origin}`
localStorage.setItem("url", url)

async function generateEmployeeElements() {
  let response = await fetchCompanies()
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  let companies = await response.json()
  console.log(companies)
  let compContainer = document.getElementById("companies_container")
  companies.forEach(el => {
    let detailsEl = document.createElement("details")
    let titleEl = document.createElement("summary")
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

async function fetchCompanies() {
  return await fetch(`${url}/companies`);
}

function onPostCompany() {
  let name = document.getElementById("name-field")
  let desc = document.getElementById("desc-field")
  
  // Validation
  if (!isValidTextInput(name.value)) {
    alert(`Invalid information: ${name.name}`)
    return
  }

  if (!isValidTextInput(desc.value)) {
    alert(`Invalid information: ${desc.name}`)
    return
  }
  
  fetch(url + "/companies", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      description: desc.value
    })
  })
  .then(x => {
    if (!x.ok) {
      throw new Error(`Response status: ${x.status}`);
    }
    return x.json()
  })
  .then(() => {
    name.value = ""
    desc.value = ""
    generateEmployeeElements()
  })
  .catch(err => { console.log(err) })
}

function onDeleteCompany(obj) {
  console.log(obj.currentTarget.data)
  fetch(url + "/companies", {
    method: "DELETE",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj.currentTarget.data)
  })
  .then(x => x.json())
  .catch(err => { console.log(err) })
}

function onMoreInfo(obj) {
  let data = obj.currentTarget.data
  console.log(data)
  localStorage.setItem("pageData", JSON.stringify(data))
  location.href="/src/pages/company_page.html"
}

document.getElementById("companyForm").addEventListener("submit", (e) => {
  e.preventDefault()
  onPostCompany()
})

generateEmployeeElements()
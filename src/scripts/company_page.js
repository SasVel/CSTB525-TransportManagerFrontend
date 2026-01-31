import { getEntryElement } from "./elements_helper.js"

var origin = "127.0.0.1:8082"
var url = `http://${origin}`
var data

function config() {
  data = JSON.parse(localStorage.getItem("pageData"))
  console.log(data)
  let title = `Company Page - ${data.name}`
  document.title = title
  document.getElementById("body-title").innerText = title
}

// ========== EMPLOYEES ==========
async function generateEmployeeElements() {
  let response = await fetchEmployees()
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  let employees = await response.json()
  console.log(employees)
  let empContainer = document.getElementById("employees_container")
  empContainer.innerHTML = ""
  
  let entry = await getEntryElement()
  employees.forEach(el => {
    let detailsEl = entry.cloneNode(true)
    let summaryEl = detailsEl.querySelector("summary")
    
    let infoBtn = document.createElement("button")
    let deleteBtn = document.createElement("button")

    infoBtn.innerText = "More Info"
    infoBtn.type = "button"
    deleteBtn.innerText = "Delete"
    deleteBtn.type = "button"

    infoBtn.addEventListener("click", onMoreInfoEmployee)
    deleteBtn.addEventListener("click", onDeleteEmployee)

    infoBtn.data = el
    deleteBtn.data = el

    summaryEl.innerHTML = el.name

    detailsEl.appendChild(infoBtn)
    detailsEl.appendChild(deleteBtn)

    empContainer.appendChild(detailsEl)
  });
}

function fetchEmployees() {
  return fetch(`${url}/companies/${data.id}/employees`)
}

function onDeleteEmployee(obj) {
  console.log(obj.currentTarget.data)
  fetch(url + `/companies/${data.id}/employees`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj.currentTarget.data)
  })
  .then(x => x.json())
  .then(() => generateEmployeeElements())
  .catch(err => { console.log(err) })
}

function onMoreInfoEmployee(obj) {
  let empData = obj.currentTarget.data
  console.log(empData)
  localStorage.setItem("employeeData", JSON.stringify(empData))
}

function onPostEmployee() {
  let name = document.getElementById("empName")
  let position = document.getElementById("empPosition")
  let salary = document.getElementById("empSalary")
  fetch(url + `/companies/${data.id}/employees`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      position: position.value,
      salary: parseFloat(salary.value)
    })
  })
  .then(x => x.json())
  .then(() => {
    name.value = ""
    position.value = ""
    salary.value = ""
    generateEmployeeElements()
  })
  .catch(err => { console.log(err) })
}

// ========== INQUIRIES ==========
async function generateInquiriesElements() {
  let response = await fetchInquiries()
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  let inquiries = await response.json()
  console.log(inquiries)
  let inquContainer = document.getElementById("inquiries_container")
  inquContainer.innerHTML = ""
  
  let entry = await getEntryElement()
  inquiries.forEach(el => {
    let detailsEl = entry.cloneNode(true)
    let summaryEl = detailsEl.querySelector("summary")
    
    let infoBtn = document.createElement("button")
    let deleteBtn = document.createElement("button")

    infoBtn.innerText = "More Info"
    infoBtn.type = "button"
    deleteBtn.innerText = "Delete"
    deleteBtn.type = "button"

    infoBtn.addEventListener("click", onMoreInfoInquiry)
    deleteBtn.addEventListener("click", onDeleteInquiry)

    infoBtn.data = el
    deleteBtn.data = el

    summaryEl.innerHTML = el.name

    detailsEl.appendChild(infoBtn)
    detailsEl.appendChild(deleteBtn)

    inquContainer.appendChild(detailsEl)
  });
}

function fetchInquiries() {
  return fetch(`${url}/companies/${data.id}/inquiries`)
}

function onDeleteInquiry(obj) {
  console.log(obj.currentTarget.data)
  fetch(url + `/companies/${data.id}/inquiries`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj.currentTarget.data)
  })
  .then(x => x.json())
  .then(() => generateInquiriesElements())
  .catch(err => { console.log(err) })
}

function onMoreInfoInquiry(obj) {
  let inquiryData = obj.currentTarget.data
  console.log(inquiryData)
  localStorage.setItem("inquiryData", JSON.stringify(inquiryData))
}

function onPostInquiry() {
  let name = document.getElementById("inquiryName")
  let email = document.getElementById("inquiryEmail")
  let details = document.getElementById("inquiryDetails")
  let origin = document.getElementById("inquiryOrigin")
  let destination = document.getElementById("inquiryDestination")
  let departure = document.getElementById("inquiryDeparture")
  let arrival = document.getElementById("inquiryArrival")
  let cost = document.getElementById("inquiryCost")
  let cargoAmount = document.getElementById("inquiryCargoAmount")
  fetch(url + `/companies/${data.id}/inquiries`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      details: details.value,
      origin: origin.value,
      destination: destination.value,
      departure: departure.value,
      arrival: arrival.value,
      cost: parseFloat(cost.value),
      cargoAmount: parseFloat(cargoAmount.value)
    })
  })
  .then(x => x.json())
  .then(() => {
    name.value = ""
    email.value = ""
    details.value = ""
    origin.value = ""
    destination.value = ""
    departure.value = ""
    arrival.value = ""
    cost.value = ""
    cargoAmount.value = ""
    generateInquiriesElements()
  })
  .catch(err => { console.log(err) })
}

// ========== VEHICLES ==========
async function generateVehiclesElements() {
  let response = await fetchVehicles()
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  let vehicles = await response.json()
  console.log(vehicles)
  let vehiclesContainer = document.getElementById("vehicles_container")
  vehiclesContainer.innerHTML = ""
  
  let entry = await getEntryElement()
  vehicles.forEach(el => {
    let detailsEl = entry.cloneNode(true)
    let summaryEl = detailsEl.querySelector("summary")
    
    let infoBtn = document.createElement("button")
    let deleteBtn = document.createElement("button")

    infoBtn.innerText = "More Info"
    infoBtn.type = "button"
    deleteBtn.innerText = "Delete"
    deleteBtn.type = "button"

    infoBtn.addEventListener("click", onMoreInfoVehicle)
    deleteBtn.addEventListener("click", onDeleteVehicle)

    infoBtn.data = el
    deleteBtn.data = el

    summaryEl.innerHTML = el.model

    detailsEl.appendChild(infoBtn)
    detailsEl.appendChild(deleteBtn)

    vehiclesContainer.appendChild(detailsEl)
  });
}

function fetchVehicles() {
  return fetch(`${url}/companies/${data.id}/vehicles`)
}

function onDeleteVehicle(obj) {
  console.log(obj.currentTarget.data)
  fetch(url + `/companies/${data.id}/vehicles`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj.currentTarget.data)
  })
  .then(x => x.json())
  .then(() => generateVehiclesElements())
  .catch(err => { console.log(err) })
}

function onMoreInfoVehicle(obj) {
  let vehicleData = obj.currentTarget.data
  console.log(vehicleData)
  localStorage.setItem("vehicleData", JSON.stringify(vehicleData))
}

function onPostVehicle() {
  let name = document.getElementById("vehicleName")
  let type = document.getElementById("vehicleType")
  let model = document.getElementById("vehicleModel")
  let capacity = document.getElementById("vehicleCapacity")
  let maxLoad = document.getElementById("vehicleMaxLoad")
  fetch(url + `/companies/${data.id}/vehicles`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      type: type.value,
      model: model.value,
      capacity: parseFloat(capacity.value),
      maxLoad: parseFloat(maxLoad.value)
    })
  })
  .then(x => x.json())
  .then(() => {
    name.value = ""
    type.value = ""
    model.value = ""
    capacity.value = ""
    maxLoad.value = ""
    generateVehiclesElements()
  })
  .catch(err => { console.log(err) })
}

// ========== INITIALIZATION ==========
config()
generateEmployeeElements()
generateInquiriesElements()
generateVehiclesElements()

// Attach form submit handlers
document.getElementById("employeeForm").addEventListener("submit", (e) => {
  e.preventDefault()
  onPostEmployee()
})

document.getElementById("inquiryForm").addEventListener("submit", (e) => {
  e.preventDefault()
  onPostInquiry()
})

document.getElementById("vehicleForm").addEventListener("submit", (e) => {
  e.preventDefault()
  onPostVehicle()
})
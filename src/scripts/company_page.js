import { getEntryElement, isValidTextInput, isValidNumberInput, isValidDate } from "./inputs_helper.js"

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
    
    //table stuff
    let table = document.createElement("table")
    
    let nameRow = table.insertRow()
    nameRow.insertCell().innerText = "Name"
    nameRow.insertCell().innerText = el.name

    let positionRow = table.insertRow()
    positionRow.insertCell().innerText = "Position"
    positionRow.insertCell().innerText = el.position

    let salaryRow = table.insertRow()
    salaryRow.insertCell().innerText = "Salary"
    salaryRow.insertCell().innerText = el.salary

    let deleteBtn = document.createElement("button")

    deleteBtn.innerText = "Delete"
    deleteBtn.type = "button"

    deleteBtn.addEventListener("click", onDeleteEmployee)

    deleteBtn.data = el

    summaryEl.innerHTML = el.name

    detailsEl.appendChild(table)
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

function onPostEmployee() {
  const form = document.getElementById("employeeForm")
  const name = form.elements.empName
  const position = form.elements.empPosition
  const salary = form.elements.empSalary
  
  // Validation
  if (!isValidTextInput(name.value)) {
    alert(`Invalid information: ${name.name}`)
    return
  }
  if (!isValidTextInput(position.value)) {
    alert(`Invalid information: ${position.name}`)
    return
  }
  if (!isValidNumberInput(salary.value)) {
    alert(`Invalid information: ${salary.name}`)
    return
  }
  
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
    
    let table = document.createElement("table")
    table.border = "1"
    for (let i = 0; i < 4; i++) {
      let row = table.insertRow()
      row.insertCell()
      row.insertCell()
    }
    
    let deleteBtn = document.createElement("button")

    deleteBtn.innerText = "Delete"
    deleteBtn.type = "button"

    deleteBtn.addEventListener("click", onDeleteInquiry)

    deleteBtn.data = el

    summaryEl.innerHTML = el.name

    detailsEl.appendChild(table)
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

function onPostInquiry() {
  const form = document.getElementById("inquiryForm")
  const name = form.elements.inquiryName
  const email = form.elements.inquiryEmail
  const details = form.elements.inquiryDetails
  const origin = form.elements.inquiryOrigin
  const destination = form.elements.inquiryDestination
  const departure = form.elements.inquiryDeparture
  const arrival = form.elements.inquiryArrival
  const cost = form.elements.inquiryCost
  const cargoAmount = form.elements.inquiryCargoAmount
  
  // Validation
  if (!isValidTextInput(name.value)) {
    alert(`Invalid information: ${origin.name}`)
    return
  }
  if (!isValidTextInput(destination.value)) {
    alert(`Invalid information: ${destination.name}`)
    return
  }
  if (!isValidDate(departure.value)) {
    alert(`Invalid information: ${departure.name}`)
    return
  }
  if (!isValidDate(arrival.value)) {
    alert(`Invalid information: ${arrival.name}`)
    return
  }
  if (!isValidNumberInput(cost.value)) {
    alert(`Invalid information: ${cost.name}`)
    return
  }
  if (!isValidNumberInput(cargoAmount.value)) {
    alert(`Invalid information: ${cargoAmount.name}`)
    return
  }
  
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
    
    //table stuff
    let table = document.createElement("table")
    
    let nameRow = table.insertRow()
    nameRow.insertCell().innerText = "Model"
    nameRow.insertCell().innerText = el.model
    
    let typeRow = table.insertRow()
    typeRow.insertCell().innerText = "Type"
    typeRow.insertCell().innerText = el.type

    let capacityRow = table.insertRow()
    capacityRow.insertCell().innerText = "Capacity"
    capacityRow.insertCell().innerText = el.capacity

    let maxLoadRow = table.insertRow()
    maxLoadRow.insertCell().innerText = "Max Load"
    maxLoadRow.insertCell().innerText = el.maxLoad
    
    let deleteBtn = document.createElement("button")

    deleteBtn.innerText = "Delete"
    deleteBtn.type = "button"

    deleteBtn.addEventListener("click", onDeleteVehicle)

    deleteBtn.data = el

    summaryEl.innerHTML = el.model

    detailsEl.appendChild(table)
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

function onPostVehicle() {
  const form = document.getElementById("vehicleForm")
  const name = form.elements.vehicleName
  const type = form.elements.vehicleType
  const model = form.elements.vehicleModel
  const capacity = form.elements.vehicleCapacity
  const maxLoad = form.elements.vehicleMaxLoad
  
  // Validation
  if (!isValidTextInput(name.value)) {
    alert(`Invalid information: ${type.name}`)
    return
  }
  if (!isValidTextInput(model.value)) {
    alert(`Invalid information: ${model.name}`)
    return
  }
  if (!isValidNumberInput(capacity.value)) {
    alert(`Invalid information: ${capacity.name}`)
    return
  }
  if (!isValidNumberInput(maxLoad.value)) {
    alert(`Invalid information: ${maxLoad.name}`)
    return
  }
  
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

config()
generateEmployeeElements()
generateInquiriesElements()
generateVehiclesElements()
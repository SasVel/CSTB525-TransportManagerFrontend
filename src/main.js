var origin = "127.0.0.1:8082"
var url = `http://${origin}`


function fetchClients() {
  return fetch(`${url}/clients`)
  .then((x) => x.json())
  .then((x) => console.log(x))
}

function fetchClient(id) {
  return fetch(`${url}/clients/${id}`)
  .then((x) => x.json())
  .then((x) => console.log(x))
}

fetchClient(1)
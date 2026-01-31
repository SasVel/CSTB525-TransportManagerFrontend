
function isValidTextInput(str) {
  const validPattern = /^[a-zA-Z]*$/
  return validPattern.test(str)
}

function isValidNumberInput(str) {
  const validPattern = /^[0-9]*$/
  return validPattern.test(str)
}

function isValidDate(str) {
  const date = new Date(str)
  return date instanceof Date && !isNaN(date)
}

async function getEntryElement() {
    let response = await fetch("/src/page_components/entry.html")
    let html = await response.text()
    let parser = new DOMParser()
    let doc = parser.parseFromString(html, "text/html")
    return doc.body.firstChild.cloneNode(true)
}

export { getEntryElement, isValidTextInput, isValidNumberInput, isValidDate }

async function getEntryElement() {
    let response = await fetch("/src/page_components/entry.html")
    let html = await response.text()
    let parser = new DOMParser()
    let doc = parser.parseFromString(html, "text/html")
    return doc.body.firstChild.cloneNode(true)
}


export { getEntryElement }

async function getEntryElement() {
    let comp = await fetch("/src/page_components/entry.html")
    return comp
}


export { getEntryElement }
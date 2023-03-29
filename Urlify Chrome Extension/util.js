let myLeads = []

const inputEl = document.getElementById('input-el')
const listEl = document.getElementById('list-el')

const saveBtn = document.getElementById('save-btn')
const tabBtn = document.getElementById('tab-btn')
const deleteBtn = document.getElementById('delete-btn')

const tempLeads = localStorage.getItem('myLeads')

if(tempLeads) {
    myLeads = JSON.parse(tempLeads)
    render()
}

saveBtn.addEventListener('click', function() {
    myLeads.push(inputEl.value)
    inputEl.value = ''
    
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    
    render()
})

tabBtn.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url)
    
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
    
        render()
    })
})

deleteBtn.addEventListener('click', function() {
    localStorage.clear()
    myLeads = []

    render()
})

function render() {
    let listItems = ''
    
    for(let i = 0; i < myLeads.length; i++) {
        listItems += `<li>
           📍 <a href = '${myLeads[i]}' target = '_blank'>${myLeads[i]}</a>
        </li>`
    }
    
    listEl.innerHTML = listItems
}
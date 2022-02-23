//elements from the DOM
const inputBtn = document.getElementById("input-btn-el");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const clearBtn = document.getElementById("clear-btn-el");
const tabBtn = document.getElementById("tab-btn-el");

let myLeads = [];

window.addEventListener("load", (event) => {
    myLeads = getStoredLeads();
    render(myLeads);
})

clearBtn.addEventListener("click", function () {
    localStorage.clear();
    myLeads = [];
    ulEl.innerHTML = "";
})


inputBtn.addEventListener("click", function() {
        if(!inputEl.value) {
            alert("The input field is empty!");
        }
        else {
            myLeads.push(inputEl.value);
            inputEl.value = "";
            saveLeadsToStorage(myLeads);
            render(getStoredLeads());
        }
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        saveLeadsToStorage(myLeads);
        render(getStoredLeads());
    })
})

function removeLead(lead) {
    let arrOfLeads = [];
    arrOfLeads = Array.from(JSON.parse(localStorage.getItem("leads")));
    let index = arrOfLeads.indexOf(lead);
    arrOfLeads.splice(index, 1);
    myLeads = arrOfLeads;
    saveLeadsToStorage(myLeads);
    render(getStoredLeads());
}

function render(array){
    let listItems = "";

    if (!array) {
        ulEl.innerHTML = listItems;
    }
    else{
        for(let i = 0; i < array.length; i++){
            listItems += `<li>
                            <a target="_blank" href="${array[i]}">
                            ${array[i]}
                            </a><img id="delete-button-${i}" class="delete-button" src="/Images/exit.svg" alt="delete button">
                            </li>`;
        }
        ulEl.innerHTML = listItems;
        const deleteBtns = document.getElementsByClassName("delete-button");
        for(let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", function() {
                removeLead(array[i]);
            })
        }
    }
}

function getStoredLeads() {
    let leads = [];
    if(JSON.parse(localStorage.getItem("leads"))){
        leads = JSON.parse(localStorage.getItem("leads"));
        return leads;
    }
    else {
        return leads;
    }
}

function saveLeadsToStorage(arrayToStore){
    localStorage.setItem("leads", JSON.stringify(arrayToStore));
}
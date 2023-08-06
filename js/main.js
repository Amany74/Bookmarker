// Get input tages and btns 
let siteName = document.querySelector("#siteName");
let siteUrl = document.querySelector("#siteUrl");

// Btns
let submitBtn = document.querySelector("#submitBtn");
let visitBtn = document.querySelector("#visitBtn");
let deleteBtn = document.querySelector("#deleteBtn");

// toggle rules
let rules_url = document.querySelector("#urlValidation");
// console.log(rules_url)



// Check if we have values in local storage list 
if (localStorage.getItem('sitesList') == null) {
    sitesList = []

}else{
    sitesList = JSON.parse(localStorage.getItem('sitesList'));
    DisplaySites(sitesList);
}


// Submit to sitesList
submitBtn.addEventListener("click", function(){

    if(siteUrl.classList.contains('is-invalid')){
        rules_url.classList.remove("d-none");
        return;
    }

    
    if(!siteUrl.classList.contains('is-invalid')&& siteUrl.value.length !="" && siteName.value.length !="" && !siteName.classList.contains('is-invalid')){
        
        let site ={
            name: siteName.value,
            url:siteUrl.value,
        }    
    
        sitesList.push(site);
        localStorage.setItem('sitesList', JSON.stringify(sitesList));
        DisplaySites(sitesList);
        clear();
    }    

});



// Display sites from siteList
function DisplaySites (sitesList){
    let res="" ;
    for (const [index,site] of sitesList.entries()){

        res += `
            <tr>
            <th scope="row">${index+1}</th>
            <td>${site.name}</td>
            <td>
                <button  onclick="window.open('${site.url}')" class="btn btn-warning">
                    Visit
                </Button>
            </td>
            <td> <button id="deleteBtn" onclick="deleteSite(${index})" class="btn btn-danger">
                delete
            </Button>
        </td>
            </tr>`
    }

    // add the whole div to the ui
    
// Container to append table with
let container = document.querySelector("#cont") 
    container.innerHTML = res;
};



// Clear values
let clear = function () {
    siteName.value = ""
    siteUrl.value = ""
}

// Delet site from list 
function deleteSite(i){
    sitesList.splice(i,1);
    localStorage.setItem('sitesList', JSON.stringify(sitesList));
    DisplaySites(sitesList);

}


// Get names to loop on and check
let names = sitesList.map(check);
function check(site) {
    return  site.name
}


// Check duplicate naming
let checkName = function(key){
    let c = (names.indexOf(key) > -1 );
    if(!c){
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");

    }else{
        siteName.classList.add("is-invalid");
    }

}



// Validate Url  name , domain , path and protocol

// Simple check using Url 
// function checkUrl(url){
//     let givenURL;
//     try {
//         givenURL = new URL(url);
//     } catch (error) {
//         // console.log("Error:", error);
//         return false;
//     }
//     return true;
// }
function checkUrl(url) {
    // Validate the URL format
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[^\s]*)?$/;
    if (!urlRegex.test(url)) {
    return false;
}

// Validate the protocol (http or https)
const protocolRegex = /^https?:\/\//;
if (!protocolRegex.test(url)) {
    return false;
}

// Validate the domain name
const domainRegex = /^https?:\/\/([^\s.]+\.[^\s]{2,}|localhost)(\/[^\s]*)?$/;
if (!domainRegex.test(url)) {
    return false;
}

// Validate the path (if present)
const pathRegex = /^https?:\/\/([^\s.]+\.[^\s]{2,}|localhost)(\/[^\s]*)$/;
if (url.includes("/") && !pathRegex.test(url)) {
    return false;
}

return true;
}

function urlValidation(url){

    if(checkUrl(url)) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
    } else {
        siteUrl.classList.add("is-invalid");
    }
}

// D-none when clicking on an empty area
// He done reading rules
rules_url.addEventListener('click',function(){
    rules_url.classList.add("d-none");
});

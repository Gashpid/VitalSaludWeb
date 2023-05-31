var urltest = "https://heartmonitoring.pythonanywhere.com/insert_into_table"

function TestRates(){


    var user = sessionStorage.getItem("useruuid")
    var HR = document.getElementById("inputHR").value;
    var PS = document.getElementById("inputPS").value;
    var PD = document.getElementById("inputPD").value;

    fetch(urltest, {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ 
            'table': 'htadata',
            'values': "'"+user+"','"+HR+"','"+PS+"','"+PD+"','"+Date().toLocaleString()+"'"
         })
    })
   .then(response => response.json())
   .then(response => {
    console.log(response)
    var Auth = JSON.stringify(response)
    if(Auth.includes(true)){
        //window.location.href = "login.html"
    }
   })
   
}
var urlSignUp = "https://heartmonitoring.pythonanywhere.com/insert_into_table"
var urlLogIn = "https://heartmonitoring.pythonanywhere.com/select_from_table"
var email_session = ''
var user_session = ''


function LogIn(){
    var user = document.getElementById("getUsername").value;
    var pswd = document.getElementById("getPassword").value;

    fetch(urlLogIn, {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ 
            'table': 'users',
            'arg': '*',
            'condition': "WHERE name = '"+user+"' AND pswd = '"+pswd+"'"
         })
    })
   .then(response => response.json())
   .then(response => {
    var Auth = JSON.stringify(response)
    if(user!='' && pswd != ''){
        if(Auth.includes(user) && Auth.includes(pswd)){
            sessionStorage.setItem("useruuid", user)
            sessionStorage.setItem("emailuuid",response.Response[0][0][2])
            window.location.href = "index.html"
        }
    }
   })
}

function SignUp(){
    var user = document.getElementById("setName").value;
    var email = document.getElementById("setEmail").value;
    var phone = document.getElementById("setPhone").value;
    var pswd = document.getElementById("setPassword").value;

    fetch(urlSignUp, {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ 
            'table': 'users',
            'values': "'"+user+"','"+email+"','"+phone+"','"+pswd+"'"
         })
    })
   .then(response => response.json())
   .then(response => {
    console.log(response)
    var Auth = JSON.stringify(response)
    if(Auth.includes(true)){
        window.location.href = "login.html"
    }
   })
   
}
var urldata = "https://heartmonitoring.pythonanywhere.com/select_from_table";
var Data = null;
let ID = Array();
let HR = Array();
let PS = Array();
let PD = Array();
let DT = Array();

function ReloadDataTable(){
	replaceHTML("nameUser",sessionStorage.getItem("useruuid"),true)
	replaceHTML("emailUser",sessionStorage.getItem("emailuuid"),true)

	if(sessionStorage.getItem("useruuid") != "" && sessionStorage.getItem("useruuid") != null){
		fetch(urldata, {
			method: 'POST',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({ 
				'table': 'htadata',
				'arg': '*',
				'condition': "WHERE name = '"+sessionStorage.getItem("useruuid")+"'"
			})
		})
		.then(response => response.json())
		.then(response => { Data = response.Response[0]})
		.then(_ => {
            try {
                for(i=0; i<= Data.length; i++){
                    addRow(i,Data[i][2],Data[i][3],Data[i][1],Data[i][4])
                }
            } catch (error) {console.error(error);}		
		})
    }
}

function replaceHTML(id,value,status){
	if(status == true){ document.getElementById(id).innerHTML = value }
	else{ document.getElementById(id).style=value;}
}

function addRow(id,ps,pd,hr,dt){
    var tbodyRef = document.getElementById('tableData').getElementsByTagName('tbody')[0];
    var newRow = tbodyRef.insertRow();
    var idCell = newRow.insertCell();
    var psCell = newRow.insertCell();
    var pdCell = newRow.insertCell();
    var hrCell = newRow.insertCell();
    var dtCell = newRow.insertCell();

    idCell.appendChild(document.createTextNode(id));
    psCell.appendChild(document.createTextNode(ps));
    pdCell.appendChild(document.createTextNode(pd));
    hrCell.appendChild(document.createTextNode(hr));
    dtCell.appendChild(document.createTextNode(dt));
}
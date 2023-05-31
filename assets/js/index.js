var urldelete = "https://heartmonitoring.pythonanywhere.com/delete_from_table";
var urldata = "https://heartmonitoring.pythonanywhere.com/select_from_table";
var Data = null;
let LB = Array();
let HR = Array();
let PS = Array();
let PD = Array();

let len = 0;

let HT = null

setTimeout(function next() {

	ReloadData()

    setTimeout(next, 30000);

}, 30000);

function AlertSW(message){
	Swal.fire(message)
}
function ReloadData(){
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
			if(Data.length > len){
				HR = Array();
				PS = Array();
				PD = Array();
				LB = Array();
				try {
					for(i=0; i<= Data.length; i++){
						HR.push(Data[i][1])
						PS.push(Data[i][2])
						PD.push(Data[i][3])
						str2int()
						LB.push('')
					}
				} catch (error) {console.log(error);}

				console.log(ArrayAvg(PS),ArrayAvg(PD))
		
				if(ArrayAvg(PS) >= 90 && ArrayAvg(PS) <= 139){
					if(ArrayAvg(PD) >= 60 && ArrayAvg(PD) <= 89){
						let percert = ArrayAvg([(9000)/ArrayAvg(PS), (6000)/ArrayAvg(PD)])
						replaceHTML("percetHP","width: "+percert+"%",false)
						replaceHTML("ESTADIO","NORMAL",true)
						AlertSW("Estadio: NORMAL\n"+percert.toFixed(2)+"%")
					}
					else{
						let percert = ArrayAvg([(9000)/ArrayAvg(PS), (6000)/ArrayAvg(PD)])
						replaceHTML("percetHP","width: "+percert+"%",false)
						replaceHTML("ESTADIO","NORMAL",true)
						AlertSW("Estadio: SEMI-NORMAL\nPlease check yor diastolic pressure, your mean is elevate for normal state")
					}
				}
				else if(ArrayAvg(PS) >= 140 && ArrayAvg(PS) <= 159){
					if(ArrayAvg(PD) >= 90 && ArrayAvg(PD) <= 99){
						let percert = ArrayAvg([(14000)/ArrayAvg(PS), (9000)/ArrayAvg(PD)])
						console.log(ArrayAvg(PS),ArrayAvg(PD))
						replaceHTML("percetHP","width: "+percert+"%",false)
						replaceHTML("ESTADIO","GRADE 1",true)
						AlertSW("Estadio: GRADE 1\n"+percert.toFixed(2)+"%")
					}
					else{
						let percert = ArrayAvg([(14000)/ArrayAvg(PS), (9000)/ArrayAvg(PD)])
						
						replaceHTML("percetHP","width: "+percert+"%",false)
						replaceHTML("ESTADIO","GRADE 1",true)
						AlertSW("Estadio: GRADE 1\n"+percert.toFixed(2)+"%")
					}
				}
				else if(ArrayAvg(PS) >= 160 && ArrayAvg(PS) <= 179){
					if(ArrayAvg(PD) >= 100 && ArrayAvg(PD) <= 109){
						let percert = ArrayAvg([(16000)/ArrayAvg(PS), (10000)/ArrayAvg(PD)])
						replaceHTML("percetHP","width: "+percert+"%",false)
						replaceHTML("ESTADIO","GRADE 2",true)
						AlertSW("Estadio: GRADE 2\n"+percert.toFixed(2)+"%")
					}
				}
				else if(ArrayAvg(PS) >= 180){
					if(ArrayAvg(PD) > 110){
						let percert = ArrayAvg([(ArrayAvg(PS)*100)/300, (ArrayAvg(PD)*100)/300])
						replaceHTML("percetHP","width: "+percert+"%",false)
						replaceHTML("ESTADIO","GRADE 3",true)
						AlertSW("Estadio: GRADE 3\n"+percert.toFixed(2)+"%")
					}
				}
		
				replaceHTML("SPMINn",Math.min.apply(null,PS),true)
				replaceHTML("SPMAXn",Math.max.apply(null,PS),true)
				replaceHTML("DPMINn",Math.min.apply(null,PD),true)
				replaceHTML("DPMAXn",Math.max.apply(null,PD),true)
				chart1(LB,PD,PS);
				chart2(LB,HR)
	
				len = Data.length
				console.log(len)
			}
		})
	} else{
		window.location.href = "login.html"
	}
}

function replaceHTML(id,value,status){
	if(status == true){ document.getElementById(id).innerHTML = value }
	else{ document.getElementById(id).style=value;}
}

function ArrayAvg(myArray) {
    var i = 0, summ = 0, ArrayLen = myArray.length;
    while (i < ArrayLen) {
        summ = summ + myArray[i++];
}
    return summ / ArrayLen;
}

function str2int(){
	var HRint = HR.map(function (x) { return parseInt(x, 10);});
	var PSint = PS.map(function (x) { return parseInt(x, 10);});
	var PDint = PD.map(function (x) { return parseInt(x, 10);});

	HR = HRint
	PS = PSint
	PD = PDint
}

function chart1(labels_input,data_input_pas,data_input_pad){
	var ctx = document.getElementById('chart1').getContext('2d');
	var Chart1 = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels_input,
			datasets: [{
				label: 'Diastolic pressure',
				data: data_input_pas,
				backgroundColor: '#fff',
				borderColor: "transparent",
				pointRadius :"0",
				borderWidth: 3
			}, {
				label: 'Systolic pressure',
				data: data_input_pad,
				backgroundColor: "rgba(255, 255, 255, 0.35)",
				borderColor: "transparent",
				pointRadius :"0",
				borderWidth: 1
			}]
		},
	options: {
		maintainAspectRatio: false,
		legend: {
			display: false,
			labels: {
			fontColor: '#ddd',  
			boxWidth:40
			}
		},
		tooltips: {
			displayColors:false
		},	
		scales: {
			xAxes: [{
			ticks: {
				beginAtZero:true,
				fontColor: '#ddd'
			},
			gridLines: {
				display: true ,
				color: "rgba(221, 221, 221, 0.08)"
			},
			}],
			yAxes: [{
			ticks: {
				beginAtZero:true,
				fontColor: '#ddd'
			},
			gridLines: {
				display: true ,
				color: "rgba(221, 221, 221, 0.08)"
			},
			}]
			}
		}
	});  
}

function chart2(labels_input,data_input){
	var ctx = document.getElementById('chart2').getContext('2d');
			var Chart2 = new Chart(ctx, {
				type: 'line',
				data: {
					labels: labels_input,
					datasets: [{
						label: 'Heart rate',
						data: data_input,
						backgroundColor: '#fff',
						borderColor: "transparent",
						pointRadius :"0",
						borderWidth: 3
					}]
				},
			options: {
				maintainAspectRatio: false,
				legend: {
					display: false,
					labels: {
					fontColor: '#ddd',  
					boxWidth:40
					}
				},
				tooltips: {
					displayColors:false
				},	
				scales: {
					xAxes: [{
					ticks: {
						beginAtZero:true,
						fontColor: '#ddd'
					},
					gridLines: {
						display: true ,
						color: "rgba(221, 221, 221, 0.08)"
					},
					}],
					yAxes: [{
					ticks: {
						beginAtZero:true,
						fontColor: '#ddd'
					},
					gridLines: {
						display: true ,
						color: "rgba(221, 221, 221, 0.08)"
					},
				}]
			}
		}
	}); 
}

function LogOut(){
	sessionStorage.removeItem("useruuid")
    sessionStorage.removeItem("emailuuid")
    window.location.href = "login.html"
}


function ClearData(){
	var name = sessionStorage.getItem("useruuid")

	if(sessionStorage.getItem("useruuid") != "" && sessionStorage.getItem("useruuid") != null){
		fetch(urldelete, {
			method: 'POST',
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({ 
				'table': 'htadata',
				'arg': "WHERE name='"+name+"'"
			})
		})
		.then(response => response.json())
		.then(response => {console.log(response)
		Data = null;
		LB = Array();
		HR = Array();
		PS = Array();
		PD = Array();
		len = 0;
		HT = null;

		ReloadData();
		window.location.reload()
	})
	}
}
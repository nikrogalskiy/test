const os = require("os");
const http = require("http");
const infoOs = os.cpus();
const namePlatform = os.platform();
const getInfoTimes = infoOs[0].times;
const createListInfoTimes = `
	<ul class="leftp">
		<li><span>user: </span><span>${getInfoTimes.user}</span></li>
		<li><span>nice: </span><span>${getInfoTimes.nice}</span></li>
		<li><span>sys: </span><span>${getInfoTimes.sys}</span></li>
		<li><span>idle: </span><span>${getInfoTimes.idle}</span></li>
		<li><span>irq: </span><span>${getInfoTimes.irq}</span></li>
	</ul>`;
const showInfoOs = `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Информация о системе</title>
			<style>
				body{
					box-sizing: border-box;
					padding: 0px;
					margin: 0px;
				}
				div{
					margin: 0px auto;
					max-width:450px;
					padding:10px;
					background: #d5d3ce;
				}
				h1{
					font-size:30px;
					font-weight:bold;
					text-align:center;
				}
				ul{
					margin: 0px;
					padding:0px;
				}
				li{
					list-style-type:none;
					font-size:20px;
					padding: 5px 0px;
				}
				.leftp{
					margin-left:15px;
				}
			</style>
		</head>
		<body>
			<div>
				<h1>Информацию об операционной системе</h1>
				<ul>
					<li><span>OS: </span><span>${namePlatform}</span></li>
					<li><span>Model: </span><span>${infoOs[0].model}</span></li>
					<li><span>Speed: </span><span>${infoOs[0].speed}</span></li>
					<li><span>Times:</span></li>
					${createListInfoTimes}
				</ul>
			</div>
		</body>
	</html>`;

http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/html" });
	res.end(showInfoOs);
}).listen(8080, () => console.log("Сервер работает"));
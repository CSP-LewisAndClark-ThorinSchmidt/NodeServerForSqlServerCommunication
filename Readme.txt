Hello, I just wanted to give this too you as an option. I know soon we will start HTML, and eventually JS; I know that there is no way to access a SQL database with ClientSide JS. You don't have to use it if you don't want to, It only took me 2 min to code. as I already had some base code to work off of.

What is contained in this folder is a slammer Node.js script I wrote that access like a HTTP server.

When you send this server a HTTP POST request with a SQL query, the server will run it and return the result.

You can change the hosting port, SQL Username, SQL Password, and SQL Host in noseServer.js

When you send data to the server it should be in the form of a stringified JSON Object Ex: JSON.stringify(object);

{
	"query": "SQL QUERY HERE"
}

You can send it using this code:

let http = new XMLHttpRequest();
http.addEventListener("load", reqListener);
http.open("POST", url);
http.send(JSON.stringify(data));

function reqListener() {
	if (this.status != 200) {
		console.log("ERROR!");
		console.log(this.responseText);
	return;
	}
	console.log("RECIVED!");
	let data = JSON.parse(this.responseText);
	
	//Do stuff with the data
}


The return data syntax looks like this: **After parsing it**

{
	"Results": [
		{
			"Field1": value,
			"Field2": value
		}
	],
	"Fields": [] //I don't know how this is returned, I have never needed it.
}

I tried to keep this as close to sending SQL commands as I could, that is why you have to specify the commands to send.

To start the server just run nodeServer.js with node

(apt install node)

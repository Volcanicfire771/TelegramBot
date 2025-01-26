const express = require("express");
const bodyParser = require("body-parser");
const { handler } = require("../controller/library/index.js");
const app = express();
const port = 4040;



// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Set up home route
app.get("/", async (req, res) => {
	res.send(await handler(req));
});
// Set up second page
app.post("/", async (req, res) => {
	// console.log(req.body.message);
    res.send(await handler(req));
    
});

app.listen(port, () => {
	console.log(`Success! Your application is running on port ${port}.`);
});
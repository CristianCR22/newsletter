const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/singup.html")
})

app.post("/", function(req, res) {
  const fName = req.body.nombre;
  const lName = req.body.apellidos;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/212aeefd83"

  const options = {
    method: "POST",
    auth: "cristian22:a0bb5bf1eb7558490245dae8dbf8713a-us14"
  }

  const request = https.request(url, options, function(response) {

  const statusCode = response.statusCode;
  console.log(response);


  if (response.statusCode == "200") {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }

    response.on("data", function(data) {
      const jsonResult = JSON.parse(data);

    })
  })

  request.write(jsonData);
  request.end();

})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000.");
});


// Api Key Mailchimp a0bb5bf1eb7558490245dae8dbf8713a-us14
// List ID  212aeefd83

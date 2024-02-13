const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors("*"));
app.use('/login', (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  })
app.get("/", (req, res) => {
    console.log("loadded ....");
    res.send({message:"success"})
})

app.post('/login', async (request, response) => {
    try {
        const reqBody = request.body;
        console.log("reqBody....login ::", reqBody)
        if(!reqBody) 
            return response.status(400).json({message: "Error in request body"});
        const {email, password} = (reqBody);
        if(email && password){
            response.send({message: "success", status:200});
        } else {
            response.send({message: "Please check your creds", status:400});
        }
    } catch(err) {
        console.log("EXCEPTION OCCURRED :: login ::", err);
    }
});
app.listen(3001);
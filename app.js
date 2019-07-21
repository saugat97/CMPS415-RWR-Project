const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const xml2js = require('xml2js');
const Request = require("request"); 
const xmlParser = require("body-parser-xml")
const app = express(); 

xmlParser(bodyParser);

mongoose.connect("mongodb+srv://saugat97:rwrproject415@cluster0-swt1r.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Could not connect to the database', err));
   
const ticketSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Major: String,
    Date: { type: Date, default: Date.now },
    isFullTime: Boolean
});
 
const Ticket = mongoose.model('Ticket', ticketSchema);   //Ticket class
module.exports = Ticket;

app.use(bodyParser.json());        //parsing of JSON object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.xml());

//GET METHODS
app.get('/', (request, response) => {
    response.send('CMPS 415 RWR Project Phase I CR');
});

app.get('/rest/list', (request, response) => {
    Ticket.find({})
        .then(tickets => {
           response.send(JSON.stringify(tickets));
        })
        .catch(err => {
            console.log(err);
    });
});

app.get('/rest/ticket/:id', (request, response) => {
    Ticket.findById(request.params.id)
        .then(tickets => {
            if(!tickets){
                return response.status(404).send('ticket not found');
            }
            response.send(tickets);
        })
        .catch(err => {
            console.log(err);
        });
});

//XML GET METHOD
app.get('/rest/xml/ticket/:id',  (req, res) => {
    var ID = req.params.id;
    Request.get('http://cmps415-rwrproject.herokuapp.com/rest/ticket/' + ID,  (error, response, body) => {
        if(error) {
            response.send('An erorr occured');
        }
        else{
        var object= JSON.parse(body);
            
            var builder = new xml2js.Builder({
                rootName: 'tickets'

            });
            object = builder.buildObject(object);
            
        res.send(object);
        }
    });
});

//XML POST METHOD
app.post('/rest/xml/ticket',  (req, res) => {
    res.type('xml');
    
    // console.log(req.body)

    const ticket = {
        FirstName: req.body.ticket.FirstName[0],
        LastName: req.body.ticket.LastName[0],
        Major: req.body.ticket.Major[0],
        isFullTime: req.body.ticket.isFullTime[0]
    }
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://cmps415-rwrproject.herokuapp.com/rest/ticket",
        "body": JSON.stringify({
            "FirstName": ticket.FirstName,
            "LastName": ticket.LastName,
            "Major": ticket.Major,
            "isFullTime": ticket.isFullTime
        })
    }, (error, response, body) => {
        if(error) {
            response.send('An erorr occured');
        }
        else{
        var object= JSON.parse(body);
            
            var builder = new xml2js.Builder({
                rootName: 'tickets'

            });
            object = builder.buildObject(object);
            
        res.send(object);
        }
    });
});

//POST METHODS
app.post('/rest/ticket', (request, response) => {
    //validate
    if(!request.body.FirstName || !request.body.LastName || !request.body.Major || !request.body.isFullTime) {
        response.status(404).send('Invalid ticket!');
        return;
    }

    //create
    const ticket = new Ticket({ 
        FirstName: request.body.FirstName,
        LastName: request.body.LastName,
        Major: request.body.Major,
        isFullTime: request.body.isFullTime
    });
 
    ticket.save()
        .then(tickets => {
        response.send(tickets);
    })
    .catch(err => {
        console.log(err);
    });
    
});

//UPDATE METHOD
app.put('/rest/ticket/:id', (request, response) => {
    //validate
    if(!request.body.FirstName || !request.body.LastName || !request.body.Major || !request.body.isFullTime) {
        response.status(404).send('Invalid ticket!');
        return;
    }

    Ticket.findByIdAndUpdate(request.params.id,{
        FirstName: request.body.FirstName,
        LastName: request.body.LastName,
        Major: request.body.Major,
        isFullTime: request.body.isFullTime
    }, {new: true})
        .then(tickets => {
            if(!tickets){
                return response.status(404).send('ticket not found');
            }
        response.send(tickets);
        })
        .catch(err => {
            console.log(err);
        });
});


//DELETE METHOD
app.delete('/rest/ticket/:id', (request, response) => {
    Ticket.findByIdAndRemove(request.params.id)
        .then(tickets => {
            if(!tickets){
            return response.status(404).send('ticket not found');
            }
            response.send(tickets);
        })
        .catch(err => {
            console.log(err);
        });
});

//Environment variable  --PORT
const port = process.env.PORT || 8080

app.listen(port, () => console.log(`listening on port ${port}`));  
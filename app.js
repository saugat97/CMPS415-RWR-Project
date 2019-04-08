const express = require('express');
const app = express();

app.use(express.json());        //parsing of JSON object

const tickets = [
    {id: 1, FirstName:'John', LastName:'Snow', Status:'Alive', Kingdom:'WinterFell', Description:'House Stark', Motto: 'Winter is Coming'},
    {id: 2, FirstName:'Daenerys', LastName:'Targaryen', Status:'Alive', Kingdom:'Dragonstone', Description:'House Targaryen', Motto: 'Fire and Blood'},
    {id: 3, FirstName:'Cersei', LastName:'Lannister', Status:'Alive', Kingdom:'Westeros', Description:'House Lannister', Motto: 'Hear Me Roar!'},
    {id: 4, FirstName:'Olenna', LastName:'Tyrell', Status:'Dead', Kingdom:'High Garden', Description:'House Tyrell', Motto: 'Growing Strong'},
    ];

//GET METHODS
app.get('/', (request, response) => {
    response.send('CMPS 415 RWR Project Phase I CR');
});

app.get('/rest/list', (request, response) => {
    response.send(tickets);
});

app.get('/rest/ticket/:id', (request, response) => {
    const ticket = tickets.find(c => c.id === parseInt(request.params.id));
    if (!ticket) response.status(404).send('ticket not found');
    
    response.send(ticket);
});

//POST METHODS
app.post('/rest/ticket', (request, response) => {
    
    if(!request.body.FirstName || !request.body.LastName || !request.body.Status || !request.body.Kingdom || !request.body.Description || !request.body.Motto) {
        response.status(400).send('Invalid ticket!');
        return;
    }

    const ticket = {
        id: tickets.length + 1,
        FirstName: request.body.FirstName,
        LastName: request.body.LastName,
        Status: request.body.Status,
        Kingdom: request.body.Kingdom,
        Description: request.body.Description,
        Motto: request.body.Motto
    };
 
    tickets.push(ticket);
    response.send(ticket);
});

//Environment variable  --PORT
const port = process.env.PORT || 8080

app.listen(port, () => console.log(`listening on port ${port}`));
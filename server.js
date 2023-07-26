const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const  corsOptions = { origin: 'http://localhost:3000'}
const PORT = process.env.port || 8080;
const knex = require("knex")(require("./knexfile"));
app.use(cors(corsOptions));


//Serves a middlegame puzzle with a given id. 
app.get("/middlegames/:id", (req, res) => {
    const id = req.params.id;
    knex('middlegames').where({ id: req.params.id }).then((response) => {
        if (response.length > 0)
            return res.status(200).send(response[0])
        return res.status(404).send(`No puzzle with id ${req.params.id} found!`)
    }).catch(error => {
        res.status(500).send(error);
    })

})
//Serves a middlegame puzzle with a given difficulty, within 100 rating points either side. 
app.get("/middlegames/difficulty/:rating", (req, res) => {
    const rating = Number(req.params.rating);
    knex.raw(` select * from middlegames where Rating > ${rating-100} AND Rating < ${rating+100} order by rand() LIMIT 1;`).then(response => {
        if (response.length > 0)
            return res.status(200).send(response[0])
        return res.status(404).send(`No puzzle with id ${req.params.id} found!`)
    })
})
//Serves an endgame puzzle with a given id
app.get("/endgames/:id", (req, res) => {
    const id = req.params.id;
    knex('endgames').where({ id: req.params.id }).then((response) => {
        if (response.length > 0)
            return res.status(200).send(response[0])
        return res.status(404).send(`No puzzle with id ${req.params.id} found!`)
    }).catch(error => {
        res.status(500).send(error);
    })

})

//Serve a puzzle
app.get("/puzzle/:id", (req, res) => {
    const id = req.params.id;
    knex('puzzles').where({ id: req.params.id }).then((response) => {
        if (response.length > 0)
            return res.status(200).send(response[0])
        return res.status(404).send(`No puzzle with id ${req.params.id} found!`)
    }).catch(error => {
        res.status(500).send(error);
    })

})

app.listen(8080, () => {
    console.log("Server listening on port 8080")
})
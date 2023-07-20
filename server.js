const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.port || 8080;
const knex = require("knex")(require("./knexfile"));
app.use(cors());

//Serve a puzzle
app.get("/:id", (req, res) => {
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
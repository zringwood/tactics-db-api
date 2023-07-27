const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const  corsOptions = { origin: 'http://localhost:3000'}
const PORT = process.env.port || 8080;
const knex = require("knex")(require("./knexfile"));
const sanitzer = require("perfect-express-sanitizer")
app.use(sanitzer.clean({
    sql:true
}))
app.use(cors(corsOptions));

const middlegames = require('./routes/middlegames')
const endgames = require('./routes/endgames')

app.use("/middlegames", middlegames)
app.use("/endgames", endgames)

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
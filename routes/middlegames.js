const express = require('express')
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.get("/:id", (req, res) => {
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
router.get("/difficulty/:rating", (req, res) => {
    const rating = Number(req.params.rating);
    knex.raw(` select * from middlegames where Rating > ${rating-100} AND Rating < ${rating+100} order by rand() LIMIT 1;`).then(response => {
        if (response.length > 0)
            return res.status(200).send(response[0])
        return res.status(404).send(`No puzzle with id ${req.params.id} found!`)
    })
})
module.exports = router;
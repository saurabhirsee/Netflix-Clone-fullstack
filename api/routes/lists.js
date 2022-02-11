const router = require('express').Router()
const List = require('../models/List')
const verify = require('../verifyToken')

//CREATE
router.post('/', verify, async (req,res) => {
    if(req.user.isAdmin){
        const newList = new List(req.body)
        try {
            const savedList = await newList.save()
            res.status(201).json(savedList)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You are not allowed')
    }
})

//DELETE
router.delete('/:id', verify, async (req,res) => {
    if(req.user.isAdmin){
        try {
            await List.findByIdAndDelete(req.params.id)
            res.status(200).json('List has been deleted...')

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You are not allowed')
    }
})

//GET
router.get('/', verify, async (req,res) => {
    const typeQ = req.query.type
    const genreQ = req.query.genre
    let list = []
    try {
        if(typeQ)
        {
            if(genreQ)
            {
                list = await List.aggregate([
                    { $match: {type: typeQ, genre: genreQ} },
                    { $sample: {size:10} }
                ])
                if(list.length === 0)
                {
                    list = await List.aggregate([
                        { $match: {type: typeQ} },
                        { $sample: {size:10} }
                    ])
                }
            }
            else {
                list = await List.aggregate([
                    { $match: {type: typeQ} },
                    { $sample: {size:10} }
                ])
            }
        } else {
            list = await List.aggregate([
                { $sample: {size:10} }
            ])
        }
        res.status(200).json(list)

    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router
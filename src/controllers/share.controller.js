const {ShareModel} = require('../models/share.model')
const APIError = require('../utils/Error')
const Response = require('../utils/Response')

const addShare = async(req,res) => {
    const authAdmin = req.authAdmin
    if(!authAdmin) return new Response(null, 'unauthorized operation').unauthorized(res)

    const share = req.body

    const createShare = await ShareModel.create({
        name : share.name,
        symbol : share.symbol,
        price : share.price,
        quantity : share.quantity
    })

    if(createShare) return new Response(createShare, 'shares successfully added to the database').created(res)
    else throw new APIError('an error occurred while adding shares to the database', 500)
}


const getShares = async(req,res) => {
    const shares = await ShareModel.findAll()
    if(shares.length === 0 ) return new Response(null, 'no shares').notfound(res)

    const result = shares.map(share => share.dataValues)
    return new Response(result, 'shares').ok(res)
    
}


const updateShare = async(req,res) => {
    
}
const deleteShare = async(req,res) => {
    
}


module.exports = {
    addShare, getShares, updateShare, deleteShare
}
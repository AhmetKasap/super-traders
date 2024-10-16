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


const updateShare = async (req, res) => {
    const authAdmin = req.authAdmin
    if (!authAdmin) return new Response(null, 'unauthorized operation').unauthorized(res)

    const { id } = req.params;
    const { name, symbol, price, quantity } = req.body

    const share = await ShareModel.findByPk(id)

    if (!share) return new Response(null, 'share not found').notfound(res)
    

    await share.update({
        name: name || share.name,
        symbol: symbol || share.symbol,
        price: price || share.price,
        quantity: quantity || share.quantity,
    })

    return new Response(share, 'share updated successfully').ok(res)
};

const deleteShare = async (req, res) => {
    const authAdmin = req.authAdmin
    if (!authAdmin) return new Response(null, 'unauthorized operation').unauthorized(res)

    const { id } = req.params

    const share = await ShareModel.findOne({where : {id : req.params.id}})
    if (!share) return new Response(null, 'not found share').notfound(res)

    const deleted = await ShareModel.destroy({ where: { id } })

    if (deleted) return new Response(null, 'share deleted successfully').ok(res)
    else return new Response(null, 'share not found').notfound(res)

    
}


module.exports = {
    addShare, getShares, updateShare, deleteShare
}
const { ShareModel } = require('../models/share.model') 
const cron = require('node-cron')
const APIError = require('../utils/Error')

const updatePrices = async () => {
    try {
        const shares = await ShareModel.findAll()

        for (const share of shares) {
            // Örnek: Fiyatı rastgele bir değere güncelleyiyorum
            const newPrice = parseFloat((Math.random() * 100).toFixed(2)); // 0 - 100 arasında rastgele fiyat

            await share.update({ price: newPrice });
            console.log(`Updated price for share ID ${share.id}: $${newPrice}`)
        }
    } catch (error) {
        throw new APIError(error.message || 'Error updating share prices', 500)
    }
};

const job = () => {
    cron.schedule('* * * * *', async () => {  // 1 dakikada bir için --> ('* * * * *)
        await updatePrices()
    })
}

module.exports = { job }

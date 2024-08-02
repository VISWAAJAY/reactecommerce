const History = require("../main/models/orderhistorymodel");

const orderhistory = async (req, res) => {
    try {
            //ADDING TO ORDER HISTORY 
        const { sendingData, address, user_id } = req.body;

        const [{proquan, prices, productids}] = req.body.data;



        // Creating an array of history records
        const historyRecords = productids.map((product_id, index) => ({
            product: product_id,
            user: user_id,
            address: address,
            quantity: proquan[index],
            price: prices[index]  
            
        }));
 
        // Insert all history records into the database
        const insertedRecords = await History.insertMany(historyRecords);
        
        

        res.status(201).json({
            message: 'Order history created successfully',
            history: insertedRecords
        });
    } catch (error) {
        // Handle errors 
        res.status(500).json({
            message: 'Failed to create order history',
            error: error.message
        });
    }
};

module.exports = orderhistory;

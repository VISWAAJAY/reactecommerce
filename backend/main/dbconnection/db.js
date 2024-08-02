//connecting to database//

const mongoose = require('mongoose');

async function connecttodb(){
   await mongoose.connect('mongodb+srv://ajayreddy:123@internshaalae-commerce.r0qo6ui.mongodb.net/internshaalae-commerce?retryWrites=true&w=majority&appName=internshaalae-commerce');
    console.log('connected');
}

module.exports = connecttodb;
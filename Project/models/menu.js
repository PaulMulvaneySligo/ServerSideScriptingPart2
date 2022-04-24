const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    Name: String,
    Items: String,
    ItemsPrice: String
})

const Menu = mongoose.model('menu', menuSchema)

readMenu = async (options={}) =>
  {
    if (Object.entries(options).length == 0)
       return Menu.find().lean();
   
   else if (options.meal)
   
       return Menu.findOne(options).lean();
   
   else
       return undefined;
   
}

exports.readMenu = readMenu;
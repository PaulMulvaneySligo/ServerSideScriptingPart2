const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    people: String,
    date: String,
    time: String,
})

const Booking = mongoose.model('booking', bookingSchema, 'menudatas')

readBooking = async (options={}) =>
  {
    if (Object.entries(options).length == 0)
       return Booking.find().lean();
   
   else if (options.booking)
   
       return Booking.findOne(options).lean();
   
   else
       return undefined;
   
}

createBooking = async (data) => {
    let bookingDoc = new Booking(data);
    await bookingDoc.save();
}


deleteBooking = async (name) => {
    const book = await Booking.findOne({ name: name });
    await book.remove();
}

updateBooking = async (data) => {
    const id = data._id;
    await Booking.findByIdAndUpdate({_id: id}, {...data});
}

exports.readBooking = readBooking;
exports.createBooking = createBooking;
exports.deleteBooking = deleteBooking;
exports.updateBooking = updateBooking;
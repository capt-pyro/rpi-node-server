const {Temp} = require('./../models/temperature');
const mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://localhost:27017/rpi_temp', {
  useMongoClient: true,
})
var generateTempObj = () => {
  Temp.find({}).sort({_id:1}).limit(5).then((temps) => {
    //console.log(temps);
    return temps;
  });
}

module.exports = {generateTempObj};

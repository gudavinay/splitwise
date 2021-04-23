
const { mongoURI } = require('../../mongo/config');
const mongoose = require('mongoose');

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(res=>{
    console.log("connected!!!!!!!!!!!!!!!!!");
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;
let schemaOpportunity = mongoose.Schema({
    Name : string,
    Description:string,
    Category: string,
    Date : date,
    Address : string,
});


var OpportunityrModel=mongoose.model('Opportunity',schemaOpportunity);


module.exports = mongoose.model("Users", OpportunityrModel);

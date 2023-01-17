const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let schemaOpportunity = mongoose.Schema({
    Name : string,
    Description:string,
    Category: string,
    Date : date,
    Address : string,
});

export default mongoose.model('Opportunitys', Opportunity);


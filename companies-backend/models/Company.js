const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    industry: String,
    location: String,
    founded: Number,
    employees: Number,
    category: {
        type: String,
        enum: ["top-level", "mid-level", "startup"],
        required: true,
    },
});

module.exports = mongoose.model("Company", CompanySchema);
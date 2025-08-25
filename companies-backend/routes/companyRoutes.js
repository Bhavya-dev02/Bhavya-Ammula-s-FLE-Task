const express = require("express");
const router = express.Router();
const Company = require("../models/Company");

// Create company
router.post("/createcompany", async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Get all companies
router.get("/allcompanies", async (req, res) => {
    try {
        const { name, industry, location, minEmployees, maxEmployees, category } = req.query;

        const filters = {};
        if (name) filters.name = new RegExp(name, "i");
        if (industry) filters.industry = industry;
        if (location) filters.location = new RegExp(location, "i");
        if (category) filters.category = category;
        if (minEmployees) filters.employees = { ...filters.employees, $gte: Number(minEmployees) };
        if (maxEmployees) filters.employees = { ...filters.employees, $lte: Number(maxEmployees) };

        // Disable browser caching
        res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

        const companies = await Company.find(filters).sort({ _id: -1 });
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single company
router.get("/singlecompany/:id", async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({error: "Company not found"});
        res.json(company);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Update company
router.put("/editcompany/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!company) return res.status(404).json({error: "Company not found"});
        res.json(company);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Delete company
router.delete("/deletecompany/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) return res.status(404).json({error: "Company not found"});
        res.json({message: "Company deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
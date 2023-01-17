import opportunity from "../models/opportunity.model.js";
 
export const getopportunities = async (req, res) => {
    try {
        const opportunitys = await opportunity.find();
        res.json(opportunitys);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
export const getopportunityById = async (req, res) => {
    try {
        const opportunity = await opportunity.findById(req.params.id);
        res.json(opportunity);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
 
export const saveopportunity = async (req, res) => {
    const opportunity = new opportunity(req.body);
    try {
        const insertedopportunity = await opportunity.save();
        res.status(201).json(insertedopportunity);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const updateopportunity = async (req, res) => {
    try {
        const updatedopportunity = await opportunity.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedopportunity);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const deleteopportunity = async (req, res) => {
    try {
        const deletedopportunity = await opportunity.deleteOne({_id:req.params.id});
        res.status(200).json(deletedopportunity);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
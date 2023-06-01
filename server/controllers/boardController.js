const models = require ('../models/boardModel.js')

const boardController = {};

boardController.newBoard = async (req, res, next) => {
  const {boardName, userName} = req.body;
    
  try{

    // const result = await create()
    // res.locals.newBoard = result;

    res.locals.newBoard = await Board.create({
      state: [[], [], [], []],
      name: boardName,
      participants: userName  
    })
    
    
    return next()
  } catch (err) {
    return next(err)
  }
}

// boardController.deleteBoard = async (req, res, next) => {

// }

// boardController.findBoard = async (req, res, next) => {

// }

/**
 const YourModel = require('../models/YourModel');

// Create a new document
exports.create = async (req, res, next) => {
  try {
    const newDocument = new YourModel(req.body);
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all documents
exports.getAll = async (req, res, next) => {
  try {
    const documents = await YourModel.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single document by ID
exports.getById = async (req, res, next) => {
  try {
    const document = await YourModel.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a document by ID
exports.updateById = async (req, res, next) => {
  try {
    const updatedDocument = await YourModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(updatedDocument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a document by ID
exports.deleteById = async (req, res) => {
  try {
    const deletedDocument = await YourModel.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 
 
 */


module.exports = boardController;
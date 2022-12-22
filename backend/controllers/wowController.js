const asyncHandler = require('express-async-handler');

const Wow = require('../models/wowModel');


const getWow = asyncHandler(async (req, res) => {
  const wow = await Wow.find();
  
  res.status(200).json(wow);
});


module.exports = {
  getWow
};
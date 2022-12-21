const asyncHandler = require('asyncHandler');
const goalController = {};

// @ desc Get goals
// @route GET /api/goals
// @access Private
goalController.getGoals = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: 'Get goals' });
});

// @ desc Set goal
// @route POST /api/goals
// @access Private
goalController.setGoal = asyncHandler(async (req, res, next) => {
    if(!req.body.text) {
      res.status(400);
      throw new Error('Please add a text field');
    }

    res.status(200).json({ message: req.body });
});

// @ desc Update goal
// @route PUT /api/goals/:id
// @access Private
goalController.updateGoal = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` });
});


// @ desc Delete goals
// @route DELETE /api/goals/:id
// @access Private
goalController.deleteGoal = asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` });
});


module.exports = goalController;
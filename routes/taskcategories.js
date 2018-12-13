let express = require("express");
let router = new express.Router();
let TaskCategoryController = require("../Controllers/TaskCategoryController");

//return a task categories list
router.get('/taskcategories/:page/:number', TaskCategoryController.list);

//add one task category to the database
router.post('/taskcategory/add/',TaskCategoryController.add);

//return one task category by id
router.get('/taskcategory/:id', TaskCategoryController.findById);

//update one task category by id
router.put('/taskcategory/update/:id',TaskCategoryController.updateById);

//delete one task category by id
router.delete('/taskcategory/delete/:id', TaskCategoryController.delete);

module.exports = router;
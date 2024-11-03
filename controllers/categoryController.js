import * as categoryModel from '../models/categoryModel.js';

export const getCategories = (req, res) => {
    categoryModel.getCategories((err, result) => {
        if (err) {
            return res.json({ Message: "Error retrieving categories" });
        }
        return res.json(result);
    });
};

// export const createCategory = (req, res) => {
//   categoryModel.createCategory(req.body, (err, result) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).json({ Message: "Error inserting category" });
//       }
//       return res.status(201).json({ Message: "Category created successfully", categoryId: result.insertId });
//   });
// };

// export const updateCategory = (req, res) => {
//   const { id } = req.params;
//   categoryModel.updateCategory(id, req.body, (err, result) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).json({ Message: "Error updating category" });
//       }
//       return res.json({ Message: "Category updated successfully" });
//   });
// };

// export const deleteCategory = (req, res) => {
//   const { id } = req.params;
//   categoryModel.deleteCategory(id, (err, result) => {
//       if (err) {
//           console.error(err);
//           return res.status(500).json({ Message: "Error deleting category" });
//       }
//       return res.json({ Message: "Category deleted successfully" });
//   });
// };
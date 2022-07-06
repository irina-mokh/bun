import { Category } from '../db/models.js';

class CategoryController {
  async getAll (req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }

  async getById () {
    
  }

  async create (req, res) {
    const { name, type } = req.body;
    const category = await Category.create( { name, type} );
    return res.json(category);
  }

  async edit () {
    
  }

  async delete () {
    
  }
}

export const categoryController = new CategoryController();
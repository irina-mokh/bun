import { Category } from '../db/models.js';

class CategoryController {
  async getAll (req, res) {
    const { userId } = req.query;

    const categories = await Category.findAll({where: {userId}});
    return res.json(categories);
  }

  async getById (req, res) {
    const { id } = req.params;
    const category = await Category.findOne({where: {id}})
    return res.json(category);
  }


  async create (req, res) {
    const { name, type, total, userId } = req.body;
    const category = await Category.create( { name, type, total, userId} );
    return res.json(category);
  }

  async edit (req, res) {
    const { name, type, total, userId} = req.body;
    const category = await Category.set( { name, type, total, userId} );
    return res.json(category);
  }

  async delete (req, res) {
    const { id } = req.body;
    await Category.destroy({where: {id}});
    return res.json(`Category with id ${id} deleted.`);
  }
}

export const categoryController = new CategoryController();
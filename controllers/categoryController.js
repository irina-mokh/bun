import { Action, Category } from '../db/models.js';

class CategoryController {
  async getAll (req, res) {
    const { userId } = req.query;
    const { period } = req.body;

    let categories = await Category.findAll({where: {userId}});
    if (period) {
      categories = categories.map(async (cat) => {
        cat.total = await this.getTotalByPeriod(cat, period);
        return cat;
      })
    }
    return res.json(res);
  }

  async getById (req, res) {
    const { id } = req.params;
    const { period } = req.body;
    const cat = await Category.findOne({where: {id}})

    if (period) {
      cat.total = await this.getTotalByPeriod(cat, period)
    }
    
    return res.json(cat);
  }

  async getTotalByPeriod (cat, period) {
    const newTotal = cat.total;
    const actions = await Action.getAll(cat.id);
    // filter actions by period
    actions = actions.filter((act) => act.date.slice(0, 7) == period);
    let actionsForSum;
    switch (cat.type) {
      case 'income' | 'expense':
        actionsForSum = actions.filter((act) => act.date.slice(0, 7) == period);
      case 'asset':
        actionsForSum = actions.filter((act) => new Date(act.date.slice(0, 7)) <= new Date(period));
    }
  
    actions.forEach((act) => {
      newTotal += act.sum
    })

    return res.json(newTotal);
  }


  async create (req, res) {
    const { name, type, total, userId } = req.body;
    const category = await Category.create( { name, type, total, userId} );
    return res.json(category);
  }

  async edit (req, res) {
    const { name, type, total, id} = req.body;
    const category = await Category.update( { name, type, total }, { where: {id}} );
    return res.json(category);
  }

  async delete (req, res) {
    const { id } = req.body;
    await Category.destroy({where: {id}});
    return res.json({ message:`Category with id ${id} deleted.`});
  }
}

export const categoryController = new CategoryController();
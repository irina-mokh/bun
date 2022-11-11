import { Category } from '../db/models.js';

class CategoryController {
  async getAll (req, res) {
    const { userId } = req.query;

    let categories = await Category.findAll({where: {userId}});
    return res.json(categories);
  }

  async getById (req, res) {
    const { id } = req.params;
    const cat = await Category.findOne({where: {id}})
    return res.json(cat);
  }

  // async  getTotalByPeriod (catId, period) {
  //   const cat = await Category.findOne({where: {id}})
  //   let newTotal = cat.total;
  //   console.log(cat.id);
  //   const actions = await Action.findAll({where: {
  //     [Op.or]: [ 
  //       {from: cat.id},
  //       {to: cat.id},
  //     ]
  //   }});
  //   console.log('ALL ACTIONS:', actions);
  //   // filter actions by period
  //   let actionsForSum;
  //   switch (cat.type) {
  //     case 'income' | 'expense':
  //       actionsForSum = actions.filter((act) => act.date.slice(0, 7) == period);
  //     case 'asset':
  //       actionsForSum = actions.filter((act) => new Date(act.date.slice(0, 7)) <= new Date(period));
  //   }
  
  //   console.log('ACTS for sum:',actions);
  
  //   actionsForSum.forEach((act) => {
  //     newTotal += act.sum
  //   })
  //   console.log('new total', newTotal);
  //   return newTotal;
  // }

  async create (req, res) {
    const { name, type, start, userId } = req.body;
    const category = await Category.create( { name, type, start, userId} );
    return res.json(category);
  }

  async edit (req, res) {
    const { name, type, id} = req.body;
    const category = await Category.update( { name, type, start }, { where: {id}} );
    return res.json(category);
  }

  async delete (req, res) {
    const { id } = req.body;
    await Category.destroy({where: {id}});
    return res.json({ message:`Category with id ${id} deleted.`});
  }
}

export const categoryController = new CategoryController();
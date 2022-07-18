import { Action, Category } from '../db/models.js';

class ActionController {
  async getAll (req, res) {
    const actions = await Action.findAll();
    return res.json(actions);
  }

  async getById (req, res) {
    const { id } = req.params;
    const action = await Action.findOne({where: {id}})
    return res.json(action);
  }

  async getByCat (req, res) {
    const { from, to } = req.body;
    let actions;
    if (!from) {
      actions = await Action.findAll();
    } else {
      actions = await Action.findAll({where: {
        [Op.or]: [ from, to ]
      }});

    }
  }

  async create (req, res) {
    const { sum, from, to } = req.body;
    const action = await Action.create( { sum, from, to} );

    const catFrom = await Category.findByPk(from);
    const catTo = await Category.findByPk(to);
    
    if (catFrom.type === "income") {
      catFrom.total = catFrom.total + sum;
    } else {
      catFrom.total = catFrom.total - sum
    };

    catTo.total = catFrom.total + sum;
    
    await catFrom.save();
    await catTo.save();
    return res.json(action);
  }

  async edit () {
    
  }

  async delete () {
    
  }
}

export const actionController = new ActionController();
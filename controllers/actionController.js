import { Action, Category } from '../db/models.js';
import { Op } from 'sequelize';

class ActionController {
  async getAll (req, res) {
    let actions;
    const {catId} = req.query;
    console.log(req.query);
    if (!catId) {
      actions = await Action.findAll();
    } else {
      actions = await Action.findAll({where: {
        [Op.or]: [ 
          {from: catId},
          {to: catId},
        ]
      }});
    }
    return res.json(actions);
  }

  async getById (req, res) {
    const { id } = req.params;
    const action = await Action.findOne({where: {id}})
    return res.json(action);
  }

  async create (req, res) {
    const { sum, from, to, date } = req.body;
    const action = await Action.create( { sum, from, to, date} );

    const catFrom = await Category.findByPk(from);
    const catTo = await Category.findByPk(to);
    
    if (catFrom.type === "income") {
      catFrom.total = +catFrom.total + sum;
    } else {
      catFrom.total = +catFrom.total - sum
    };

    catTo.total = +catFrom.total + sum;
    
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
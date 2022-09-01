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

    this.updateCategories(from, to, sum);

    return res.json(action);
  }

  async edit () {
    const { id, sum, from, to, date } = req.body;

    const action = await Action.find({where: {id}});
    action = req.body;
    action.save();

    this.updateCategories(from, to, sum);

    return res.json(action);
  }

  async delete () {
    const { id } = req.body;
    const action = await Action.find({where: {id}});
    this.updateCategories(action.from, action.to, -action.sum);
    
    await Action.destroy({where: {id}});
    return res.json({ message:`Action with id ${id} deleted.`});
  }

  async updateCategories (from, to, sum) {
    const catFrom = await Category.findByPk(from);
    const catTo = await Category.findByPk(to);
    
    if (catFrom.type === "income") {
      catFrom.total = Number(catFrom.total) + Number(sum);
    } else {
      catFrom.total = Number(catFrom.total) - Number(sum)
    };

    catTo.total = Number(catTo.total) + Number(sum);

    await catFrom.save();
    await catTo.save();
  }
}

export const actionController = new ActionController();
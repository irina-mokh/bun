import { Action, Category } from '../db/models.js';
import { Op } from 'sequelize';

class ActionController {
  async getAll (req, res) {
    let actions;
    const {catId} = req.query;
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
    console.log('req body', req.body);
    console.log('create act: date', date);
    const action = await Action.create( { sum, from, to, date } );
    await updateCategories(from, to, sum);

    return res.json(action);
  }

  async edit (req, res) {
    const { id, sum, from, to, date } = req.body;
    let prev = await Action.findOne({where: {id}});
    let diffSum = sum - prev.sum;

    // if any category changed
    if (prev.from != from || prev.to != to){
      updateCatTotal(prev.from, -sum);
      updateCatTotal(prev.to, -sum);
      diffSum = sum;
    }
    await updateCategories(from, to, diffSum);

    const actionNew = await Action.update({sum, from, to, date}, {where: {id}});
    return res.json(actionNew);
  }

  async delete (req, res) {
    const { id } = req.body;
    const action = await Action.findOne({where: {id}});

    if (action.from && action.to) {
      await updateCategories(action.from, action.to, -action.sum);
    }
    
    await Action.destroy({where: {id}});
    return res.json({ message:`Action with id ${id} deleted.`});
  }
}

export const actionController = new ActionController();

async function updateCatTotal (id, sum){
  const cat = await Category.findByPk(id);
  if (cat.type === "income") {
    await Category.update({total: Number(cat.total) - Number(sum)}, {where: {id}});
  } else {
    await Category.update({total: Number(cat.total) + Number(sum)}, {where: {id}});
  };
}
async function updateCategories (from, to, sum) {
  updateCatTotal(from, -sum);
  updateCatTotal(to, sum);
}
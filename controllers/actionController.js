import { Action } from '../db/models.js';
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
    const action = await Action.create( { sum, from, to, date } );

    return res.json(action);
  }

  async edit (req, res) {
    const { id } = req.body;
    const action = await Action.findOne({where: {id}})
    action.update({...req.body});

    return res.json(action);
  }

  async delete (req, res) {
    const { id } = req.body;
    
    await Action.destroy({where: {id}});
    return res.json({ message:`Action with id ${id} deleted.`});
  }
}

export const actionController = new ActionController();

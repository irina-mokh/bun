import { Action } from '../db/models.js';

class ActionController {
  async getAll (req, res) {
    const { columnId } = req.body;
    let actions;
    if (!columnId) {
      actions = await Action.findAll();
    } else {
      actions = await Action.findAll({where: {columnId}});

    }

    return res.json(actions);
  }

  async getById () {
    
  }

  async create (req, res) {
    const { sum, from, to } = req.body;
    const action = await Action.create( { sum, from, to} );
    return res.json(action);
  }

  async edit () {
    
  }

  async delete () {
    
  }
}

export const actionController = new ActionController();
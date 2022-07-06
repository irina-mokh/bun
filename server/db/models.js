import { sequelize } from './index.js';
import { DataTypes } from "sequelize";

export const User = 
  sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {type: DataTypes.STRING},
})

export const Action = sequelize.define('action', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sum: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
});

// export const CategoryType = sequelize.define('categoryType', {
//   name: {
//       primaryKey: true,
//       allowNull: false,
//       type: DataTypes.STRING,
//       unique: true,
//   },
// }, { 
//   timestamps: false,
// })

export const Category = sequelize.define('category', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['income', 'asset', 'expense']],
    },
  },
  total: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
  name: { type: DataTypes.STRING, allowNull: false},
}, { 
  timestamps: false,
})

// CategoryType.hasOne(Category, {foreignKey: 'type'});
// Category.belongsTo(CategoryType, {foreignKey: 'type'});


// Category.hasMany(Action);
// Category.hasMany(Action, { as: 'actTo', foreignKey : 'catToId'});
// Category.hasMany(Action, { as: 'actFrom', foreignKey : 'catFromId'});
Action.belongsTo(Category, {foreignKey: 'to'});
Action.belongsTo(Category, {foreignKey: 'from'});

// Category.hasOne(Action);
// Action.belongsTo(Category);

// Action.belongsTo(Category, { foreignKey: 'actionTo'});
// Category.belongsToMany(Action, { through: 'actionTo'});

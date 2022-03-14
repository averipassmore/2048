const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  },
  cell1: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell2: {
    type: Sequelize.INTEGER,
    default: 0
  },
  cell3: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell4: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell5: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell6: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell7: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell8: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell9: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell10: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell11: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell12: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell13: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell14: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell15: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  cell16: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  currentScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  highScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
User.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))

const { Model } = require('objection');

class Expense extends Model {
  static get tableName() {
    return 'expense';
  }
}

module.exports = {
  Expense,
};
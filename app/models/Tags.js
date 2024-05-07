const { Model } = require('objection');

class Tags extends Model {
  static get tableName() {
    return 'tags';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['tag'],

      properties: {
        id: { type: 'integer' },
        created_date: { type: 'string', format: 'date-time' },
        updated_date: { type: 'string', format: 'date-time' },
        tag: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Expense = require('./Expense');

    return {
      expense: {
        relation: Model.ManyToManyRelation,
        modelClass: Expense,
        join: {
          from: 'tags.id',
          through: {
            from: 'expense_tags.tag_id',
            to: 'expense_tags.expense_id',
          },
          to: 'expense.id'
        }
      }
    };
  }
}

module.exports = Tags;
const { Model } = require('objection');

class Expense extends Model {
    static get tableName() {
        return 'expense';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['description', 'amount', 'date'],

            properties: {
                id: { type: 'integer' },
                created_date: { type: 'string', format: 'date-time' },
                updated_date: { type: 'string', format: 'date-time' },
                date: { type: 'string', format: 'date-time' },
                description: { type: 'string' },
                amount: { type: 'number' }
            }
        };
    }

    static get relationMappings() {
        const Tags = require('./Tags');
        return {
            tags: {
                relation: Model.ManyToManyRelation,
                modelClass: Tags,
                join: {
                    from: 'expense.id',
                    through: {
                        from: 'expense_tags.expense_id',
                        to: 'expense_tags.tag_id'
                    },
                    to: 'tags.id'
                }
            }
        };
    }
}

module.exports = Expense;
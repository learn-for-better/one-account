const { Model } = require('objection')

class Deposit extends Model{
    static get tableName(){
        return 'deposit_record';
    }

    static get jsonSchema(){
        return {
            type: 'object',
            required: ['description', 'date', 'amount'],
            properties: {
                id: { type: 'integer' },
                description: { type: 'string' },
                date: { type: 'string', format: 'date-time' },
                amount: { type: 'number' }
            }
        }
    }
}

module.exports = Deposit;
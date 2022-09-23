const catSchema = {
    id: '/Cat',
    type: 'object',
    properties: {
        firstName: {
            type: "string",
            description: "First name of cat"
        },
        lastName: {
            type: "string",
            description: "Last name of cat"
        },
        colorType: {
            type: 'string',
            description: 'Brief description about the cat color type'
        },
        age: {
            type: 'integer',
            description: 'A numeric int representing the age of the cat'
        },
        nicknames: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        favoriteMeals: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    },
    required: ['firstName', 'lastName', 'colorType', 'age']
}

export { catSchema }
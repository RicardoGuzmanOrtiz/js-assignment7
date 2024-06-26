const express = require('express');
const router = express.Router();

const { getCollection, ObjectId } = require('../todo-db')

// GET /api/todos
router.get('/', async (_, response) => {
    const collection = await getCollection('todo-api', 'todos')
    const todos = await collection.find({}).toArray()
    // Map to rename _id to id to use it on the put 
    const updatedId = todos.map(todo => {
        const { _id, ...rest } = todo
        return { id: _id, ...rest }
    });

    response.json(updatedId);
});

// POST /api/todos
router.post('/', async (request, response) => {
    // this maps to POST /api/todos
    const collection = await getCollection('todo-api', 'todos')
 const { item } = request.body; 
 const complete = false
    const result = await collection.insertOne({ item, complete }) 
	response.json(result)
})

// PUT /api/todos/:id
router.put('/:id', async (request, response) => {
   
    
        const { id } = request.params;
        const collection = await getCollection('todo-api', 'todos');
        const todo = await collection.findOne({ _id: new ObjectId(id) });
        const complete = !todo.complete;
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } });
       
        response.json(result); 
}); 



module.exports = router;

module.exports = app =>{
    const TodoItemsController = require('../controllers/TodoItems')(app)
    app.route('/api/TodoItems').get(TodoItemsController.getAll)
    app.route('/api/TodoItems/:id').get(TodoItemsController.getOne)
    app.route('/api/TodoItems/:id').put(TodoItemsController.update)
    app.route('/api/TodoItems/:id').delete(TodoItemsController.deleteOne)
    app.route('/api/TodoItems/concluir/:id').get(TodoItemsController.concluir)
    
    app.route('/api/TodoItems/reabrir/:id')
       .get(TodoItemsController.validaSenhaSupervisor,TodoItemsController.reabrir)
    
       app.route('/api/TodoItems')
       .post(TodoItemsController.validate,TodoItemsController.create)
       app.route('/api/randominsert')
       .get(TodoItemsController.randomInsert)
}
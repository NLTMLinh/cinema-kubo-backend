module.exports = (app) => {
	const roomController = require('../controllers/room.controller');

	app.get('/room', roomController.read);
	app.get('/room/single', roomController.getOne);
	app.post('/room', roomController.create);
	app.put('/room', roomController.update);
	app.delete('/room', roomController.delete);
};

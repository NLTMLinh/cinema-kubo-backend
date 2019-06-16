module.exports = (app) => {
	const typeuser = require('../controllers/typeuser.controller');

	app.get('/typeuser', typeuser.read);
	app.post('/typeuser', typeuser.create);
	app.put('/typeuser', typeuser.update);
	app.delete('/typeuser', typeuser.delete);
};

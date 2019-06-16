module.exports = (app) => {
	const branchFavo = require('../controllers/user-branchfavorite.controller');

	app.get('/branch-favo', branchFavo.read);
	app.post('/branch-favo', branchFavo.create);
	app.delete('/branch-favo', branchFavo.delete);
};

module.exports = (app) => {
    const filmFavo = require('../controllers/user-filmfavorite.controller');

    app.get('/film-favo', filmFavo.read);
    app.post('/film-favo', filmFavo.create);
    app.delete('/film-favo', filmFavo.delete);
};

module.exports = (app) => {
    const typeFavo = require('../controllers/user-filmfavorite.controller');

    app.get('/type-favo', typeFavo.read);
    app.post('/type-favo', typeFavo.create);
    app.delete('/type-favo', typeFavo.delete);
};

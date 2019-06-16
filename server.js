const express = require('express');
const bodyPaser = require('body-parser');
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose
	.connect(dbConfig.url, { useNewUrlParser: true })
	.then(() => {
		console.log('Successfully connected to the database');
	})
	.catch((err) => {
		console.log('Could not connect to the database. Exiting now...', err);
		process.exit();
	});

require('./app/routes/typefilm.route.js')(app);
require('./app/routes/user.route')(app);
require('./app/routes/branch.route')(app);
require('./app/routes/img-branch.route')(app);
require('./app/routes/comment.route')(app);
require('./app/routes/user-branchfavorite.route')(app);
require('./app/routes/user-typefavorite.route')(app);
require('./app/routes/film.route')(app);
require('./app/routes/img-film.route')(app);
require('./app/routes/room.route')(app);

app.get('/', (req, res) => {
	res.json({ message: 'Simple app' });
});

app.listen(parseInt(process.env.PORT) || 4500, () => {
	console.log('Server is listening port 4500!!! or server');
});

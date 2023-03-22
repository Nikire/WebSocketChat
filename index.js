/* const {
	testConnection,
} = require('./src/helpers/sequelize'); */
require('dotenv').config();

// Require Express and Sequelize
/* const server = require('./src/server');
const { sequelize, models } = require('./src/sequelize');

// Test Sequelize connection
testConnection(sequelize);
// Start Express server
const { PORT } = process.env;
sequelize.sync({ force: true }).then(() => {
	server.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`);
	});
});
 */

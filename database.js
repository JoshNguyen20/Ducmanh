const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('property_db', 'root', '311202', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false  
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL successfully!');
    } catch (error) {
        console.error('Unable to connect to MySQL:', error);
    }
})();

module.exports = sequelize;

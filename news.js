const { DataTypes } = require('sequelize');
const sequelize = require('./database'); 

// Define the News model
const News = sequelize.define('news', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
    published_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'news',  
    timestamps: false   
});


module.exports = News;

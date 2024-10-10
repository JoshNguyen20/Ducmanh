const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const News = require('./news');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// API để tìm kiếm tin tức theo ID
app.get('/api/news/searchByID/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Tìm kiếm tin tức theo ID
        const news = await News.findByPk(id);

        if (news) {
            res.json({
                news: news.toJSON(),
                time: new Date().toISOString()
            });
        } else {
            res.status(404).json({ message: 'News not found' });
        }
    } catch (error) {
        console.error('Error searching news by ID:', error);
        res.status(500).json({ error: 'Error searching news.' });
    }
});
app.get('/api/news/searchByTitle/:title', async (req, res) => {
    const { title } = req.params;  // Lấy giá trị title từ req.params
    console.log('Title received:', title); // Sửa thông báo để phù hợp

    try {
        // Tìm kiếm tin tức theo tiêu đề
        const news = await News.findAll({
            where: {
                title: {
                    [sequelize.Sequelize.Op.like]: `%${title}%`  // Tìm tiêu đề chứa từ khóa
                }
            }
        });

        if (news.length > 0) {
            res.json({
                count: news.length,
                news: news.map(n => n.toJSON()), 
                time: new Date().toISOString()
            });
        } else {
            res.status(404).json({ message: 'News not found' });
        }
    } catch (error) {
        console.error('Error searching news by title:', error);
        res.status(500).json({ error: 'Error searching news.' });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;

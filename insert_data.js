const sequelize = require('./database');
const News = require('./news');
const { faker } = require('@faker-js/faker'); 

// Định nghĩa hàm insertData
const insertData = async () => {
    try {
        await sequelize.sync(); 

        // Chèn 20,000 bản ghi
        for (let i = 0; i < 20000; i++) {
            await News.create({
                title: faker.lorem.sentence(), 
                content: faker.lorem.paragraphs(2), 
                published_at: faker.date.recent(365).toISOString().slice(0, 19).replace('T', ' ') 
            });
            if (i % 1000 === 0) {
                console.log(`${i} bản ghi đã được chèn...`); 
            }
        }

        console.log("Đã chèn thành công 20,000 bản ghi tin tức.");
    } catch (error) {
        console.error('Không thể chèn dữ liệu:', error); 
    } finally {
        await sequelize.close(); 
    }
};


insertData();

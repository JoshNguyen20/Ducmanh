const sequelize = require('./database'); 
const Employee = require('./employee'); 


(async () => {
    try {
        await sequelize.sync();
        console.log('Bảng đã được tạo thành công!');
    } catch (error) {
        console.error('Không thể tạo bảng:', error);
    } finally {
        await sequelize.close(); 
    }
})();

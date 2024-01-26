const express = require('express');
const app = express();

// Middleware: Common validate - Kiểm tra xem tham số trong yêu cầu có được cung cấp hay không
const commonValidate = (req, res, next) => {
    const { param } = req.query;
    if (!param) {
        return res.status(400).json({ error: 'Tham số bị thiếu' });
    }
    next();
};

// Middleware: Custom validate - Kiểm tra xem tham số trong yêu cầu có phải là số chẵn hay không
const customValidate = (req, res, next) => {
    const { param } = req.query;
    if (isNaN(param)) {
        return res.status(400).json({ error: 'Tham số không phải là số' });
    }
    if (param % 2 !== 0) {
        return res.status(400).json({ error: 'Tham số không phải là số chẵn' });
    }
    next();
};

// Route sử dụng cả common validate và custom validate
app.get('/route', commonValidate, customValidate, (req, res) => {
    const { param } = req.query;
    res.json({ message: `Tham số hợp lệ: ${param}` });
});

// Khởi động server
app.listen(3000, () => {
    console.log('Server đang chạy trên cổng 3000');
});
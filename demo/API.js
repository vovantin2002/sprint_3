const express = require('express');
const cors = require('cors');


const app = express();

// Sử dụng middleware CORS
app.use(cors());

// Route GET /api/books trả về dữ liệu JSON
app.get('/api/books', (req, res) => {
    const books = [
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
        { id: 3, title: 'Book 4' }
    ];
    res.json(books);
});

// Khởi động server trên cổng 3001
app.listen(3001, () => {
    console.log('RESTful API đang chạy trên cổng 3001');
});
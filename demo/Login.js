require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');




const app = express();
app.use(express.json());
// Sử dụng middleware CORS
app.use(cors());
const secretKey = 'khoa-bi-mat-cua-tincute';

// Route xử lý yêu cầu đăng nhập
app.post('/login', (req, res) => {
    // Kiểm tra thông tin đăng nhập hợp lệ
    const { username, password } = req.body;

    // Kiểm tra thông tin đăng nhập
    if (username === 'vovantin' && password === '123') {
        // Tạo JWT
        const payload = { username: username };
        const token = jwt.sign(payload, secretKey);

        // Gửi JWT về cho người dùng
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Route bảo vệ yêu cầu tài nguyên
// app.get('/protected', (req, res) => {
//     // Lấy JWT từ header hoặc query parameter
//     const token = req.headers.authorization || req.query.token;
//
//     if (!token) {
//         // Nếu không có JWT, từ chối truy cập
//         return res.status(401).json({ error: 'Access denied' });
//     }
//
//     try {
//         // Xác thực và giải mã JWT
//         const decoded = jwt.verify(token, secretKey);
//
//         // Thực hiện xử lý dựa trên thông tin giải mã từ JWT
//         const username = decoded.username;
//         res.json({ message: `Hello, ${username}! You have accessed the protected resource.` });
//     } catch (error) {
//         // Nếu JWT không hợp lệ, từ chối truy cập
//         res.status(401).json({ error: 'Invalid token' });
//     }
// });

// Khởi chạy server
app.listen(process.env.PORT, () => {
    console.log('Server running on port 3000');
});
const mysql = require('mysql2');

// Tạo kết nối MySQL
const connection = mysql.createConnection({
    host: 'localhost',       // Địa chỉ máy chủ MySQL
    user: 'root',            // Tên người dùng MySQL
    password: '123456', // Mật khẩu MySQL
    database: 'thiii'  // Tên cơ sở dữ liệu MySQL
});

// Kết nối với MySQL
connection.connect(function(err) {
    if (err) {
        console.error('Lỗi kết nối: ' + err.stack);
        return;
    }

    console.log('Đã kết nối với MySQL với ID kết nối: ' + connection.threadId);
});

// // Thực hiện truy vấn SQL
// connection.query('SELECT * FROM tranh', function(err, results, fields) {
//     if (err) {
//         console.error('Lỗi truy vấn: ' + err.stack);
//         return;
//     }
//
//     console.log('Kết quả truy vấn:', results);
// });
//
// // INSERT
// const newType = { name: 'john' };
// connection.query('INSERT INTO the_loai SET ?', newType, function(err, results, fields) {
//     if (err) {
//         console.error('Lỗi truy vấn INSERT: ' + err.stack);
//         return;
//     }
//
//     console.log('Loại tranh đã được thêm vào với ID:', results.insertId);
// });
//
// // UPDATE
// const the_loai_id = 3;
// const updatedName = 'vo van tin';
// connection.query('UPDATE the_loai SET name = ? WHERE the_loai_id = ?', [updatedName, the_loai_id], function(err, results, fields) {
//     if (err) {
//         console.error('Lỗi truy vấn UPDATE: ' + err.stack);
//         return;
//     }
//
//     console.log('Đã cập nhật name cho loại tranh với ID:', the_loai_id);
// });
//
// // // JOIN
const query = `
    SELECT  tranh.hoa_si, tranh.kich_thuoc, tranh.nam_ve, the_loai.the_loai_id, the_loai.name
    FROM tranh
    JOIN the_loai ON the_loai.the_loai_id = tranh.the_loai_id
  `;
connection.query(query, function(err, results, fields) {
    if (err) {
        console.error('Lỗi truy vấn JOIN: ' + err.stack);
        return;
    }

    console.log('join :', results);
});

// Đóng kết nối MySQL khi không cần thiết
connection.end();

//require package mongoose vào dự án
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// Sử dụng middleware CORS
app.use(cors());
const port = 3000;
//kết nối với server của mongodb
mongoose.connect("mongodb://127.0.0.1:27017/express").then((data) => {
    console.log("connect thành công");
}).catch((e) => {
    console.log("Lỗi");
});

// định nghĩa các giá trị của một collection
const Schema = mongoose.Schema;
const userSchema = new Schema({
    //muốn định nghĩa bao nhiêu giá trị cho collection cũng được nhé với cú pháp:
    // tên cột : tên kiểu giá trị
    username: String,
    password: String,
});


// Định nghĩa schema cho collection "posts"
const postSchema = new Schema({
    title: String,
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'user' },
});

// Tạo các model dựa trên schema
const UserModel = mongoose.model('user', userSchema);
const PostModel = mongoose.model('post', postSchema);

// Triển khai "join" bằng tham chiếu
PostModel.find()
    .populate('author') // Kết hợp (join) với collection "users" dựa trên trường "author"
    .exec()
    .then(posts => {
        console.log(posts);
    })
    .catch(err => {
        console.error(err);
    });

// Định nghĩa route để lấy dữ liệu từ MongoDB và trả về JSON
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find().sort({ username: -1 });
        res.json(users);
    } catch (error) {
        console.error('Lỗi khi truy vấn users:', error);
        res.status(500).json({ error: 'Lỗi khi truy vấn users' });
    }
});
// sắp xếp
app.get('/user', async (req, res) => {
    try {
        const users = await UserModel.find().sort({ username: 1 });
        res.json(users);
    } catch (error) {
        console.error('Lỗi khi truy vấn users:', error);
        res.status(500).json({ error: 'Lỗi khi truy vấn users' });
    }
});
// Route API tìm kiếm
app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await searchUserById(userId);
    res.json({user});
});

async function searchUserById(userId) {
    try {
         const user = await UserModel.find({ username:{
                 $regex: new RegExp(userId, 'i')
             }  });
         return user;
    } catch (error) {
        console.error('Lỗi:', error);
    }
}
// Khởi động server
app.listen(port, () => {
    console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});
//định nghĩa một collection cụ thể
// const UserModel = mongoose.model('user', userSchema);
/*
    Trong đó:
        'user': tên collection chúng ta đặt
        UserModel: là biến đại diện cho collect, chúng ta dùng biến này
                    để tương tác database như thêm, sửa, xóa, hiển thị,...
*/
// insert
// UserModel.create({
//     //cú pháp: tên cột đã định nghĩa trong Schema và giá trị của cột đó
//     username: 'vovantin',
//     password: '123',
// }).then((res) => {
//     console.log(res);
// });
// find all
// UserModel.find().then((value) => {
//     console.log(value);
// });

// find by id
// UserModel.find({_id:'65a49fae8772b422d09de937'}).then((value) => {
//     console.log(value);
// });
// find all and sort by username
// UserModel.find().sort({username:-1}).then((value) => {
//     console.log(value);
// });
// Thực hiện thao tác join (sử dụng aggregation framework)
// const ordersCollection = database.collection('orders'); // Thay đổi 'orders' thành tên collection khác trong database của bạn
//
// const aggregationResult = await usersCollection.aggregate([
//     {
//         $lookup: {
//             from: 'orders',
//             localField: '_id',
//             foreignField: 'userId',
//             as: 'userOrders'
//         }
//     }
// ]).toArray();
//
// console.log('Kết quả join:', aggregationResult);

// Đóng kết nối đến MongoDB
// await client.close();
// console.log('Đã đóng kết nối đến MongoDB');
// }

// run().catch(console.error);
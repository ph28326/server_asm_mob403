const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const Phone = require('./model/phone');
const User = require('./model/user');

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect("mongodb+srv://toantqkph28326:toantqkph28326@cluster0.pdvbfsv.mongodb.net/api?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Đã kết nối thành công đến MongoDB');
  })
  .catch((error) => {
    console.error('Lỗi kết nối đến MongoDB:', error);
  });

// Khởi tạo ứng dụng Express
const app = express();

// Cấu hình middleware và các tuyến đường
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// Tạo tài khoản
app.post('/registerNewUser', async(req, res) =>{
  try {
    const { name, password, email, address } = req.body;
    const newUser = new User({ name, password, email, address });
    await newUser.save();

    const list = await User.find().lean();
    res.json(list);
    console.assert("tao thanh cong")
} catch (err) {
    console.error('Error register new user:', err);
    res.status(500).json({ error: 'Internal server error' });
}
})
// Đăng nhập
app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const result =  User.findOne({ email, password })
  } catch (error) {
    
  }
  try {

    const { email, password } = req.body;

    User.findOne({ email, password }, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (!user) {
        res.status(401).json({ error: 'Invalid username or password' });
      }
        res.status(200).json({ message: 'Login successful' });
      
    });
  } catch (error) {
    
  }

  
});

app.get('/listPhone', async function (req, res){
  try {
      const list = await Phone.find().lean();
      console.log('da hien thi danh sach');
      res.json(list);   
  }catch(err){
      console.log('Error fetching products:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
})

// Định nghĩa API thêm sản phẩm
app.post('/addPhones', async (req, res) => {
  try {
      const { name, brand, price, quantity } = req.body;
      const phone = new Phone({ name, brand, price, quantity });
      await phone.save();
      //res.json(car);
      const list = await Phone.find().lean();
      res.json(list);
  } catch (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
});
// Định nghĩa API sửa đổi sản phẩm
app.put('/phones/:phoneId', async (req, res) => {
  try {
    const { phoneId } = req.params;
    const { name, brand, price, quantity } = req.body;
    const phone = await Phone.findByIdAndUpdate(
      phoneId,
      { name, brand, price, quantity },
      { new: true }
    );
    res.json(phone);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Định nghĩa API xóa sản phẩm
app.delete('/phones/:phoneId', async (req, res) => {
  try {
    const { phoneId } = req.params;
    await Phone.findByIdAndRemove(phoneId);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Khởi chạy máy chủ
app.listen(3000, () => {
  console.log('Server đang lắng nghe trên cổng 3000');
});
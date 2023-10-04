const express = require("express");

const cors = require("cors");

const ApiError = require("./app/api-error");

const app = express();

const contactsRouter = require("./app/routes/contact.route");
app.use(cors());

app.use("/api/contact", contactsRouter);

app.use((req,res,next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
    });

app.use(express.json());

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
      message: err.message || 'Internal Server Error',
    });
  });

app.use("/api/contacts", contactsRouter);

module.exports = app;


const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());  // enable CORS
app.use(express.json());

app.use('/users', createProxyMiddleware({
    target: 'http://user-service:3001',
    changeOrigin: true
}));

app.use('/tasks', createProxyMiddleware({
    target: 'http://task-service:3002',
    changeOrigin: true
}));

app.get('/', (req, res) => {
    res.send("API Gateway is running");
});

app.listen(3000, () => console.log("API Gateway running on 3000"));

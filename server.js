const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 将API路由改为Vercel兼容的格式
app.post('/generate-blessing', async (req, res) => {
    try {
        const response = await axios.post('https://ark.cn-beijing.volces.com/api/v3/chat/completions', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c0e0a23f-15bb-4f6c-80c1-ca560a13a727'
            },
            timeout: 120000 // 设置120秒超时
        });
        res.json(response.data);
    } catch (error) {
        console.error('API Error:', error.message);
        const errorMessage = error.code === 'ECONNABORTED' ? 
            { error: '请求超时，请稍后重试' } : 
            { error: '服务器内部错误' };
        res.status(500).json(errorMessage);
    }
});

// 导出app实例供Vercel使用
module.exports = app;

// 仅在本地开发时启动服务器
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`服务器运行在 http://localhost:${PORT}`);
    });
}
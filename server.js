const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/api/generate-blessing', async (req, res) => {
    try {
        const response = await axios.post('https://ark.cn-beijing.volces.com/api/v3/chat/completions', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer c0e0a23f-15bb-4f6c-80c1-ca560a13a727'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
const express = require('express');
const cors = require('cors');
const axios = require('axios');

async function handler(req, res) {
    if (req.method === 'POST') {
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
    } else {
        res.status(405).json({ error: '方法不允许' });
    }
}

module.exports = handler;
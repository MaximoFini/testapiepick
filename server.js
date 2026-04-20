const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const BASE_URL = 'https://e-pick.cl/api';
let currentToken = null;

// 1. Login
app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password, source: 'API' })
    });
    
    const data = await response.json();
    if (data.token) {
      currentToken = data.token;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Calcular cotización
app.post('/api/calculator', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/calculator/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': currentToken
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Crear orden
app.post('/api/create-order', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/integrations/confirm-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': currentToken
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Confirmar orden lista
app.get('/api/confirm/:id/:sender_code', async (req, res) => {
  try {
    const { id, sender_code } = req.params;
    const response = await fetch(`${BASE_URL}/orders/confirm/${id}/${sender_code}`, {
      headers: { 'x-access-token': currentToken }
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Tracking
app.get('/api/tracking/:id', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/tracking/${req.params.id}`, {
      headers: { 'x-access-token': currentToken }
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook receiver (para pruebas)
app.post('/webhook', (req, res) => {
  console.log('Webhook recibido:', JSON.stringify(req.body, null, 2));
  res.json({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

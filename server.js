const express = require('express');
const cors = require('cors'); 
const app = express();


app.use(cors({ origin: 'http://localhost:3000' }));

app.get('api/getUsers.php', (req, res) => {

  const axios = require('axios');
  axios.get('http://localhost:3001/getUsers.php')
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    });
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

const express = require('express');
const app = express();
const shortRoutes = require('./src/routes/shortRoutes');

app.use(express.json());

app.use('/', shortRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});

const express = require('express');
const bookSessionRoute = require('./routes/bookSession');

const app = express();
app.use(express.json());

app.use('/book-session', bookSessionRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

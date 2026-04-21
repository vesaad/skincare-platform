const app = require('./app');
const connectMongo = require('./config/mongodb');

const PORT = process.env.PORT || 3001;

connectMongo();

app.listen(PORT, () => {
  console.log(`Server po dëgjon në port ${PORT}`);
});
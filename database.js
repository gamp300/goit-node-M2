const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://gamp300:yWWcuqBbX08jsQVg@cluster0.zm46oa7.mongodb.net',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error de conexión:', error);
  process.exit(1);
});
db.once('open', () => {
  console.log('Conexión a la base de datos exitosa');
});

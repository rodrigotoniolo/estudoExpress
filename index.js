const express = require('express'); //criar modulo
const app = express();

// console.log(app);

app.get('/', (request,response) => {
    response.send('Olá Mundo!');
})

app.listen(3000, () => {
    console.log('Servidor rodando!');
})
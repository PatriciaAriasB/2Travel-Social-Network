const express = require("express");
const app = express();
const PORT = 3000;
const { dbConnection } = require("./config/config")

app.use(express.json())

dbConnection()
console.log('hola')

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

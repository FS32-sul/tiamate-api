const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./src/routes/usuarioRoutes");

const app = express();

// middlewares
app.use(cors()); // libera requisições vindas de outros dominios
app.use(express.json()); // transforma o corpo da requisição de json para js


app.get("/", (req, res) => {
    res.json({
        mensagem: "Olá mundo"
    });
});

app.use("/usuarios", usuarioRoutes);


// quando a rota não for encontrada cai aqui
app.use((req, res) => {
    res.status(404).json({ 
        mensagem: "Rota não encontrada"
    });
});

app.listen(8000, () => {
    console.log("Servidor on: http://localhost:8000");
});
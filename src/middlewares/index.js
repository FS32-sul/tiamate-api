const jwt = require("jsonwebtoken");

function rotaProtegida(req, res, next){
    let auth = req.headers.authorization;
    if(auth){
        let token = auth.split(" ")[1];
        jwt.verify(token, process.env.SEGREDO, (error) => {
            if(error){
                res.json({
                    mensagem: "Token inválido"
                })
                return
            }
            next()
        })
    }else{
        res.json({
            mensagem: "Token é obrigatório"
        })
    }
}

module.exports = {
    rotaProtegida
}
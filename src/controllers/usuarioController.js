const { PRISMACLIENT } = require("../services");
const bcrypt = require("bcrypt");

async function buscar(req, res) {
    try {
        const linhas = await PRISMACLIENT.usuarios.findMany({
            orderBy: {
                id: "asc"
            }
        });
        res.status(200).json(linhas);
    } catch (error) {
        res.status(500).json({
            mensagem: `Error: ${error.message}`
        });
    }
}

async function criar(req, res) {
    try {
        let dados = req.body;
        dados.senha = await bcrypt.hash(dados.senha, 10);
        
        const linha = await PRISMACLIENT.usuarios.create({
            data: dados
        });

        if(linha.id){
            res.status(201).json({ 
                mensagem: "Registro criado com sucesso"
            });
        } else {
            res.status(200).json({ 
                mensagem: "Falha ao criar registro"
            });
        }

    } catch (error) {
        res.status(500).json({
            mensagem: `Error: ${error.message}`
        });
    }
}

async function editar(req, res) {
    try {
        let dados = req.body;
        if(dados.senha){
            dados.senha = await bcrypt.hash(dados.senha, 10);
        }
        
        const linha = await PRISMACLIENT.usuarios.update({
            data: dados,
            where: {
                id: Number(req.params.id)
            }
        });

        if(linha.id){
            res.status(201).json({ 
                mensagem: "Registro atualizado com sucesso"
            });
        } else {
            res.status(200).json({ 
                mensagem: "Falha ao atualizar registro"
            });
        }

    } catch (error) {
        res.status(500).json({
            mensagem: `Error: ${error.message}`
        });
    }
}

async function deletar(req, res) {
    try {
        await PRISMACLIENT.usuarios.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.status(200).json({ 
            mensagem: "Registro apagado com sucesso"
        });

    } catch (error) {
        res.status(500).json({
            mensagem: `Error: ${error.message}`
        });
    }
}

module.exports = {
    buscar,
    criar,
    editar,
    deletar
}
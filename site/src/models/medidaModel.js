var database = require("../database/config");

function buscarUltimasMedidas(limite_linhas,idUsuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ''
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select pontuacao from Ranking, usuario where idRanking = fkRanking and idUsuario = ${idUsuario}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idUsuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function treinamento(nome) {
    console.log("Entrei no treinamento")
    instrucaoSql = ''
        instrucaoSql = `insert into usuario values (null,'${nome}')`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tabela(acertos) {
    console.log(acertos);
    var pontuacao = '';

    if (acertos >= 0 && acertos <= 1) {
        pontuacao = 'forma base'
    }
    else if (acertos >= 2 && acertos <= 3) {
        pontuacao = 'SSJ1'
    }
    
    else if (acertos >= 2 && acertos <= 3) {
        pontuacao = 'SSJ2'
    }
    
    else if (acertos >= 2 && acertos <= 3) {
        pontuacao = 'SSJ3'
    }
    
    else if (acertos >= 2 && acertos <= 3) {
        pontuacao = 'SSJ4'
    }
    instrucaoSql = ''
        instrucaoSql = `insert into Ranking(pontuacao) values ('${pontuacao}')`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    treinamento,
    tabela
}

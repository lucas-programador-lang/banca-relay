const express = require('express');
const app = express();

app.use(express.json());

app.post('/saque', async (req, res) => {
    try {
        const resposta = await fetch('https://app.vizzionpay.com.br/api/v1/gateway/transfers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-public-key': req.headers['x-public-key'],
                'x-secret-key': req.headers['x-secret-key']
            },
            body: JSON.stringify(req.body)
        });
        const dados = await resposta.json();
        return res.status(resposta.status).json(dados);
    } catch (erro) {
        return res.status(500).json({ error: erro.message });
    }
});

const PORTA = process.env.PORT || 8000;
app.listen(PORTA, async () => {
    console.log(`[ON] Servidor Relay a correr na porta ${PORTA}`);
    try {
        const ipFetch = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipFetch.json();
        console.log(`\n========================================`);
        console.log(`O SEU IP DE SAÍDA É: ${ipData.ip}`);
        console.log(`Copie este IP para o painel da Vizzion Pay!`);
        console.log(`========================================\n`);
    } catch (e) {}
});

/**
 * server.js
 *
 * Ponto de entrada da aplicação backend.
 *
 * Responsável por:
 * - Carregar variáveis de ambiente (.env)
 * - Inicializar o servidor HTTP
 * - Definir a porta de execução
 *
 * NÃO contém lógica de negócio.
 * Apenas inicia o servidor Express configurado em expressApp.js.
 */

require("dotenv").config(); // Carrega variáveis do .env
const app = require("./expressApp"); // Importa configuração do Express

const PORT = process.env.PORT || 3000;

// --- INICIALIZA SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

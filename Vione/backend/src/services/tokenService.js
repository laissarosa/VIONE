/**
 * tokenService.js
 *
 * Responsável por:
 * - Gerar tokens JWT
 * - Validar tokens JWT
 *
 * IMPORTANTE: defina JWT_SECRET no arquivo .env
 * Exemplo: JWT_SECRET=minha_chave_super_secreta_aqui
 */

const jwt = require("jsonwebtoken");

// Falha rápido na inicialização — melhor do que falhar silenciosamente
// na primeira requisição de login.
const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  console.error(
    "\n[tokenService] ERRO CRÍTICO: JWT_SECRET não definido no .env!\n" +
    "Adicione  JWT_SECRET=qualquer_string_longa  no seu arquivo .env\n"
  );
  // Não derruba o processo — mas toda chamada a generateToken vai lançar.
}

/**
 * Gera um token JWT com payload informado.
 * Lança erro explícito se JWT_SECRET não estiver configurado.
 */
exports.generateToken = (payload) => {
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET não configurado. Verifique o arquivo .env.");
  }
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

/**
 * Valida e decodifica um token JWT.
 * Retorna o payload decodificado ou lança erro se inválido/expirado.
 */
exports.verifyToken = (token) => {
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET não configurado. Verifique o arquivo .env.");
  }
  return jwt.verify(token, SECRET_KEY);
};
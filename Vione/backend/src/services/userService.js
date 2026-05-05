/**
 * userService.js
 *
 * Responsável por:
 * - Operações de banco de dados relacionadas ao usuário
 */

const prisma = require("../database/db");

/**
 * Busca usuário pelo email.
 */
exports.findByEmail = async (email) => {
  return prisma.usuario.findUnique({ where: { email: email.toLowerCase() } });
};

/**
 * Cria um novo usuário no banco.
 */
exports.createUser = async ({ cpf, email, senha }) => {
  return prisma.usuario.create({
    data: { cpf, email: email.toLowerCase(), senha }
  });
};

/**
 * db.js
 *
 * Configuração do cliente Prisma.
 *
 * Responsável por:
 * - Criar conexão com o banco de dados
 * - Exportar instância do Prisma Client
 *
 * Usado pelos services para acesso ao banco.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;


/**
 * passwordService.js
 *
 * Responsável por:
 * - Criptografar senhas
 * - Comparar senhas com hash
 */

const bcrypt = require("bcrypt");

/**
 * Criptografa uma senha usando bcrypt.
 */
exports.hashPassword = async (senha) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(senha, salt);
};

/**
 * Compara uma senha com o hash armazenado.
 */
exports.comparePassword = async (senha, hash) => {
  return bcrypt.compare(senha, hash);
};

/**
 * authService.js
 *
 * Responsável por:
 * - Orquestrar login e cadastro
 * - Utilizar userService, passwordService e tokenService
 */

/**
 * authService.js
 */
const userService     = require("./userService");
const passwordService = require("./passwordService");
const tokenService    = require("./tokenService");

exports.login = async ({ email, senha }) => {
  const usuario = await userService.findByEmail(email);
  if (!usuario) return { success: false, message: "Email not found." };

  const senhaCorreta = await passwordService.comparePassword(senha, usuario.senha);
  if (!senhaCorreta) return { success: false, message: "Incorrect password." };

  // ← inclui id no payload para o middleware extrair
  const token = tokenService.generateToken({
    id:    usuario.id,
    cpf:   usuario.cpf,
    email: usuario.email,
  });

  return {
    success: true,
    message: "Login successful!",
    token,
    user: { id: usuario.id, email: usuario.email }, // retorna dados básicos ao front
  };
};

exports.cadastro = async ({ cpf, email, senha }) => {
  try {
    const senhaCriptografada = await passwordService.hashPassword(senha);
    const novoUsuario = await userService.createUser({ cpf, email, senha: senhaCriptografada });
    return { success: true, message: "Registration successful!", usuario: novoUsuario };
  } catch (err) {
    if (err.code === "P2002") {
      return { success: false, message: "Email or CPF already registered." };
    }
    console.error("Error registering user:", err);
    return { success: false, message: "Unexpected error during registration." };
  }
};
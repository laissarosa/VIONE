/**
 * authController.js
 *
 * Responsável por:
 * - Receber requisições HTTP de autenticação
 * - Validar dados de entrada
 * - Encaminhar para o authService
 * - Retornar respostas claras — inclusive em caso de erro
 */

const authService = require("../services/authService");

/**
 * Login de usuários.
 */
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios.",
      });
    }

    const resultado = await authService.login({ email, senha });
    res.json(resultado);

  } catch (err) {
    // Loga a mensagem REAL do erro para facilitar debug
    console.error("[authController] Erro no login:", err.message);
    res.status(500).json({
      success: false,
      message: "Erro no servidor.",
      // Em desenvolvimento, expõe o detalhe; em produção remove esta linha:
      detalhe: process.env.NODE_ENV !== "production" ? err.message : undefined,
    });
  }
};

/**
 * Cadastro de novos usuários.
 */
exports.cadastro = async (req, res) => {
  try {
    const { cpf, email, senha } = req.body;

    if (!cpf || !email || !senha) {
      return res.status(400).json({
        success: false,
        message: "CPF, email e senha são obrigatórios.",
      });
    }

    const resultado = await authService.cadastro({ cpf, email, senha });

    if (!resultado.success) {
      return res.status(400).json(resultado);
    }

    res.status(201).json(resultado);

  } catch (err) {
    console.error("[authController] Erro no cadastro:", err.message);
    res.status(500).json({
      success: false,
      message: "Erro interno no servidor.",
      detalhe: process.env.NODE_ENV !== "production" ? err.message : undefined,
    });
  }
};
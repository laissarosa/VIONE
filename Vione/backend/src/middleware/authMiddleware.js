/**
 * authMiddleware.js
 * Protege rotas que exigem autenticação.
 * Extrai o userId do token JWT e injeta em req.userId.
 */
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // id do usuário vindo do token
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token inválido ou expirado." });
  }
};
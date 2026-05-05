/**
 * authRoutes.js
 *
 * Define as rotas relacionadas à autenticação.
 * 
 * Responsável por:
 * - Mapear endpoints HTTP (login, cadastro)
 * - Encaminhar requisições para os controllers
 * 
 * NÃO contém lógica de negócio.
 * Apenas define as rotas.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * Rota de cadastro de novos usuários.
 * Encaminha a requisição para o controller de cadastro.
 */
router.post('/register', authController.cadastro);

/**
 * Rota de login de usuários.
 * Encaminha a requisição para o controller de login.
 */
router.post('/login', authController.login);

module.exports = router;

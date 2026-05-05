/**
 * formatCPF.js
 *
 * Função utilitária para formatação de CPF.
 *
 * Responsável por:
 * - Remover caracteres inválidos
 * - Aplicar máscara (XXX.XXX.XXX-XX)
 *
 * Utilizado no formulário de cadastro.
 */

export function formatCPF(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
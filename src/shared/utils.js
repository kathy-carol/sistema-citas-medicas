// Utilidades compartidas — Sistema de Citas Médicas
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (pwd) => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(pwd);
const formatFecha = (date) => new Date(date).toLocaleDateString('es-BO');

module.exports = { validateEmail, validatePassword, formatFecha };

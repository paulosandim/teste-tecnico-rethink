function gerarCPF() {
  const n = () => Math.floor(Math.random() * 10)
  return Array.from({ length: 11 }, n).join('')
}

module.exports = { gerarCPF }
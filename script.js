const diaDeHoje = new Date().getDay();

const diaAtual = document.querySelector(`.dia[data-dia="${diaDeHoje}"]`);

if (diaAtual) {
  diaAtual.classList.add("hoje");

  const titulo = diaAtual.querySelector("h2");
  if (titulo) {
    const selo = document.createElement("span");
    selo.className = "selo-hoje";
    selo.textContent = "Hoje";
    titulo.appendChild(selo);
  }
}

function minutosDesdeMeiaNoite(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function ehDiaUtil(date = new Date()) {
  const dia = date.getDay();
  return dia >= 1 && dia <= 5;
}

function passaNaParada(itinerario, paradaId) {
  const nomes = ALIASES_PARADA[paradaId] || [];
  return itinerario.some((ponto) => nomes.includes(ponto));
}

function origemDoItinerario(itinerario) {
  const primeiro = itinerario[0];
  const entrada = Object.values(PARADAS).find((parada) =>
    (ALIASES_PARADA[parada.id] || []).includes(primeiro)
  );
  return entrada ? entrada.nome : primeiro;
}

function viagensDaParada(paradaId) {
  const viagens = [];

  for (const linha of LINHAS) {
    for (const partida of linha.partidas) {
      if (!passaNaParada(partida.itinerario, paradaId)) continue;

      viagens.push({
        hora: partida.hora,
        minutos: minutosDesdeMeiaNoite(partida.hora),
        linhaId: linha.id,
        linhaNome: linha.nome,
        itinerario: partida.itinerario,
        origem: origemDoItinerario(partida.itinerario),
        saiDaqui: (ALIASES_PARADA[paradaId] || []).includes(partida.itinerario[0]),
      });
    }
  }

  viagens.sort((a, b) => a.minutos - b.minutos || a.linhaNome.localeCompare(b.linhaNome));
  return viagens;
}

function proximasViagens(viagens, agora = new Date(), limite = 3) {
  if (!ehDiaUtil(agora)) return [];

  const agoraMin = agora.getHours() * 60 + agora.getMinutes();
  const seguintes = viagens.filter((viagem) => viagem.minutos >= agoraMin - 10);

  return seguintes.slice(0, limite);
}

function textoRelativo(viagem, agora = new Date()) {
  if (!ehDiaUtil(agora)) return "segunda a sexta";

  const agoraMin = agora.getHours() * 60 + agora.getMinutes();
  const diff = viagem.minutos - agoraMin;

  if (diff > 1) return `em ${diff} min`;
  if (diff === 1) return "em 1 min";
  if (diff === 0) return "agora";
  if (diff >= -10) return "janela de ±10 min";
  return "";
}

function escapeHtml(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderItinerario(itinerario, paradaId) {
  const nomes = ALIASES_PARADA[paradaId] || [];

  return itinerario
    .map((ponto, index) => {
      const atual = nomes.includes(ponto);
      const classe = atual ? "chip chip-aqui" : "chip";
      const seta =
        index < itinerario.length - 1
          ? '<span class="seta" aria-hidden="true">→</span>'
          : "";
      return `<span class="${classe}">${escapeHtml(ponto)}</span>${seta}`;
    })
    .join("");
}

function renderViagem(viagem, paradaId, extraClass = "") {
  const relativa = textoRelativo(viagem);
  const papel = viagem.saiDaqui
    ? `Sai desta parada`
    : `Sai às ${viagem.hora} de ${viagem.origem}`;

  return `
    <article class="viagem ${extraClass}">
      <div class="viagem-topo">
        <time datetime="${viagem.hora}">${viagem.hora}</time>
        <span class="linha-badge linha-${viagem.linhaId}">${escapeHtml(viagem.linhaNome)}</span>
        ${relativa ? `<span class="quando">${escapeHtml(relativa)}</span>` : ""}
      </div>
      <p class="viagem-papel">${escapeHtml(papel)}</p>
      <p class="itinerario">${renderItinerario(viagem.itinerario, paradaId)}</p>
    </article>
  `;
}

function renderAvisos() {
  return `
    <aside class="avisos card">
      <h2>Informações</h2>
      <ul>
        <li>Horários oficiais do Transporte de Apoio da UFPel, de segunda a sexta.</li>
        <li>O horário é a saída do itinerário, não a chegada em cada parada.</li>
        <li>Pode haver tolerância de até ±10 minutos, conforme o trânsito.</li>
        <li>A parada Odonto é a mesma conhecida como Panvel.</li>
      </ul>
      <p>
        Fonte:
        <a href="${FONTE_OFICIAL.url}" target="_blank" rel="noopener noreferrer">
          Transporte de Apoio — Pelotas
        </a>
        · atualizado em ${escapeHtml(FONTE_OFICIAL.atualizadoEm)}
      </p>
    </aside>
  `;
}

function renderHome() {
  const raiz = document.querySelector("[data-page='home']");
  if (!raiz) return;

  const lista = document.getElementById("lista-paradas");
  const proximos = document.getElementById("proximos-geral");
  const linhas = document.getElementById("resumo-linhas");

  lista.innerHTML = Object.values(PARADAS)
    .map((parada) => {
      const viagens = viagensDaParada(parada.id);
      const proximas = proximasViagens(viagens, new Date(), 1);
      const detalhe = !ehDiaUtil()
        ? "Sem operação hoje"
        : proximas[0]
          ? `Próximo ${proximas[0].hora} · ${proximas[0].linhaNome}`
          : "Sem mais saídas hoje";

      return `
        <li>
          <a href="paradas/${parada.arquivo}">
            <span class="parada-texto">
              <span class="parada-nome">${escapeHtml(parada.nome)}</span>
              <span class="parada-sub">${escapeHtml(parada.subtitulo)}</span>
              <span class="parada-next">${escapeHtml(detalhe)}</span>
            </span>
          </a>
        </li>
      `;
    })
    .join("");

  const todas = LINHAS.flatMap((linha) =>
    linha.partidas.map((partida) => ({
      hora: partida.hora,
      minutos: minutosDesdeMeiaNoite(partida.hora),
      linhaId: linha.id,
      linhaNome: linha.nome,
      itinerario: partida.itinerario,
      origem: origemDoItinerario(partida.itinerario),
      saiDaqui: false,
    }))
  ).sort((a, b) => a.minutos - b.minutos);

  const seguintes = proximasViagens(todas, new Date(), 4);

  if (!ehDiaUtil()) {
    proximos.innerHTML = `
      <div class="vazio card">
        <h2>Sem transporte de apoio hoje</h2>
        <p>O serviço opera de segunda a sexta. Volte no próximo dia útil para ver o próximo ônibus.</p>
      </div>
    `;
  } else if (seguintes.length === 0) {
    proximos.innerHTML = `
      <div class="vazio card">
        <h2>Fim das saídas de hoje</h2>
        <p>Não há mais partidas no quadro oficial. O primeiro ônibus de amanhã sai às 07:00 do Direito (ESEF · FaMed).</p>
      </div>
    `;
  } else {
    proximos.innerHTML = `
      <section class="card bloco-proximos">
        <h2>Próximas saídas</h2>
        ${seguintes
          .map((viagem) => renderViagem(viagem, null, "viagem-compacta"))
          .join("")}
      </section>
    `;
  }

  linhas.innerHTML = LINHAS.map(
    (linha) => `
      <section class="card resumo-linha">
        <h2>${escapeHtml(linha.nome)}</h2>
        <p>${escapeHtml(linha.descricao)}</p>
        <p class="horas-linha">${linha.partidas.map((p) => p.hora).join(" · ")}</p>
      </section>
    `
  ).join("");
}

function renderParada() {
  const raiz = document.querySelector("[data-parada]");
  if (!raiz) return;

  const paradaId = raiz.dataset.parada;
  const parada = PARADAS[paradaId];
  const destino = document.getElementById("quadro");
  if (!parada || !destino) return;

  const viagens = viagensDaParada(paradaId);
  const proximas = proximasViagens(viagens, new Date(), 2);
  const filtro = raiz.dataset.filtro || "todas";

  function pintar() {
    const filtradas =
      filtro === "todas" ? viagens : viagens.filter((v) => v.linhaId === filtro);

    let proximoHtml = "";
    if (!ehDiaUtil()) {
      proximoHtml = `
        <div class="vazio card">
          <h2>Sem transporte de apoio hoje</h2>
          <p>O serviço opera de segunda a sexta.</p>
        </div>
      `;
    } else if (proximas.length === 0) {
      proximoHtml = `
        <div class="vazio card">
          <h2>Fim das saídas de hoje</h2>
          <p>Não há mais ônibus passando em ${escapeHtml(parada.nome)} no quadro de hoje.</p>
        </div>
      `;
    } else {
      proximoHtml = `
        <section class="card bloco-proximos">
          <h2>Próximo ônibus</h2>
          ${proximas.map((viagem) => renderViagem(viagem, paradaId, "destaque")).join("")}
        </section>
      `;
    }

    destino.innerHTML = `
      ${proximoHtml}
      <div class="filtros" role="tablist" aria-label="Filtrar por linha">
        <button type="button" data-filtro="todas" ${filtro === "todas" ? "aria-selected='true'" : ""}>Todas</button>
        ${LINHAS.map(
          (linha) => `
            <button type="button" data-filtro="${linha.id}" ${
              filtro === linha.id ? "aria-selected='true'" : ""
            }>${escapeHtml(linha.nome)}</button>
          `
        ).join("")}
      </div>
      <section class="horarios card">
        <h2>Quadro de ${escapeHtml(parada.nome)}</h2>
        <p class="legenda">Segunda a sexta · horário de saída do itinerário</p>
        ${
          filtradas.length
            ? filtradas.map((viagem) => renderViagem(viagem, paradaId)).join("")
            : "<p class='vazio-filtro'>Nenhuma viagem nesta linha passa por esta parada.</p>"
        }
      </section>
      ${renderAvisos()}
    `;

    destino.querySelectorAll("[data-filtro]").forEach((botao) => {
      botao.addEventListener("click", () => {
        raiz.dataset.filtro = botao.dataset.filtro;
        renderParada();
      });
    });
  }

  pintar();
}

function iniciar() {
  renderHome();
  renderParada();
}

iniciar();
setInterval(iniciar, 30000);

const precoInput = document.getElementById("preco");
const pagoInput = document.getElementById("pago");
const resultado = document.getElementById("resultado");
const botao = document.getElementById("calcular");

/* Converter BR -> número */
function parseBR(valor) {
  return parseFloat(valor.replace(".", "").replace(",", "."));
}

/* Formatar moeda BR */
function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/* Limpar resultado ao digitar */
precoInput.addEventListener("input", limpar);
pagoInput.addEventListener("input", limpar);

function limpar() {
  resultado.innerHTML = `<p class="placeholder">Digite os valores para calcular</p>`;
}

/* Calcular */
function calcular() {
  let preco = parseBR(precoInput.value);
  let pago = parseBR(pagoInput.value);

  if (!precoInput.value || !pagoInput.value || isNaN(preco) || isNaN(pago)) {
    resultado.innerHTML = `<p>⚠️ Preencha os campos corretamente</p>`;
    return;
  }

  if (preco <= 0) {
    resultado.innerHTML = `<p>❌ O preço deve ser maior que zero</p>`;
    return;
  }

  if (pago < preco) {
    let falta = preco - pago;
    resultado.innerHTML = `<p>❌ Faltam ${formatar(falta)}</p>`;
    return;
  }

  if (pago === preco) {
    resultado.innerHTML = `<p>✅ Pagamento exato! Não há troco</p>`;
    return;
  }

  let troco = pago - preco;
  resultado.innerHTML = `<p>💰 Troco: <strong>${formatar(troco)}</strong></p>`;
}

/* Enter para calcular */
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calcular();
  }
});

/* Clique botão */
botao.addEventListener("click", (e) => {
  calcular();

  // Ripple effect
  const circle = document.createElement("span");
  circle.classList.add("ripple");

  const rect = botao.getBoundingClientRect();
  circle.style.left = e.clientX - rect.left + "px";
  circle.style.top = e.clientY - rect.top + "px";

  botao.appendChild(circle);

  setTimeout(() => circle.remove(), 600);
});

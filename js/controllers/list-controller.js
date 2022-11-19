function State() {
  this.listSection = null;
}

const state = new State();

export function init() {
  state.listSection = document.querySelector("#card-container");
}

export function addCard(address){
    const card = createCard(address);
    state.listSection.appendChild(card);
}

function createCard(address) {
    const div = document.createElement("div");
    div.classList.add("form-card");

    const h3 = document.createElement("h3");
    h3.innerHTML = address.cidade;

    const h6 = document.createElement("h6");
    h6.innerHTML = `${address.logradouro}, ${address.numero}`;

    const p = document.createElement("p");
    p.innerHTML = address.cep;

    div.appendChild(h3);
    div.appendChild(h6);
    div.appendChild(p);

    return div;
}

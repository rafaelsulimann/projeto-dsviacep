import Address from "../models/address.js";
import * as addressService from "../services/address-service.js";
import * as listController from "./list-controller.js";

function State() {
  this.address = new Address();

  this.btnSalvar = null;
  this.btnLimpar = null;

  this.inputCep = null;
  this.inputLogradouro = null;
  this.inputNumero = null;
  this.inputCidade = null;

  this.errorCep = null;
  this.errorNumero = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAdress.cep;
  state.inputLogradouro = document.forms.newAdress.logradouro;
  state.inputNumero = document.forms.newAdress.numero;
  state.inputCidade = document.forms.newAdress.cidade;

  state.btnSalvar = document.forms.newAdress.btnSalvar;
  state.btnLimpar = document.forms.newAdress.btnLimpar;

  state.errorCep = document.querySelector(`[data-error="cep"]`);
  state.errorNumero = document.querySelector(`[data-error="numero"]`);

  state.btnLimpar.addEventListener("click", handleBtnClearClick);
  state.btnSalvar.addEventListener("click", handleBtnSalvarClick);

  state.inputCep.addEventListener("change", handleInputCepChange);
  state.inputNumero.addEventListener("keyup", handleInputNumberoKeyup);
  state.inputNumero.addEventListener("change", handleInputNumberChange);
}

function handleInputNumberChange(event) {
  if (event.target.value != null && event.target.value != "") {
    setFormError("numero", "");
  }
}

function handleInputNumberoKeyup(event) {
  state.address.numero = event.target.value;
}

async function handleInputCepChange(event) {
  const cep = event.target.value;
  try {
    const address = await addressService.findByCep(cep);
    state.inputLogradouro.value = address.logradouro;
    state.inputCidade.value = `${address.cidade}`;
    state.address = address;
    setFormError("cep", "");
    state.inputNumero.focus();
  } catch (e) {
    state.inputCidade.value = "";
    state.inputLogradouro.value = "";
    state.inputNumero.value = "";
    setFormError("cep", "CEP Inválido");
    setFormError("numero", "");
    state.inputCep.focus();
  }
}

function handleBtnSalvarClick(event) {
  event.preventDefault();
  const errors = addressService.getErrors(state.address);
  const keys = Object.keys(errors);
  console.log(keys);
  if(keys.length > 0) {
    keys.forEach(key => {
      setFormError(key, errors[key]);
    });
    const element = document.querySelector(`#${keys[0]}`);
    element.focus();
  }
  else{
    listController.addCard(state.address);
    clearForm();
  }
}

function handleBtnClearClick(event) {
  event.preventDefault();
  clearForm();
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}

function clearForm() {
  state.inputCidade.value = "";
  state.inputLogradouro.value = "";
  state.inputNumero.value = "";
  state.inputCep.value = "";

  setFormError("cep", "");
  setFormError("numero", "");

  state.address = new Address();
  state.inputCep.focus();
}


import * as requestService from './request-service.js';
import Address from '../models/address.js';

export async function findByCep(cep){

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const result = await requestService.getJson(url);
    console.log(result);

    if(result.erro == true || result.erro == "true"){
        throw new RequestException("Erro ao realizar requisição")
    }
    const address = new Address(result.cep, result.logradouro, null, result.localidade);

    return address;
}

export function getErrors(address){
    const errors = {};

    if(!address.cep || address.cep ==""){
        errors.cep = "Campo requerido";
    }
    if(!address.numero || address.numero == ""){
        errors.numero = "Campo requerido";
    }
    return errors;
}
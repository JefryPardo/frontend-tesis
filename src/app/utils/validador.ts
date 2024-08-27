
import validator  from 'validator';
import { validarNumeroModel } from "../models/model/validar.numero.model";
import { validarAlfanumericoModel } from "../models/model/validar.alfanumerico.model";

/**
 * 
 * @param cadena 
 * @returns (false) sí todos los elementos del array son numero.
 */
const validarSplitDeNumeros = ( cadena: string ) => {

    const idsArray: string[] = cadena.split(',');

    for (let index: number = 0; index < idsArray.length; index++) {

        if(!Number.isInteger(idsArray[index])) {

            return true;
        }
    }
    
    return false;
}

/**
 * 
 * @param numero 
 * @returns (true) sí el string de entrada es un numero
 */
const validarNumero = ( numero: any ): validarNumeroModel  => {
    
    const estado = Number.isInteger(Number(numero));

    const respuesta = {

        valido: estado,
        numero: (estado)? Number(numero): null
    }

    return respuesta;
}

/**
 * 
 * @param cadena 
 * @returns (true) sí es alfanumerico
 */
const validarAlfaNumerico = ( cadena: string ): validarAlfanumericoModel  => {
    
    const regxp = "/([a-zA-Z0-9])/";
    
    const regexp = new RegExp(regxp);
    const res = regexp.test(cadena);
    
    let estado = res;

    const respuesta = {

        valido: estado,
        alfanumerico: (estado)? cadena: null
    }

    return respuesta;
}


/**
 * 
 * @param cadena 
 * @returns (true) sí el campo ingresado tiene un formato valido
 */
const esFormatoValido = (campo:string) :boolean  => {
    const uuidRegex = /^[0-9a-fA-F]{32}$/;
    return !uuidRegex.test(campo);
}

const validarEmailFormato = (body: any) :boolean  => {

    return validator.isEmail(body.usuario);
}

const validarSoloLetras = ( texto:string ) :boolean  => {

    return !validator.isAlpha(texto);
}

const limpiarEspaciosExtremos = ( texto:string ) :string  => {

    return texto.trim();
}

const validarStringNumerico = ( texto:string ) :boolean  => {

    return !validator.isNumeric(texto);
}

const validarStringLetrasNumeros = ( texto:string ) :boolean  => {

    return !validator.isAlphanumeric(texto);
}


export { 
    validarSplitDeNumeros, 
    validarNumero, 
    validarAlfaNumerico, 
    esFormatoValido, 
    validarEmailFormato, 
    validarSoloLetras, 
    limpiarEspaciosExtremos, 
    validarStringNumerico,
    validarStringLetrasNumeros,
};
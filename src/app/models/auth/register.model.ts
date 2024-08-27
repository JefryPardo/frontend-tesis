export class RegisterModel {
    
    nombre              : string;
    apellido            : string;
    direccion           : string;
    celular             : string;
    tipo_documento      : string;
    documento           : string;
    fecha_creacion      : string;
    intentos_fallidos   : string;
    clave               : string;
    usuario             : string;
    estado              :'activo' | 'inactivo';
}
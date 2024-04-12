import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResumenModel } from 'src/app/models/model/resumen.model';

//@ts-ignore
import jsPDF from 'jspdf';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { PrincipalService } from 'src/app/module/principal.service';
import { CotizacionesService } from 'src/app/service/cotizaciones.service';
import { MailModel } from 'src/app/models/model/mail.model';
import { JwtService } from 'src/app/service/jwt.service';
import { FirebaseServiceService } from 'src/app/firebase-service.service';
import { CotizacionHistorialModel } from 'src/app/models/model/cotizacion-historial.model';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

  @ViewChild('htmlDataMail') htmlDataRef: ElementRef;

  @Input() resumen: ResumenModel;
  numero_cotizacion:string = '0';

  value_mano_de_obra  : number = 0;
  detalle_mano_de_obra: string = 'Sin detalles';

  show_mano_de_obra:boolean = false;
  productosPorTipo: { [tipo: string]: ProductoModel[] } = {};
  tiposDeProducto: string[] = [];
  descripcion:string = 'Sin descripción';
  fechaFormateada: string = '';
  correo_destino: string = 'Sin correo';
  version: string = '';

  constructor(
    public principalService: PrincipalService,
    public cotizaciones: CotizacionesService,
    private jwtService: JwtService,
    private firebaseService: FirebaseServiceService
  ) {}
  
  ngOnInit(): void {
    
    this.setReferencia();
    this.listados();
    this.show_mano_de_obra = true;
    this.tiposDeProducto = Object.keys(this.productosPorTipo);
    this.correo_destino = this.resumen.cotizacion.correo_cliente;
  }
  
  generarCotizacionHistorial() {
    let historialPlain = {
      correo: this.correo_destino,
      cotizacion: this.resumen.cotizacion,
      descripcion: this.descripcion,
      detalle_de_obra: this.detalle_mano_de_obra,
      mano_de_obra: this.value_mano_de_obra,
      producto_historial: this.resumen.resumen_producto,
      referencia: this.numero_cotizacion,
      version: 'sin asignar'
    };

    this.firebaseService.createItem(historialPlain)
    .then((docRef) => {
      console.log('Documento guardado con ID:', docRef.id);
      this.version = docRef.id;
      this.show_mano_de_obra = false;

      historialPlain.version = this.version;
      this.enviarcorreo(historialPlain);
    })
    .catch((error) => {
      console.error('Error al guardar documento:', error);
    });
  }

  clearInput(event: any) {
    
    event.target.select();
  }

  setReferencia() {
    const id_cotizacion = this.resumen.cotizacion.id;
    if(id_cotizacion == undefined || id_cotizacion == null) return;
    this.numero_cotizacion = id_cotizacion.split('-')[0];
  }

  obtenerFechaConFormato() {
    const fecha = new Date();
    
    const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
    this.fechaFormateada = fecha.toLocaleDateString('es-ES', options);
  
    return this.fechaFormateada;
  }

  calcularTotal(cantidad:string, precio:number) {

    const cantidadNumerica = parseFloat(cantidad);

    if (!isNaN(cantidadNumerica)) {
      return cantidadNumerica * precio;
    } else {
      return 0;
    }
  }

  calcularTotalPorTipo(tipo: string) {
    let totalPrecio = 0;
    for (const data of this.resumen.resumen_producto) {
      if (data.producto.tipo === tipo) {
        const cantidadNumerica = parseFloat(data.cantidad);
        totalPrecio = totalPrecio + cantidadNumerica * data.producto.precio;
      }
    }
    return totalPrecio;
  }

  listados() {
    
    for (const data of this.resumen.resumen_producto) {
      const tipo = data.producto.tipo;

      if (!this.productosPorTipo[tipo]) {
        this.productosPorTipo[tipo] = [];
      }

      this.productosPorTipo[tipo].push(data.producto);
    }
  }

  setData() {

    this.generarCotizacionHistorial();
  }  

  onInputChangeManoDeObra(event: any) {
    const inputValue: string = event.target.value;
    const sanitizedValue: string = inputValue.replace(/-/g, '');
    this.value_mano_de_obra = sanitizedValue !== '' ? +sanitizedValue : 0;
  }
  
  onInputChangeDescripcion(event: any) {
    const inputValue: string = event.target.value;
    this.descripcion = inputValue;
  }

  
  evaluarDetalleManoDeObra() {

    if(this.detalle_mano_de_obra == null || this.detalle_mano_de_obra == undefined || this.detalle_mano_de_obra.length == 0) {
      
      this.detalle_mano_de_obra = 'Sin detalles';
    };

    return this.detalle_mano_de_obra;
  }

  evaluarValueManoDeObra() {

    if(this.value_mano_de_obra == null || this.value_mano_de_obra == undefined || this.value_mano_de_obra < 0) {
      
      this.value_mano_de_obra = 0;
    };

    return this.value_mano_de_obra;
  }

  calcularTotalCotizacion() {

    let valor = 0;

    this.tiposDeProducto.forEach(tipo => {
      
      valor = valor + this.calcularTotalPorTipo(tipo);
    });

    valor = valor + this.value_mano_de_obra;

    return valor;
  }

  imprimirControlP() {

    this.principalService.navbar_show = false;

    
    setTimeout(() => {
      window.print();
    }, 500);
    
    window.addEventListener('afterprint', () => {
      this.principalService.navbar_show = true;
    });
  }
  
  enviarcorreo(cotizacion_historial: CotizacionHistorialModel) {
    
    // const htmlContent = this.htmlDataRef.nativeElement.innerHTML;
    // const mail = new MailModel();
    // mail.html = htmlContent;

    const token: string | null = this.jwtService.getToken();

    if(token == null || this.jwtService.isTokenExpired(token)) {
      
      return;
    }

    this.cotizaciones.enviarEmail(token,cotizacion_historial).subscribe(
      (res) => {
      
        console.log(res);
      }
    );
  }
}
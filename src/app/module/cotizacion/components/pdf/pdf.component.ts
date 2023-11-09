import { Component, Input, OnInit } from '@angular/core';
import { ResumenModel } from 'src/app/models/model/resumen.model';

//@ts-ignore
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ProductoModel } from 'src/app/models/model/producto.model';
import { PrincipalService } from 'src/app/module/principal.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

  @Input() resumen: ResumenModel;
  numero_cotizacion:string = '0';

  value_mano_de_obra  : number = 0;
  detalle_mano_de_obra: string = 'Sin detalles';

  show_mano_de_obra:boolean = false;
  productosPorTipo: { [tipo: string]: ProductoModel[] } = {};
  tiposDeProducto: string[] = [];
  descripcion:string = 'Esta cotización es para el cambio de camaras en el area de juegos infantiles en el local cristaleria la 40.';

  constructor(public principalService: PrincipalService) {}
  
  ngOnInit(): void {
    
    this.setReferencia();
    this.listados();
    this.show_mano_de_obra = true;
    this.tiposDeProducto = Object.keys(this.productosPorTipo);
  }

  clearInput(event: any) {
    
    event.target.select();
  }

  setReferencia() {
    const id_cotizacion = this.resumen.cotizacion.id;
    if(id_cotizacion == undefined || id_cotizacion == null) return;
    this.numero_cotizacion = id_cotizacion.split('-')[0];
  }

  downloadPDF() {
    
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    
    const options = {
      background: 'white',
      scale: 3
    };

    if(DATA == null) return;

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

  obtenerFechaConFormato() {
    const fecha = new Date();
    
    const options:any = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', options);
  
    return fechaFormateada;
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

  setManoDeObra() {

    console.log(this.value_mano_de_obra);
    this.show_mano_de_obra = false;
  }

  

  onInputChange(event: any) {
    const inputValue: string = event.target.value;
    const sanitizedValue: string = inputValue.replace(/-/g, '');
    this.value_mano_de_obra = sanitizedValue !== '' ? +sanitizedValue : 0;
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


    console.log(this.value_mano_de_obra);

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

  

}

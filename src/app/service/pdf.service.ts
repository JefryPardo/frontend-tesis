import { Injectable } from '@angular/core';
import { PlantillaModel } from '../models/model/plantilla.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  getPlantilla(arrayDePlantillas: PlantillaModel[]):string {

    let titulo = 'Cristaleria la 40';

    const filasHTML = arrayDePlantillas.map((plantilla) => `
        <tr>
            <td>${plantilla.nombre}</td>
            <td>${plantilla.cantidad}</td>
            <td>$${plantilla.precio.toFixed(2)}</td>
            <td>$${(plantilla.cantidad * plantilla.precio).toFixed(2)}</td>
        </tr>
    `).join('');

    const total = arrayDePlantillas.reduce((acc, plantilla) => acc + plantilla.cantidad * plantilla.precio, 0);

    const estilosCSS = `
        <style>
            /* Define los estilos para la tabla y el encabezado */
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: center;
            }
            th {
                background-color: #f2f2f2;
            }

            /* Define los estilos para el encabezado con la imagen */
            .encabezado {
                text-align: center;
                padding: 20px;
            }
            .banner {
                max-width: 100%;
                max-height: 200px;
            }
        </style>
    `;

    const facturaHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Factura</title>
            ${estilosCSS}
        </head>
        <body>
            <div class="encabezado">
                <img class="banner" src="https://raw.githubusercontent.com/JefryPardo/tesis-img/master/logo.png" alt="Banner">
                <h3>Cotización: ${titulo}</h3>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio por unidad</th>
                        <th>Precio total</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasHTML}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Total:</td>
                        <td>$${total.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        </body>
        </html>
        `;

    return facturaHTML;
  };

  
}

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CotizacionHistorialModel } from './models/model/cotizacion-historial.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private firestore: Firestore) { }

  createItem(cotizacion_historial: CotizacionHistorialModel) {
    const itemRef = collection(this.firestore, 'cotizacion-historial');
    return addDoc(itemRef, cotizacion_historial);
  }
}
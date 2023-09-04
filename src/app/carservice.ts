import { Inject, Injectable } from '@angular/core';
import { CarConfig } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  carConfig?: CarConfig;

  constructor(@Inject('config') private config: CarConfig) { 
    console.log('config', config);
    this.carConfig = config;
  }
}

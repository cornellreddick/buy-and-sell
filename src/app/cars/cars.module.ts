import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../carservice';
import { CarConfig } from '../car';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CarsModule { 
  static forRoot(config: CarConfig): ModuleWithProviders<CarsModule>{
    return {
      ngModule: CarsModule,
      providers: [CarService, {provide: 'config', useValue: config}]
    }
  }
}

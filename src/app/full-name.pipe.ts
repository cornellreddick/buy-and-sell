import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName', 
  pure: true,
})
export class FullNamePipe implements PipeTransform {

  transform(person: any){
    return person.firstName + ' ' + person.lastName;
  }

}

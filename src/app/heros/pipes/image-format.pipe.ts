import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heros.interface';

@Pipe({
  name: 'imageFormat',
  //pure: false
})
export class ImageFormatPipe implements PipeTransform {

  transform(value: Hero): string {
    if(!value.id){
      return 'assets/no-image.png';
    }else if(value.alt_image){
      return value.alt_image;
    }
    return `assets/heroes/${value.id}.jpg`;
  }

}

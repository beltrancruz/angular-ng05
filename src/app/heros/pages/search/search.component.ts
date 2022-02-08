import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heros.interface';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  term: string = '';
  heros: Hero[] = [];
  heroSelected!: Hero;

  constructor(private herosService: HerosService) { }

  ngOnInit(): void {
  }

  search(){
    this.herosService.getSuggestions(this.term.trim()).subscribe(heros=>{
      this.heros = heros;
    })
  }

  optionSelected(event:MatAutocompleteSelectedEvent){
    let val: Hero = event.option.value;
    
    if((typeof val) === 'string'){
      return;
    }
    
    const hero: Hero = val;
    this.term = hero.superhero;
    
    this.herosService.getHero(hero.id!).subscribe(res=>{
      this.heroSelected = res;
      console.log(this.heroSelected);
        
    })

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/heros.interface';
import { HerosService } from '../../services/heros.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroComponent implements OnInit {

  hero!: Hero;

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private router:Router,
    private herosService: HerosService) { }

  ngOnInit(): void {
    this._activatedRoute.params
    .pipe(switchMap(({id})=>this.herosService.getHero(id)))
    .subscribe(res=>{
      this.hero = res;
    })
  }


  return(){
    this.router.navigate(['/heros/list'])
  }
}

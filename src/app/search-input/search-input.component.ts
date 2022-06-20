import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { Cryptocoin } from '../interfaces/cryptocoin';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  constructor(private cryptoService: CryptoService, private router: Router) {
    console.log('lets see', this.searchTerm);
  }
  searchTerm: string = '';
  // results: Cryptocoin[] | undefined;
  results: Cryptocoin[] = [];
  selectedCoin: Cryptocoin | undefined;

  ngOnInit(): void {}

  searching() {
    this.cryptoService.getCoins().subscribe((response) => {
      this.results = response
        .filter((cryptocoin: Cryptocoin) =>
          cryptocoin.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
        .splice(0, 6);
    });
  }

  selectCoin(event: MatAutocompleteSelectedEvent) {
    this.searchTerm = '';
    if (!event.option.value) {
      this.selectedCoin = undefined;
      this.searchTerm = '';
      return;
    }

    this.selectedCoin = event.option.value;

    this.findCoin();
    this.searchTerm = '';

    // this.termino = heroe.superhero;

    // this.herosService.getHeroById( heroe.id! )
    //   .subscribe( hero => this.heroeSeleccionado = hero );
  }

  findCoin() {
    console.log('selected coin', this.selectedCoin);
    !this.selectedCoin && this.router.navigate([this.searchTerm]);

    this.router.navigate([this.selectedCoin!.id]);

    this.searchTerm = '';
  }

  filterCoins() {
    // if not in main page, go there
    this.router.navigate(['']);

    this.cryptoService.filterCoins(this.searchTerm);
    this.searchTerm = '';
  }
}

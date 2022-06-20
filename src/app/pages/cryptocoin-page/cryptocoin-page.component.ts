import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { CryptoService } from '../../services/crypto.service';
import { IndCryptocoin } from '../../interfaces/indCryptocoin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cryptocoin-page',
  templateUrl: './cryptocoin-page.component.html',
  styleUrls: ['./cryptocoin-page.component.scss'],
})
export class CryptocoinPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private cryptoService: CryptoService,
    private router: Router
  ) {}
  cryptocoin!: IndCryptocoin;

  ngOnInit(): void {
    // this.activatedRoute.params.
    //   .pipe(switchMap(({ id }) => this.herosService.getHeroById(id)))
    //   .subscribe((hero) => (this.hero = hero));

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.cryptoService.getCoinById(id)))
      .subscribe({
        next: (cryptocoin) => {
          this.cryptocoin = cryptocoin;
        },
        error: (error) => this.router.navigate(['404']),
      });
  }
}

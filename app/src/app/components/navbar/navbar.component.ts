import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private cryptoService: CryptoService, private router: Router) {}

  resetSearch() {
    this.cryptoService.filterCoins('');
    this.router.navigate(['']);
  }
  ngOnInit(): void {}
}

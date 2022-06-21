import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cryptocoin } from 'src/app/interfaces/cryptocoin';
import { CryptoService } from '../../services/crypto.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cryptoService: CryptoService) {}
  rawCryptocoins: Cryptocoin[] = [];
  cryptocoins: Cryptocoin[] = [];
  displayedColumns: string[] = [
    'market_cap_rank',
    'image',
    'name',
    'current_price',
    'market_cap',
    'price_change_percentage_24h',
  ];
  dataSource = new MatTableDataSource<Cryptocoin>(this.cryptocoins);

  ngOnInit(): void {
    this.cryptoService.currentData.subscribe((searchedText) => {
      this.cryptocoins = this.rawCryptocoins.filter((cryptocoin) =>
        cryptocoin.name.toLowerCase().includes(searchedText.toLowerCase())
      );
      this.setPaginator();
      // this.dataSource = new MatTableDataSource<Cryptocoin>(this.cryptocoins);
      // this.dataSource.paginator = this.paginator;
    });

    this.cryptoService.getCoins().subscribe((response) => {
      this.rawCryptocoins = response;
      this.cryptocoins = response;
      this.setPaginator();
      // this.dataSource = new MatTableDataSource<Cryptocoin>(this.cryptocoins);
      // this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  setPaginator(): void {
    this.dataSource = new MatTableDataSource<Cryptocoin>(this.cryptocoins);
    this.dataSource.paginator = this.paginator;
  }
}

// this.cryptoService.getCoins().subscribe((response) => {
//   this.cryptocoins = response;
//   // this.data = response;
//   console.log(this.cryptocoins);
// });

// subscribe((response) => {
//   response.filter((element) =>
//     element.name.includes(
//       this.cryptoService.getFilterString().subscribe((value) => {
//         return value;
//       })
//     )
//   );
//   this.cryptocoins = response;
//   // this.data = response;
//   console.log(this.cryptocoins);
// });
// this.cryptocoins = cryptoService.getCoins2();

// dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

// data: Cryptocoin[] = [];

// filteredText: string = '';

// this.cryptoService.currentData.subscribe((text) => {

//   console.log('this is the searched param', text);
//   this.filteredText = text;
//   console.log('filtercrypto1', this.cryptocoins);

//   this.cryptocoins = this.cryptocoins.filter((cryptocoin) =>
//     cryptocoin.name.toLowerCase().includes(text.toLowerCase())
//   );
//   this.dataSource = new MatTableDataSource<Cryptocoin>(this.cryptocoins);
//   this.dataSource.paginator = this.paginator;
//   console.log('filtercrypto2', this.cryptocoins);
// });

// suscription = Subscription;

// this.cryptoService
//   .getCoins()
//   .pipe(
//     map((el) =>
//       el.filter((el) => {
//         el.name.includes(this.filteredText);
//       })
//     )
//   )
//   .subscribe((response) => {
//     this.cryptocoins = response;
//     this.dataSource = new MatTableDataSource<Cryptocoin>(this.cryptocoins);
//     this.dataSource.paginator = this.paginator;
//     console.log(this.cryptocoins);
//   });

// console.log('on init');

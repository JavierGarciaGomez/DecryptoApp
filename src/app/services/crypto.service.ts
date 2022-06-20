import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Cryptocoin } from '../interfaces/cryptocoin';
import { IndCryptocoin } from '../interfaces/indCryptocoin';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private http: HttpClient) {
    // this.fetchCoins();
  }

  private dataSource = new BehaviorSubject<string>('');
  currentData = this.dataSource.asObservable();

  filterCoins(data: string) {
    this.dataSource.next(data);
  }

  private url: string = environment.url;
  private _filterString = Observable.create('text');

  getCoins(): Observable<Cryptocoin[]> {
    return this.http.get<Cryptocoin[]>(
      `${this.url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`
    );
    // .pipe(
    //   map((cryptocoins) =>
    //     cryptocoins.filter((cryptocoin) =>
    //       cryptocoin.name.toLowerCase().includes('a')
    //     )
    //   )
    // );
  }

  getCoinById(id: string): Observable<IndCryptocoin> {
    return this.http.get<IndCryptocoin>(`${this.url}/coins/${id}`);
  }

  // filterCoins(filterText: string) {
  //   console.log('im called');

  //   // this._cryptocoins = this._cryptocoins.filter((cryptocoin) =>
  //   //   cryptocoin.name.includes(filterText)
  //   // );
  //   this.filterCoins(filterText);
  // }
}

// _newCryptocoins!: Observable<Cryptocoin[]>;
// _newText: string = '';

// private _refresh$ = new Subject<void>();

// get refresh$() {
//   return this._refresh$;
// }

// search() {
//   return this.http
//     .get<Cryptocoin[]>(
//       `${this.url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`
//     )
//     .pipe(
//       tap(() => {
//         this._refresh$.next();
//       })
//     );
// }

// fetchCoins(): Observable<Cryptocoin[]> {
//   console.log('fetching', this._newText);
//   return this.http
//     .get<Cryptocoin[]>(
//       `${this.url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`
//     )
//     .pipe(
//       map((cryptocoins) =>
//         cryptocoins.filter((cryptocoin) =>
//           cryptocoin.name.toLowerCase().includes('a')
//         )
//       )
//     );
//   // return this.http.get<Cryptocoin[]>(
//   //   `${this.url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`
//   // );
//   return (this._newCryptocoins = this.http
//     .get<Cryptocoin[]>(
//       `${this.url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`
//     )
//     .pipe(
//       map((result) =>
//         result.filter((crypto) =>
//           crypto.name.toLowerCase().includes(this._newText)
//         )
//       )
//     ));
// }

// setFilterString(filterString: string) {
//   this._newText = filterString;

//   // console.log('tis is the string', filterString);
//   // this._newCryptocoins = this.http
//   //   .get<Cryptocoin[]>(
//   //     `${this.url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`
//   //   )
//   //   .pipe(
//   //     map((result) =>
//   //       result.filter((crypto) =>
//   //         crypto.name.toLowerCase().includes(filterString)
//   //       )
//   //     )
//   //   );

//   // console.log('setfilterstring', this._newCryptocoins);
//   // this.printResults();
//   this.fetchCoins();
// }

// printResults() {
//   this.newGetCoins().subscribe((result) => {
//     console.log(result);
//   });
// }

// newGetCoins(): Observable<Cryptocoin[]> {
//   return this._newCryptocoins;
// }

// getCoins2(): Observable<Cryptocoin[]> {
//   // return this._observableCoins;
// }

// private _cryptocoins: Cryptocoin[] = [];
// private _observableCoins: Observable<Cryptocoin[]> | undefined;

// getFilterString(): Observable<string> {
//   return Observable.create(this._filterString);
// }

// fetchObservableCoins(): void {
//   this._observableCoins = this.http.get<Cryptocoin[]>(
//     `${this.url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`
//   );
// }

// filterObservableCoins(searchedText: string) {
//   this._observableCoins = this._observableCoins!.pipe(
//     map((cryptocoins) =>
//       cryptocoins.filter((cryptocoin) => {
//         cryptocoin.name.includes(searchedText);
//       })
//     )
//   );
// }

// private _myNewVar: string = '';

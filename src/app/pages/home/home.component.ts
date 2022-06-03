import {Component} from '@angular/core';
import {FinnhubService} from '../../services/finnhub.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {isSymbolValid} from '../../utils/is-symbol-valid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  inputValue = '';
  isSymbolValid = (symbol: string) => isSymbolValid.test(symbol);

  constructor(
    public finnhub: FinnhubService,
    public localStorage: LocalStorageService,
  ) {}
}

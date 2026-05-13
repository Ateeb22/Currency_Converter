import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ConverterComponent } from './components/converter/converter.component';
import { HistoryComponent } from './components/history/history.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ConverterComponent, HistoryComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

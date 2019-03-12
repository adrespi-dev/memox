import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-omnisearch',
  templateUrl: './omnisearch.component.html',
  styleUrls: ['./omnisearch.component.scss']
})
export class OmnisearchComponent implements OnInit {
  popupWidth = 0;
  @Input() placeholder = 'Buscar...';
  @Input() nameStorage: string;
  @Input() appareance = 'default';
  @Output() search = new EventEmitter<string>();
  @ViewChild('omnisearch') omnisearch: ElementRef;

  searching = false;
  searchTerm: string;
  searchHistory: any[];
  constructor() {
  }

  ngOnInit() {
  }

  onFocus(e) {
    const element: HTMLElement = this.omnisearch.nativeElement;
    this.popupWidth =  element.clientWidth;
    this.searchHistory = this.getSearchHistory();
  }

  onFocusOut() {
    this.hideHistory();
  }

  hideHistory() {
    this.searchHistory = [];
  }

  onSearch() {
    if (this.nameStorage) {
      this.addSearchToHistorial(this.searchTerm);
    }
    this.search.emit(this.searchTerm);
    this.hideHistory();
  }

  addSearchToHistorial(searchTerm: string) {
    if (searchTerm && searchTerm.length > 0) {
      this.removeSearchToHistorial(searchTerm);
      this.searchHistory.push(this.searchTerm);
      this.savehistory();
    }
  }

  removeSearchToHistorial(searchTerm: string) {
    this.searchHistory = this.searchHistory.filter(x => x !== searchTerm);
  }

  savehistory() {
    const fullStorageName = 'search-' + this.nameStorage;
    if (this.nameStorage) {
      localStorage.setItem(fullStorageName, JSON.stringify(this.searchHistory));
    }
    this.searchHistory = this.getSearchHistory();
  }

  getSearchHistory(): any[] {
    const fullStorageName = 'search-' + this.nameStorage;
    let searchHistory: any[] = JSON.parse(localStorage.getItem(fullStorageName));
    if (!searchHistory) {
      searchHistory = [];
    }
    return searchHistory;
  }

  setSearchFromHistory(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.addSearchToHistorial(searchTerm);
    this.onSearch();
    this.hideHistory();
  }

}

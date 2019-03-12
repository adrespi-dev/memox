import { Directive, ViewContainerRef, ComponentFactoryResolver, Input, OnInit, ViewRef } from '@angular/core';
import { MatSelect, MatOption } from '@angular/material';
import { HttpService } from '../services/http.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dataSourceUrl]'
})
export class DataSourceUrlDirective implements OnInit {
  @Input('url') url: string;
  @Input('displayField') displayField: string;


  constructor(private host: MatSelect,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private http: HttpService) {
 }

 ngOnInit() {
 }

}

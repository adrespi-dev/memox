import { Directive, ElementRef, Renderer2, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[userFoto]'
})
export class UserFotoDirective implements OnInit, OnChanges {
  @Input() userName: string;

  constructor(private _elRef: ElementRef, private _renderer: Renderer2) {
  }

  ngOnInit() {
    this.setImageSrc();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userName) {
      this.setImageSrc();
    }
  }

  setImageSrc() {
    const rootUrl = environment.rootUrl;
    let userNameFoto = this.userName;
    if (!userNameFoto || userNameFoto.length < 1) {
      userNameFoto = 'nonombre';
    }
    const fotoUrl = `${rootUrl}/api/Fotos/${userNameFoto}`;
    this._renderer.setAttribute(this._elRef.nativeElement, 'src', fotoUrl);
  }


}

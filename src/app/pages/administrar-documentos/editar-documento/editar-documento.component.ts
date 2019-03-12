import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { SideMenuService } from '../../../common/services/side-menu.service';
import notify from 'devextreme/ui/notify';
import { HttpService } from '../../../common/services/http.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editar-documento',
  templateUrl: './editar-documento.component.html',
  styleUrls: ['./editar-documento.component.scss']
})
export class EditarDocumentoComponent implements OnInit {
  errorMsg: any;
  frameIsLoaded: boolean;
  isCallbacking: boolean;
  plantillaId: number;
  selectedParametro: any;
  documento: any;
  esNuevo = false;
  showIFrame = false;
  safeUrlDocumento: SafeResourceUrl;
  urlNuevoDocumento = environment.rootUrl + 'Documento';
  urlEditarDocumento = environment.rootUrl + 'Documento/Editar';
  topFixed = 0;
  leftFixed = 0;
  isPopoverVisible = false;
  documentoEstaGrabado = false;
  selectedTab = 0;
  userName: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private domSatinizer: DomSanitizer,
    private sideMenuService: SideMenuService,
    private http: HttpService) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.userName = userInfo.username;
      this.route.queryParams.subscribe(params => {
        const esNuevo = params['esNuevo'];
        if (esNuevo === 'true') {
          this.esNuevo = true;
          this.plantillaId = params['plantillaId'] as number;
          if (!this.plantillaId || this.plantillaId < 0) {
            this.router.navigate(['/pages/nuevo-documento']);
          }
          this.documento = {plantillaId: this.plantillaId};
          this.iniciarIframe();
        } else {
          if (esNuevo === 'false') {
            const documentoId = +params['documentoId'];
            if (!documentoId || documentoId < 1) {
              this.router.navigate(['/pages/nuevo-documento']);
            }
            this.esNuevo = false;
            this.documento = {id: documentoId};
            this.iniciarIframe();
            this.getDatosDocumento();
          } else {
            this.router.navigate(['/pages/nuevo-documento']);
          }
        }
      });
  }

  ngOnInit() {
    this.sideMenuService.onSetMenuVisible(false);
  }

  iniciarIframe() {
    if (this.esNuevo === true) {
      this.safeUrlDocumento =
        // tslint:disable-next-line:max-line-length
        this.domSatinizer.bypassSecurityTrustResourceUrl(this.urlNuevoDocumento + `?PlantillaId=${this.documento.plantillaId}&UserName=${this.userName}`);
    } else {
      this.safeUrlDocumento =
        // tslint:disable-next-line:max-line-length
        this.domSatinizer.bypassSecurityTrustResourceUrl(this.urlEditarDocumento + `?DocumentoId=${this.documento.id}&UserName=${this.userName}`);
    }
    this.showIFrame = true;
  }

  getDatosDocumento() {
    this.http.get('api/Documento/ConsultaDetallada/' + this.documento.id).subscribe(doc => {
      this.documento.observacion = doc.observacion;
    });
  }

  onIframeLoaded() {
    this.isCallbacking = false;
    this.frameIsLoaded = true;
  }

  onShowMessage(e) {
    notify(e.msg, e.type, 2000);
  }

  onParametroSeleccionadoChanged(e) {
    if (!e) {
      this.isPopoverVisible = false;
      this.selectedParametro = null;
    } else {
      if (e.parametro.tipoId !== 1) {
        this.topFixed = e.position.y + (64 - 15 );
        this.leftFixed = e.position.x;
        window.setTimeout(() => {
          this.selectedParametro = e.parametro;
          this.isPopoverVisible = true;
        }, 200);
      }
    }
  }

  onSetParametroValue(parametro) {
    this.postMessageToIFrame('setPametroValue', parametro);
  }

  postMessageToIFrame(action, data) {
    const message = { action: action, data: data };
    const IFrame = <HTMLIFrameElement>document.getElementById('if-documento');
    IFrame.contentWindow.postMessage(message, environment.rootUrl);
  }

  @HostListener('window:message', ['$event'])
  onMessage(param) {
    switch (param.data.action) {
      case 'msg' :
        this.onShowMessage(param.data.data);
        break;
      case 'parametroSeleccionadoChanged' :
        this.onParametroSeleccionadoChanged(param.data.data);
        break;
      case 'confirmarDocGuardado' :
        this.onGrabarConfirmado(param.data.data);
        break;
    }
  }

  onSaveDocumento() {
    this.isCallbacking = true;
    this.postMessageToIFrame('askForSave', {});
  }

  onGrabarConfirmado(data) {
    const documento = Object.assign({}, this.documento);
    documento.parametros = data.parametros;
    documento.archivoTemporal = data.archivoTemporal;
    documento.parametros.forEach(parametro => {
      parametro.parametrosOpcionales = [];
      for (let propertyName in parametro) {
        if (propertyName.startsWith('_')) {
          const propertyValue = parametro[propertyName];
          propertyName = propertyName.substring(1, propertyName.length);
          propertyName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
          parametro.parametrosOpcionales.push({key: propertyName, value: propertyValue});
        }
      }
    });
    this.errorMsg = null;
    if (this.esNuevo === true) {
      this.http.post('api/Documento', documento)
      .pipe(finalize(() => { this.isCallbacking = false; }))
      .subscribe(response => {
        this.documentoEstaGrabado = true;
      }, err => {
        this.errorMsg = err;
        this.selectedTab = 2;
      });
    } else {
      this.http.patch('api/Documento', documento)
      .pipe(finalize(() => { this.isCallbacking = false; }))
      .subscribe(response => {
        this.documentoEstaGrabado = true;
      }, err => {
        this.errorMsg = err;
        this.selectedTab = 2;
      });
    }
  }
}

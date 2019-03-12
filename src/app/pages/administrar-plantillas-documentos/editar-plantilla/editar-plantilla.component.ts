import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import notify from 'devextreme/ui/notify';
import { HttpService } from '../../../common/services/http.service';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SideMenuService } from '../../../common/services/side-menu.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-editar-plantilla',
  templateUrl: './editar-plantilla.component.html',
  styleUrls: ['./editar-plantilla.component.scss'],
})
export class EditarPlantillaComponent implements OnInit, OnDestroy, AfterViewInit {
  isNewPlantilla: boolean;
  isWaitingForSaveDoc: boolean;
  safeUrlPlantilla: SafeResourceUrl;
  documentParametros = [];
  direcciones = [];
  urlPlantilla = environment.rootUrl + 'Plantilla';
  tiposParametros = [];
  selectedParametroId;
  estaCargandoIframe = false;
  isCallbackingPlantilla = false;
  isMainCallbacking = false;
  keyArchivo: string;
  errorMsg: string;
  plantilla: any;
  userName: string;

  constructor(private domSatinizer: DomSanitizer, private http: HttpService, private router: Router,
    private route: ActivatedRoute, private sideMenuService: SideMenuService) {
    this.plantilla = {};
    http.get('api/Direcciones?SoloOtorgadas=' + true).subscribe(direcciones => {
      this.direcciones = direcciones as any[];
    });
    http.get('api/TiposParametroPlantillla').subscribe(tipos => {
      this.tiposParametros = tipos as any[];
    }, err => {
      this.errorMsg = err;
    });
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userName = userInfo.username;
  }

  ngOnInit() {
    // this.sideMenuService.onSetMenuMode('over');
    this.sideMenuService.onSetMenuVisible(false);
    this.route.params.subscribe(params => {
        const id = +params['id'];
        if (id) {
          this.plantilla.nombre = 'Cargando plantilla...';
          this.getPlantilla(id);
        } else {
          this.keyArchivo = new Date().getTime().toString();
          this.isNewPlantilla = true;
          this.safeUrlPlantilla =
            // tslint:disable-next-line:max-line-length
            this.domSatinizer.bypassSecurityTrustResourceUrl(this.urlPlantilla + `?keyArchivo=${this.keyArchivo}&UserName=${this.userName}`);
          this.plantilla.nombre = 'Nueva Plantilla';
          this.plantilla.keyArchivoTemporal = this.keyArchivo;
        }
    });
  }

  getPlantilla(PlantillaId) {
    this.isCallbackingPlantilla = true;
    this.http.get('api/Plantillas/' + PlantillaId)
      .pipe(finalize(() => { this.isCallbackingPlantilla = false; }))
      .subscribe(plantilla => {
        this.plantilla = plantilla;
        const id = this.plantilla.id;
        const keyArchivoTmp = this.plantilla.keyArchivoTemporal;
        this.isNewPlantilla = false;
        this.keyArchivo = 'if-' + id;
        this.safeUrlPlantilla =
          // tslint:disable-next-line:max-line-length
          this.domSatinizer.bypassSecurityTrustResourceUrl(this.urlPlantilla + `/Editar?PlantillaId=${id}&UserName=${this.userName}&KeyArchivo=${keyArchivoTmp}`);
        this.documentParametros = this.plantilla.parametros.map(parametro => {
          if (parametro.parametrosOpcionales) {
            parametro.parametrosOpcionales.forEach(parametroOpcional => {
              const key = '_' + parametroOpcional.key.charAt(0).toLowerCase() + parametroOpcional.key.slice(1);
              const value = parametroOpcional.value;
              parametro[key] = value;
            });
          }
          return parametro;
        });
      });
  }

  ngAfterViewInit() {
    this.estaCargandoIframe = true;
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.onMessage);
    // this.sideMenuService.onSetMenuMode('side');
    this.sideMenuService.onSetMenuVisible(true);
  }

  @HostListener('window:message', ['$event'])
  onMessage(param) {
    // console.log(param.data);
    switch (param.data.action) {
      case 'msg' :
        this.onShowMessage(param.data.data);
        break;
      case 'nuevoParametro' :
        this.onNuevoParametro(param.data.data);
        break;
      case 'updateParametroPositions' :
        this.onUpdateParametroPositions(param.data.data);
        break;
      case 'selectedParametroChanged' :
        this.onSelectedParametroChanged(param.data.data);
        break;
      case 'saveDoc' :
        this.onConfirmSavePlantilla(param.data.data);
        break;
    }
  }

  onShowMessage(e) {
    notify(e.msg, e.type, 2000);
  }

  onNuevoParametro(docParametro) {
    docParametro.tipoId = this.tiposParametros[1].id;
    this.documentParametros.push(docParametro);
    this.sortParametros();
  }

  sortParametros() {
    this.documentParametros.sort((x, y) => {
      return x.intervalo.start - y.intervalo.start;
    });
  }

  onUpdateParametroPositions(parametros) {
    if (parametros && parametros.length > 0) {
      parametros.forEach(parametro => {
        const documentParametro = this.documentParametros.find(x => x.key === parametro.key);
        documentParametro.intervalo = parametro.intervalo;
      });
      this.sortParametros();
    }
  }

  onSelectedParametroChanged(parametroKey) {
    this.selectedParametroId = parametroKey;
  }

  onIframeLoad($event) {
    this.estaCargandoIframe = false;
    if (!this.isNewPlantilla) {
      if (this.plantilla.id) {
        this.postMessageToIFrame('syncParametros', this.documentParametros);
      }
    }
  }

  validatePlantilla() {
    this.documentParametros.forEach(parametro => {
      this.validarParametro(parametro);
    });
    const invalidParametro = this.documentParametros.find(x => x.valid === false);
    return !invalidParametro;
  }

  validarParametro(parametro: any) {
    parametro.valid = true;
    parametro.errorMsg = '';
    if (!parametro.nombre) {
      parametro.valid = false;
      parametro.errorMsg = 'El nombre es un campo obligatorio';
    }
    if (!parametro.tipoId && parametro.tipoId < 0) {
      parametro.valid = false;
      parametro.errorMsg = 'El tipo es un campo obligatorio';
    }
    switch (parametro.tipoId) {
      case 0:
        this.validarParametrosSerie(parametro);
      break;
      case 2:
        this.validarParametrosFecha(parametro);
      break;
    }
  }

  validarParametrosSerie(parametro) {
    if (!parametro._serieId) {
      parametro.valid = false;
      parametro.errorMsg = 'La serie es un campo obligatorio';
    }
  }

  validarParametrosFecha(parametro) {
    if (!parametro._formatoFecha) {
      parametro.valid = false;
      parametro.errorMsg = 'Debe proveer un formato de fecha';
    }
  }

  onSavePlantilla() {
    this.errorMsg = null;
    const isPlantillaValid = this.validatePlantilla();
    if (isPlantillaValid === true) {
      this.isMainCallbacking = true;
      this.postMessageToIFrame('saveDoc', {});
    }
  }

  onConfirmSavePlantilla(e) {
    const plantilla = Object.assign({}, this.plantilla);
    plantilla.parametros = this.documentParametros;
    plantilla.parametros.forEach(parametro => {
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
    this.http.postOrPatch('api/Plantillas', plantilla)
      .pipe(finalize(() => { this.isMainCallbacking = false; }))
      .subscribe(data => {
        notify('Plantilla grabada correctmente.', 'success');
        this.router.navigate(['/pages/plantillas']);
      }, err => {
        this.errorMsg = err;
      });
  }

  getTypeSelected(id): string {
    const selected = this.tiposParametros.find(x => x.id === id);
    if (!selected) {
      return '';
    }
    return selected.nombre;
  }

  postMessageToIFrame(action, data) {
    const message = { action: action, data: data };
    const IFrame = <HTMLIFrameElement>document.getElementById('if-' + this.keyArchivo);
    console.log(environment.rootUrl);
    console.log(IFrame);
    console.log(message);
    console.log(IFrame.contentWindow);
    IFrame.contentWindow.postMessage(message, environment.rootUrl);
  }

  isButtonGuardarDisabled() {
    return this.estaCargandoIframe || this.isMainCallbacking || this.isCallbackingPlantilla;
  }

  removerParametro(parametro: any) {
    const parametroEncontrado = this.documentParametros.find(x => x.key === parametro.key);
    const index = this.documentParametros.indexOf(parametroEncontrado);
    this.documentParametros.splice(index, 1);
    this.postMessageToIFrame('removeParametro', parametro);
  }
}

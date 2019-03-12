import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { MatSelectModule, MatCardModule, MatExpansionModule, MatTabsModule, MatCheckboxModule, MatTooltipModule, MatProgressBarModule, MatDatepickerModule, MatChipsModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    // BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatTabsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatChipsModule
],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatTabsModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatChipsModule
  ]
})
export class MaterialModule { }

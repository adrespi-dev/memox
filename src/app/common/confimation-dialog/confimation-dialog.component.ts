import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confimation-dialog',
  templateUrl: './confimation-dialog.component.html',
  styleUrls: ['./confimation-dialog.component.scss']
})
export class ConfimationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

}

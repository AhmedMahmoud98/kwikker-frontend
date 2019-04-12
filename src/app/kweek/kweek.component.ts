import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../services/data.service';
import { Kweek } from '../model/kweek';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, TooltipPosition } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ReplyComponent } from '../reply/reply.component';
import { KweeksService } from '../services/kweeks.service';
@Component({
  selector: 'app-kweek',
  templateUrl: './kweek.component.html',
  styleUrls: ['./kweek.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class KweekComponent implements OnInit {
  roots: Kweek[] = [];
  positionOption: TooltipPosition = 'above';
  position = new FormControl(this.positionOption);
  showDelay = new FormControl(50);
  hideDelay = new FormControl(50);

  kweeks: Kweek[] = [];

  /* route children name which based on it, The right request will be sent */
  public routeChildName: string;



  /*
   * constructor called when component is made
   * @param kweekService to use DataService functions and deal with backend
   * @param route to use snapshot from the url to know which URL you are in
   * No @return
   */
  constructor(
    private kweekService: DataService,
    private kweekFunc: KweeksService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  /**
   * function called after all intialization in constuctor used here to determine which kweeks to retreive
   * No Parameters
   * No reurn
   */
  ngOnInit() {
    // if (this.popUpMode) {
    // } else {
      this.kweekService.getKweeks().subscribe(lists => {
        this.kweeks = lists;
        this.kweekFunc.injectTagsInText(this.kweeks);
      });
    // }

    // This part will be updated
    // this.KweeksType();
    // const userName = this.route.snapshot.params['username'];
    // if (this.routeChildName === 'kweeks' || this.routeChildName === '' ) {
    //   this.kweekService.getUserKweeks(userName , null).subscribe
    //   ( usersInfo => {
    //     this.kweeks = usersInfo;
    //   } );
    //     this.injectTagsInText();
    // } else if (this.routeChildName === 'likes') {
    //   this.kweekService.getUserLikedKweeks(userName , null).subscribe
    //     this.kweeks = usersInfo;
      //   ( usersInfo => {
    //     this.injectTagsInText();
    //   } );
    // } else {
    //   this.kweekService.getKweeks().subscribe(lists => {
    //     this.kweeks = lists;
    //     this.injectTagsInText();
    //   });
    // }
  }

  // will be Updated
  KweeksType(): void {
    if (this.route.snapshot.firstChild != null) {
      this.routeChildName = this.route.snapshot.children[0].toString();
    }
  }
/**
 * open pop ups of replays
 * No parameters
 * @returns void
 */
  openDialog(kweek: Kweek): void {
    this.roots.push(kweek);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '640px';
    dialogConfig.data = { roots: this.roots };
    const dialogRef = this.dialog.open(ReplyComponent, dialogConfig);
    dialogRef.componentInstance.roots = this.roots;
    dialogRef.afterClosed().subscribe(result => {
      this.roots = [];
    });
  }

  likeOrUnlike(kweek: Kweek): void {
    this.kweekFunc.like(kweek);
  }

  RekweekOrUnRekweek(kweek: Kweek): void {
    this.kweekFunc.rekweek(kweek);
  }
}

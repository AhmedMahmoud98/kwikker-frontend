import { Component, OnInit, ViewEncapsulation, Input } from "@angular/core";
import { DataService } from "../services/data.service";
import { Kweek } from "../model/kweek";
import { ActivatedRoute, Router } from "@angular/router";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  TooltipPosition
} from "@angular/material";
import { FormControl } from "@angular/forms";
import { ReplyComponent } from "../reply/reply.component";
import { KweeksService } from "../services/kweeks.service";
import { Overlay, OverlayConfig } from "@angular/cdk/overlay";
@Component({
  selector: "app-kweek",
  templateUrl: "./kweek.component.html",
  styleUrls: ["./kweek.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class KweekComponent implements OnInit {
  clickedKweek: Kweek = null;
  positionOption: TooltipPosition = "above";
  position = new FormControl(this.positionOption);
  showDelay = new FormControl(50);
  hideDelay = new FormControl(50);
  functionToCall: String = "";
  kweeks: Kweek[] = [];

  /* route children name which based on it, The right request will be sent */
  public routeChildName: string;

  /* The Authorized User (The one who made Log in) */
  authorizedUser: string = localStorage.getItem("username");

  callCommonFunc = true; // to call common like-unlike-rekweek-unrekweek functions from kweek service

  /*
   * constructor called when component is made
   * @param kweekService to use DataService functions and deal with backend
   * @param route to use snapshot from the url to know which URL you are in
   * No @return
   */
  constructor(
    private kweekService: DataService,
    private kweekFunc: KweeksService,
    public route: ActivatedRoute,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  /**
   * function called after all intialization in constuctor used here to determine which kweeks to retreive
   * No Parameters
   * No reurn
   */
  ngOnInit() {
    if (
      this.route.snapshot.root.children[0].params["username"] ===
        this.authorizedUser &&
      (this.route.snapshot.parent.firstChild.routeConfig.path === "" ||
        this.route.snapshot.parent.firstChild.routeConfig.path === "kweeks")
    ) {
      this.callCommonFunc = false;
    }
    const mainRoute = this.route.snapshot.parent.routeConfig.path;
    if (mainRoute === "profile/:username") {
      switch (this.route.snapshot.parent.firstChild.routeConfig.path) {
        case "":
          this.kweekService
            .getUserKweeks(
              this.route.snapshot.root.children[0].params["username"],
              null
            )
            .subscribe(lists => {
              this.kweeks = lists;
              // const str = JSON.stringify(this.kweeks[0], null, 4);
              // console.log(str);
              this.kweekFunc.injectTagsInText(this.kweeks);
            });
          break;
        case "kweeks":
          this.kweekService
            .getUserKweeks(
              this.route.snapshot.root.children[0].params["username"],
              null
            )
            .subscribe(lists => {
              this.kweeks = lists;
              // const str = JSON.stringify(this.kweeks[0], null, 4);
              // console.log(str);
              this.kweekFunc.injectTagsInText(this.kweeks);
            });
          break;
        case "likes":
          this.kweekService
            .getUserLikedKweeks(
              this.route.snapshot.root.children[0].params["username"],
              null
            )
            .subscribe(usersInfo => {
              this.kweeks = usersInfo;
              this.kweekFunc.injectTagsInText(this.kweeks);
            });
          break;
      }
    } else if (mainRoute === "home") {
      this.kweekService.getHomeKweeks(null).subscribe(homeKweeks => {
        this.kweeks = homeKweeks;
        this.kweekFunc.injectTagsInText(this.kweeks);
      });
    } else if (mainRoute === "search") {
      const filterBy: string = this.route.snapshot.queryParamMap.get(
        "filterBy"
      );
      this.kweekService.searchKweeks(filterBy).subscribe(searchKweeks => {
        this.kweeks = searchKweeks;
        this.kweekFunc.injectTagsInText(this.kweeks);
      });
    }

    // mock service
    // this.kweekService.getKweeks().subscribe(lists => {
    //   this.kweeks = lists;
    //   this.kweekFunc.injectTagsInText(this.kweeks);
    // });
  }

  /* // will be Updated
  KweeksType(): void {
    if (this.route.snapshot.firstChild != null) {
      this.routeChildName = this.route.snapshot.children[0].toString();
    }
  }

  /**
   * open pop ups of replays
   * @params kweek to open the dialog with
   * @returns void
  */
  openDialog(kweek: Kweek): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "640px";
    dialogConfig.autoFocus = false;
    // dialogConfig.scrollStrategy = this.overlay.scrollStrategies.reposition();
    const dialogRef = this.dialog.open(ReplyComponent, dialogConfig);
    dialogRef.componentInstance.clickedKweek = kweek;

    // let config = new OverlayConfig({
    //   hasBackdrop: true,
    //   backdropClass: 'cdk-overlay-transparent-backdrop',
    //   positionStrategy: this.overlay.position().global().centerHorizontally()
    // });

    // let overlayRef = this.overlay.create(config);
    // overlayRef.attach(dialogRef);
    // overlayRef.backdropClick().subscribe(() => {
    // overlayRef.detach();
    // dialogRef.close();
    // });

    dialogRef.afterClosed().subscribe(result => {
      this.clickedKweek = null;
    });
  }

  /**
   * calling function to like kweek from service which has the common replies and kweeks functions
   * @param kweek
   * No @returns
   */
  likeDecision(kweek: Kweek): void {
    // not in my profile
    if (this.callCommonFunc) {
      this.kweekFunc.like(kweek);
      return;
    }
    // in my profile
    this.kweekService.likeKweek(kweek.id).subscribe(() => {
      this.likeCallBack(kweek);
    });
  }

  likeCallBack(kweek: Kweek): void {
    this.kweeks.forEach(loopKweek => {
      if (loopKweek.id === kweek.id) {
        loopKweek.liked_by_user = true;
        loopKweek.number_of_likes++;
      }
    });
  }
  /**
   * calling function to unlike kweek from service which has the common replies and kweeks functions
   * @param kweek
   * No @returns
   */
  unlikeDecision(kweek: Kweek): void {
    // not in my profile
    if (this.callCommonFunc) {
      this.kweekFunc.unlike(kweek);
      return;
    }
    // in my profile
    this.kweekService.unlikeKweek(kweek.id).subscribe(() => {
      this.unlikeCallBack(kweek);
    });
  }

  /**
   * callback function in subscribe if the user is in his profile
   * @param kweek
   * No @returns
   */
  unlikeCallBack(kweek: Kweek): void {
    this.kweeks.forEach(loopKweek => {
      if (loopKweek.id === kweek.id) {
        loopKweek.liked_by_user = false;
        loopKweek.number_of_likes--;
      }
    });
  }

  /**
   * call the function rekweek the kweek from data service which deal with backend
   * @param kweek
   * No @returns
   */
  rekweekDecision(kweek: Kweek): void {
    // not in my profile
    if (this.callCommonFunc) {
      this.kweekFunc.rekweek(kweek);
      return;
    }
    // in my profile
    this.kweekService.rekweekKweek(kweek.id).subscribe(() => {
      this.rekweekCallBack(kweek);
    });
  }

  /**
   * callback function in subscribe if the user is in his profile
   * @param kweek
   * No @returns
   */
  rekweekCallBack(kweek: Kweek): void {
    kweek.rekweeked_by_user = true;
    kweek.number_of_rekweeks++;
    let retweetedKweek = JSON.parse(JSON.stringify(kweek));

    this.kweeks.unshift(retweetedKweek);
    retweetedKweek.rekweek_info = {
      rekweeker_name: "You",
      rekweeker_username: this.authorizedUser
    };
  }

  /**
   * call the function unrekweek the kweek from data service which deal with backend
   * @param kweek
   * No @returns
   */
  unrekweekDecision(kweek: Kweek): void {
    // not in my profile
    if (this.callCommonFunc) {
      this.kweekFunc.unrekweek(kweek);
      return;
    }
    // in my profile
    this.kweekService.unrekweekKweek(kweek.id).subscribe(() => {
      this.unrekweekCallBack(kweek);
    });
  }

  /**
   * callback function in subscribe if the user is in his profile
   * @param kweek
   * No @returns
   */
  unrekweekCallBack(kweek: Kweek): void {
    const id = kweek.id;
    if (kweek.rekweek_info) {
      const index = this.kweeks.indexOf(kweek);
      this.kweeks.splice(index, 1);
      console.log("here");
    } else {
      kweek.number_of_rekweeks--;
      kweek.rekweeked_by_user = false;
    }
    this.kweeks.forEach(loopKweek => {
      if (loopKweek.id === id) {
        if (loopKweek.rekweek_info && loopKweek.rekweeked_by_user) {
          const index = this.kweeks.indexOf(loopKweek);
          this.kweeks.splice(index, 1);
          return;
        } else if (loopKweek.rekweeked_by_user) {
          loopKweek.number_of_rekweeks--;
          loopKweek.rekweeked_by_user = !loopKweek.rekweeked_by_user;
          console.log("here2");
          return;
        }
      }
    });
  }

  /**
   * calling function to delete kweek from service which has the common replies and kweeks functions
   * @param kweek
   * No @returns
   */
  delete(kweek: Kweek): void {
    if (this.callCommonFunc) {
      this.kweekService.deleteKweek(kweek.id).subscribe(() => {
        this.deleteCallBack(kweek);
      });
    } else {
      this.kweekService.deleteKweek(kweek.id).subscribe(() => {
        this.deleteProfileCallBack(kweek);
      });
    }
  }

  /**
   * callback function in subscribe if the user is not in his profile
   * @param kweek
   * No @returns
   */
  deleteCallBack(kweek: Kweek): void {
    const indexToDelete = this.kweeks.indexOf(kweek);
    this.kweeks.splice(indexToDelete, 1);
  }

  /**
   * callback function in subscribe if the user is in his profile
   * @param kweek
   * No @returns
   */
  deleteProfileCallBack(kweek: Kweek): void {
    const id = kweek.id;
    let indexToDelete = this.kweeks.indexOf(kweek);
    this.kweeks.splice(indexToDelete, 1);

    this.kweeks.forEach(loopKweek => {
      if (loopKweek.id === id) {
        indexToDelete = this.kweeks.indexOf(loopKweek);
        this.kweeks.splice(indexToDelete, 1);
        return;
      }
    });
  }
  
  /**
   * set a delay by await delay(300); 300 ms
   * @param ms
   * @returns promise
   */
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

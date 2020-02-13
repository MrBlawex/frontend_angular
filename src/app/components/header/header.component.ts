import { Component } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef
} from "@angular/material/bottom-sheet";
import { AuthService } from "src/app/components/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  constructor(
    private _bottomSheet: MatBottomSheet,
    public authService: AuthService
  ) {}

  openBottomSheet(): void {
    // this._bottomSheet.open();
  }

  logout() {
    this.authService.deleteToken();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet, public authService:AuthService) { }

  ngOnInit() {
  }

  openBottomSheet(): void {
   // this._bottomSheet.open();
  }

  
  logout(){
    this.authService.setIsLogin(false);
  }
}


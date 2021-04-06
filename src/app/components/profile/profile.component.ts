import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  currentUser: any;
  currentDate: any = Date.now();
  userSmeLoanAccount: any;
  imageSource;
  bankStatementSixMonths;
  referee1Signature;
  referee2Signature;

  //togglesections
  toggleRefereeSection: boolean = false;
  toggleBasicInfoSection: boolean = false;
  toggleBusinessInfoSection: boolean = false;
  toggleBankInfoSection: boolean = false;
  toggleIdentificationSection: boolean = false;

  constructor(private token: TokenStorageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userSmeLoanAccount = this.currentUser.sme_account;
    console.log(this.userSmeLoanAccount);

    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.userSmeLoanAccount.identificationCard}`);
    this.bankStatementSixMonths = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.userSmeLoanAccount.bankStatementSixMonths}`);
    this.referee1Signature = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.userSmeLoanAccount.referee1SignatureDoc}`);
    this.referee2Signature = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.userSmeLoanAccount.referee2SignatureDoc}`);

  }

  toggleBasicInfo(){
    this.toggleBasicInfoSection = !this.toggleBasicInfoSection;

    this.toggleBusinessInfoSection = false;
    this.toggleBankInfoSection = false;
    this.toggleIdentificationSection = false;
    this.toggleRefereeSection = false;
  }
  toggleBusinessInfo(){
    this.toggleBusinessInfoSection = !this.toggleBusinessInfoSection;

    this.toggleBasicInfoSection = false;
    this.toggleBankInfoSection = false;
    this.toggleRefereeSection = false;
    this.toggleIdentificationSection = false;

  }

  toggleBankingInfo(){
    this.toggleBankInfoSection = !this.toggleBankInfoSection;

    this.toggleBasicInfoSection = false;
    this.toggleBusinessInfoSection = false;
    this.toggleIdentificationSection = false;
    this.toggleRefereeSection = false;
  }
  toggleIdentificationInfo(){
    this.toggleIdentificationSection = !this.toggleIdentificationSection;

    this.toggleBasicInfoSection = false;
    this.toggleBusinessInfoSection = false;
    this.toggleBankInfoSection = false;
    this.toggleRefereeSection = false;


  }
  toggleRefereeInfo(){
    this.toggleRefereeSection = !this.toggleRefereeSection;

    this.toggleBasicInfoSection = false;
    this.toggleBusinessInfoSection = false;
    this.toggleBankInfoSection = false;
    this.toggleIdentificationSection = false;


  }

}

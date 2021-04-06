import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

export class LoanModel{
  loanAmount: number;
  interest: number;
  repayment: number;
}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  token: string;
  @Input() loanCalculator: any = { loanAmount: 0, interest: 0, repayment: 0 }
  loanResult: any;

  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
      this.token = user.accessToken;

    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  calculateLoan(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer '+ this.token
      })
    }
  this.http.post<LoanModel>("http://localhost:9999/api/v1/SmeLoanAccount/localCalculatorInMonths", JSON.stringify(this.loanCalculator), httpOptions).subscribe(res => {
    this.loanResult = res;
    console.log(this.loanResult);
  })

  }


}

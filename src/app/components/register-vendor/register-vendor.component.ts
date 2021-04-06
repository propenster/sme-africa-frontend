import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HandlerService } from 'src/app/services/handler.service';

export interface Location{
  name: string;
}

@Component({
  selector: 'app-register-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.css']
})
export class RegisterVendorComponent implements OnInit {

  locations: Location[] = [
    {name: 'Gwagwalada'},

    {name: 'Wuse'},
    {name: 'Murtala way'},
    {name: 'Lekki'},
    {name: 'Asokoro District'},
    {name: 'Oniru'},
    {name: 'Onipanu'},
    {name: 'Mile 12'},
    {name: 'Ikeja'},
    {name: 'Dopemu'},
    {name: 'Bodija'},
    {name: 'Oba Ile'},

  ]


  constructor(private service: HandlerService, private router: Router) { }

  ngOnInit(): void {
  }
  entryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),

    imageUrl: new FormControl('', Validators.required)
  })


  onSubmit(){
    console.log(this.entryForm.value);
    this.service.postDriver(this.entryForm.value).subscribe((data) =>{
      console.log(data);
      this.router.navigate(['/']);
    })
  }

}

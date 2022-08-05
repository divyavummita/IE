import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserlistComponent } from '../userlist/userlist.component';
import { CustomerService } from '../_services/customer.service';
import { HttpProxyService } from '../_services/http-proxy.service';
import { UserlistService } from '../_services/userlist.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styles: [
  ]
})
export class UserformComponent implements OnInit {
  // firstName="";
  // lastName="";
  // email="";
  newpost={
    firstName:"",
    lastName:"",
    email:""
  }
   userId:string='';
   
 
  constructor( private _userlist: UserlistService, public customer: CustomerService, private route:ActivatedRoute,private router:Router) { }
// Actived route: Holds currents URL Details
//params:all the variable from URL
  ngOnInit(): void {

    let customerId={
      customerId :this.customer.customerData.id
    }
    this.userId = this.route.snapshot.params['id'];
    console.log(this.userId);
     if(this.userId){
      this._userlist.getByIdAsync(this.userId,customerId).subscribe((res)=>{
        
        this.newpost.firstName = res.firstName;
        this.newpost.lastName = res.lastName;
        this.newpost.email = res.email;

        console.log('response',res);
        console.log('Id', customerId);
      })
     }
    
  }

  save(){
    // console.log(this.newpost);
    console.log(this.customer.customerData);
    const postData: any = this.newpost;
    postData.customerId = this.customer.customerData.id;
    postData.password ="abcd";
    postData.address = {
      address1: null,
      state: null,
      address2: null,
      city: null,
      countryCode: this.customer.customerData.country,
      zipCode: null,
      phone: null
    }; 

    if(this.userId){
      console.log(this.userId);
      // Mandatory field actiona n Status
      postData.action= 'All';
      postData.active ='Active'

      this._userlist.putAsync(this.userId,postData).subscribe((res)=>{
          console.log('editvalue',res);
          this.router.navigate(['/', this.customer.customerData.key, 'userlist'])
      })

    }
    else {
      this._userlist.postAsync(postData).subscribe((response)=>{
        console.log(response);
    
    })
    }

    console.log(postData);

  }




}



//call Api,
// provide the data and should be display in the list page....


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactUsService } from 'shared/services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contact = {};
  headerData = {};

  constructor(private contactUsService: ContactUsService, private router: Router) {

    this.headerData['title'] = "Contact Us";
    this.headerData['description'] = "We'd like to hear from you!";
    this.headerData['imageUrl'] = "banner1.jpg";
    this.headerData['height'] = "300";

   }

  ngOnInit() {
  }

  updateContactForm() {
    let messageDetails = this.contact;
    messageDetails['dateTime'] = new Date().getTime() + ''; 
    this.contactUsService.addNewMessage(this.contact);
    alert("Message Sent. Thank you for your time!");
    window.location.href = '/'
  }

}

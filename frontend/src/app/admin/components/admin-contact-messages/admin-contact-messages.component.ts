import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'shared/services/contact-us.service';

@Component({
  selector: 'app-admin-contact-messages',
  templateUrl: './admin-contact-messages.component.html',
  styleUrls: ['./admin-contact-messages.component.css']
})
export class AdminContactMessagesComponent implements OnInit {

  messages;
  headerData = {};

  constructor(private contactUsService: ContactUsService) {

    this.headerData['title'] = "Contact Us Messages";
    this.headerData['description'] = "All contact messages from users at one place!";
    this.headerData['imageUrl'] = "banner3.jpg";
    this.headerData['height'] = "300";

    this.messages = contactUsService.getAllMessages();

   }

  ngOnInit() {
  }

}

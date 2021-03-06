// angular componetns
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
// service
import { DataService } from '../services/data.service';
// models
import { MiniUser } from '../model/mini-user';
import { User } from '../model/user';
// angular material
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { ChatService } from '../chat/chat.service';
import { ChatComponent } from '../chat/chat.component';
import { MatDialogRef } from '@angular/material';

/**
 * search freinds to send message
 */
@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.css',
              '../direct-messages/direct-messages.component.css']
})
export class InboxListComponent implements OnInit {
  /**
   * creating message form
   */
  myForm2: FormGroup;
  /**
   * if message conatin image add div
   */
  uploadImg = false;
  /**
   * image url if uploaded
   */
  imgURL: any;
  /**
   * filtered list of users
   */
  users: User[];
  /**
   * selected users list to send message
   */
  selectedUsers: string[] = [];
  /**
   * reactive form
   */
  myForm: FormGroup;
  /**
   * user selected addresses
   */
  secondStep=false;
  /**
   * css effects
   */
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  /**
   * image that will be uploaded
   */
  image:File;
  /**
   * keyboard shortcuts
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  /**
   * build the reactive form group
   * @param data data service to connect with backend
   * @param fb component has 2 reactive forms
   * @param chatService to change section
   * @param DialogRef for pop up
   */
  constructor(private data: DataService,
              private fb: FormBuilder,
              private chatService:ChatService,
              public DialogRef: MatDialogRef<ChatComponent>) {
   }
  /**
   * intialize forms
   */
  ngOnInit(): void {
    this.myForm = this.fb.group({
      filterBy: ['']
    });
    this.myForm2 = this.fb.group({
      message: ['', [
        Validators.required
      ]],
      file : [null]
      });
    this.data.getRecentConversations().subscribe(users => {
      this.users = users.slice(0,7); }
      );
  }
  /**
   * after each char send new request
   */
  newSearch() {
    this.data.searchUsers(this.myForm.controls.filterBy.value).subscribe(
      list => { this.users = list.slice(0,7); }
    );
  }
  /**
   * remove one of selected users
   * @param user selected user to get removed
   */
  remove(user) {
    const index = this.selectedUsers.indexOf(user);
    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
  }
}
/**
 * on enter add user
 * @param event keyboard shortcuts event
 */
add(event: MatChipInputEvent): void {
  const input = event.input;
  let found = false;
  // tslint:disable-next-line:no-shadowed-variable
  this.selectedUsers.forEach(element => {
    if ( this.users[0].username === element) {
        found = true;
    }
  }
  );
  if ( found) {
    return;
  }
  if (this.users.length > 0) {
    this.selectedUsers.push( this.users[0].username);
  }
  // Reset the input value
  if (input) {
    input.value = '';
  }
}
/**
 * select user by click
 * @param user user that get clicked on
 */
  selectUser(user: User) {
    let flag = false;
    // tslint:disable-next-line:no-shadowed-variable
    this.selectedUsers.forEach(element => {
      if ( user.username === element) {
          flag = true;
      }
    }
    );
    if ( flag) {
      return;
    }
    this.selectedUsers.push(user.username);
  }


  /**
   * click input tag on button click
   */
  upload() {
    const element: HTMLElement = document.getElementById('fileInput') as HTMLElement;
    element.click();
  }
  /**
   * preview images after uploading it
   * @param files uploaded images
   */
  uploadIamge(files) {
    this.uploadImg = true;
    const reader = new FileReader();
    const imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.image = files[0];
  }
  /**
   * remove image from uploading it
   */
  removeImg() {
    this.uploadImg = false;
    this.myForm2.patchValue({
      file: null
    });
  }
  /**
   * send current message
   */
  send() {
    for(let i=0;i<this.selectedUsers.length;i++) {
    const message = {
      text: '',
      username: '',
      media_id: ''
    };
    message.text = this.myForm2.controls.message.value;
    message.username = this.selectedUsers[i];
    if(this.uploadImg===true){
       this.data.postMedia(this.image).subscribe(mediaUrl => {message.media_id= mediaUrl.media_id;
        this.data.createMessage(message).subscribe();}
        );
    } else {
      message.media_id = '' ;
      this.data.createMessage(message).subscribe();
    }
    this.myForm.reset();
    this.removeImg();
  }
  this.chatService.setSection(1);
  }
  /**
   * next step to send message;
   */
  next(){
    this.secondStep = true;
  }
  /**
   * after sending message return to inbox 
   */
  toInbox(){
    this.chatService.setSection(1);
  }
  /**
   * close dialog
   */
  exit(){
    this.DialogRef.close();
  }
}

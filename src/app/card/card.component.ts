import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Post, user } from '../post';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() post!: Post

  user:any;


  subU = new BehaviorSubject<any>({})
  obsU = this.subU.asObservable();

  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.user = this.getUser();
  }

  getUser(){
    this.http.get<[]>("http://localhost:3000/api/users/" + this.post.autore).subscribe((user) => {
      this.user = user;
      // this.subU.next(this.user)
    })
  }
  }


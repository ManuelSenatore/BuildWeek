import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
   arrayPost: Post[] = []

   url =  "http://localhost:3000/api/";

  sub = new BehaviorSubject<Post[]>([])
  obs = this.sub.asObservable()

  constructor(private http: HttpClient) {}

  arrayPostGet() {
    this.http.get<Post[]>(this.url + "posts").subscribe((posts:Post[]) => {
      this.arrayPost = posts;
      this.sub.next(this.arrayPost)
    })
  }
}

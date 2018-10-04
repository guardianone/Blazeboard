import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  selectedPost: Post;
  posts: Post[];
  isCreating: boolean;
  model = new Post();
  isSubmitted: boolean;
  isError: boolean;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAll().subscribe(posts => this.posts = posts);
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  onCreate(): void {
    this.isCreating = true;
	this.isSubmitted = false;
	this.isError = false;
  }

  onCancel(): void {
    this.isCreating = false;
	this.isSubmitted = false;
	this.isError = false;
  }

  onSubmit(): void {
    this.postService.add(this.model)
	  .subscribe(mod => {
	    if (mod == null) {
		  this.isError = true;
		}
		else {
		  this.posts.push(mod);
		}
	});
	this.isSubmitted = true;
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  post: Post = { id: 0, title: '', content: '' };

  constructor(private postService: PostService) {}

  onSubmit(): void {
    this.postService.addPost(this.post);
    this.post = { id: 0, title: '', content: '' }; // Reset form
  }
}

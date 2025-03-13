import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsKey = 'blogPosts';
  private posts: Post[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadPosts();
  }

  // Check if the code is running in the browser
  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Load posts from LocalStorage
  private loadPosts(): void {
    if (this.isLocalStorageAvailable()) {
      const postsJson = localStorage.getItem(this.postsKey);
      if (postsJson) {
        this.posts = JSON.parse(postsJson);
      }
    }
  }

  // Save posts to LocalStorage
  private savePosts(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.postsKey, JSON.stringify(this.posts));
    }
  }

  // Get all posts
  getPosts(): Post[] {
    return this.posts;
  }

  // Add a new post
  addPost(post: Post): void {
    post.id = this.posts.length + 1;
    this.posts.push(post);
    this.savePosts();
  }

  // Delete a post by ID
  deletePost(id: number): void {
    this.posts = this.posts.filter((post) => post.id !== id);
    this.savePosts();
  }
}

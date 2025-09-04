import { Post } from "@/app/domain/post/entities/Post";
import { PostRepository } from "@/app/domain/post/repositories/PostRepository";

export class PostLocalStorage implements PostRepository {
  private key = "posts";

  private transformToPost(data: any): Post {
    return {
      id: data.id || crypto.randomUUID(),
      user: {
        username: data.user?.username || 'Usuario',
        avatar: data.user?.avatar || '',
        postTime: data.user?.postTime || new Date().toISOString(),
        verified: data.user?.verified || false
      },
      content: {
        text: data.content?.text || '',
        images: Array.isArray(data.content?.images) ? data.content.images : [],
        link: data.content?.link
      },
      stats: {
        likes: typeof data.stats?.likes === 'number' ? data.stats.likes : 0,
        comments: typeof data.stats?.comments === 'number' ? data.stats.comments : 0,
        reposts: typeof data.stats?.reposts === 'number' ? data.stats.reposts : 0,
        views: typeof data.stats?.views === 'number' ? data.stats.views : 0
      },
      actions: {
        liked: !!data.actions?.liked,
        bookmarked: !!data.actions?.bookmarked,
        reposted: !!data.actions?.reposted
      },
      tags: Array.isArray(data.tags) ? data.tags : [],
      reposts: Array.isArray(data.reposts) ? data.reposts.map((r: any) => this.transformToPost(r)) : [],
      voiceNotes: Array.isArray(data.voiceNotes) ? data.voiceNotes : []
    };
  }

  async getAll(): Promise<Post[]> {
    try {
      const data = localStorage.getItem(this.key);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      
      return parsed.map(post => this.transformToPost(post));
    } catch (error) {
      console.error('Error parsing posts from localStorage:', error);
      return [];
    }
  }

  async create(post: Post): Promise<void> {
    try {
      const posts = await this.getAll();
      const newPost = this.transformToPost(post);
      posts.unshift(newPost);
      localStorage.setItem(this.key, JSON.stringify(posts));
    } catch (error) {
      console.error('Error saving post to localStorage:', error);
      throw error;
    }
  }
}

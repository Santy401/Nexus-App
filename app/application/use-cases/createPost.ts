import { Post } from "@/app/domain/post/entities/Post";
import { PostRepository } from "@/app/domain/post/repositories/PostRepository";

export class CreatePost {
  constructor(private postRepo: PostRepository) {}

  async execute(text: string, img?: string): Promise<Post> {
    const newPost: Post = {
      id: crypto.randomUUID(),
      user: {
        username: "Tú",
        avatar: "",
        postTime: "Ahora",
        verified: false
      },
      content: {
        text,
        images: img ? [img] : [],
      },
      stats: {
        likes: 0,
        comments: 0,
        reposts: 0,
        views: 0
      },
      actions: {
        liked: false,
        bookmarked: false,
        reposted: false
      },
      tags: [],
      reposts: [],
      voiceNotes: []
    };

    await this.postRepo.create(newPost);
    return newPost;
  }
}

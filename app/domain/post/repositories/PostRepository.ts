import { Post } from "../entities/Post";

export interface PostRepository {
  getAll(): Promise<Post[]>;
  create(post: Post): Promise<void>;
}

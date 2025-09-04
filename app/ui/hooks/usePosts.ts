import { useState, useEffect } from "react";
import { Post } from "@/app/domain/post/entities/Post";
import { PostLocalStorage } from "@/app/infraestructure/adapters/PostLocalStorage";
import { CreatePost } from "@/app/application/use-cases/createPost";

const postRepo = new PostLocalStorage();
const createPostUseCase = new CreatePost(postRepo);

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postRepo.getAll()
      .then(setPosts)
      .catch(error => {
        console.error('Error loading posts:', error);
        setPosts([]);
      });
  }, []);

  const createPost = async (text: string, img?: string) => {
    const newPost = await createPostUseCase.execute(text, img);
    setPosts(prev => [newPost, ...prev]);
  };

  return { posts, createPost };
}

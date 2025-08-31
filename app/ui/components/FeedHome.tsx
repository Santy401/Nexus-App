import { useState } from 'react';
import DefaultUser from '@/app/ui/aseets/defaultUser.png';
import PostsList from '@/app/ui/components/Post';
import MOCK_POSTS from '@/app/ui/components/Post';
import '@/app/ui/styles/FEEDSTYLES.css';

export const FeedHome = () => {
  const [postText, setPostText] = useState('');

  return (
    <div className='h-screen'>
        <div id="CreatedPosts" className=''>
            <div id="TextPosts" className='flex'>
                <img src={DefaultUser.src} alt="PhotoUser" className='w-9 h-9 rounded-full'/>
                <input 
                  type="text" 
                  name="postText" 
                  placeholder="¿Qué estás pensando?" 
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className='focus:outline-none w-full ml-2'
                />
                {postText.trim() !== '' && <button className='text-black bg-white hover:bg-gray-200 h-8 w-1/7 rounded-lg'>Publicar</button>}
            </div>
        </div>
        <PostsList postData={MOCK_POSTS}/>
    </div>
  )
}

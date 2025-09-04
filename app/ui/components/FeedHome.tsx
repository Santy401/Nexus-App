import { useState, useRef, useEffect } from 'react';
import DefaultUser from '@/app/ui/aseets/defaultUser.png';
import PostsList from '@/app/ui/components/Post';
import { usePosts } from '../hooks/usePosts';
import '@/app/ui/styles/FEEDSTYLES.css';
2
import '@/app/ui/styles/ADDPOST.css';

import { ImagePlus, Video, ScanText, SmilePlus, Globe, GlobeLock, Users, LucideStars, ChevronDown } from 'lucide-react'

const VisibilityOptions = [
  { id: 'public', icon: <Globe className="w-4 h-4" />, label: 'Público' },
  { id: 'friends', icon: <Users className="w-4 h-4" />, label: 'Amigos' },
  { id: 'close_friends', icon: <LucideStars className="w-4 h-4" />, label: 'Mejores Amigos' },
  { id: 'only_me', icon: <GlobeLock className="w-4 h-4" />, label: 'Solo yo' },
];

export const FeedHome = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState(VisibilityOptions[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { posts, createPost } = usePosts();
  const [text, setText] = useState("");

  const handlePublish = () => {
    if (!text.trim()) return;
  
    console.log('Posts data:', posts);

    const newPost = {
      id: crypto.randomUUID(),
      user: { 
        username: "Tú", 
        avatar: "/user.png", 
        verified: true, 
        postTime: "Ahora" 
      },
      content: { text },
      stats: { likes: 0, comments: 0, reposts: 0 },
      actions: { liked: false, bookmarked: false, reposted: false },
      tags: [],
      visibility: selectedVisibility.id 
    };
  
    createPost(text);
    setText("");
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='h-screen'>
      <div id="CreatedPosts" className=''>
        <div id="TextPosts" className='flex p-3 items-center gap-1.5'>
          <img src={DefaultUser.src} alt="PhotoUser" className='w-9 h-9 rounded-full' />
          <div className='relative flex items-center w-full ml-2'>
            <SmilePlus className='absolute right-[3%] w-5 h-5 text-gray-500 hover:text-white cursor-pointer' />
            <input
              type="text"
              name="postText"
              placeholder="¿Qué estás pensando?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className='focus:outline-white w-full pr-[10%] pl-[2%] border-1 border-gray-500 rounded-lg p-2'
            />
          </div>
          {text.trim() !== '' && <button onClick={handlePublish} className='text-black bg-white hover:bg-gray-200 h-8 w-1/7 rounded-lg'>Publicar</button>}
        </div>
        <div className='flex pl-14 w-full'>
          <div className='flex gap-2'>
            <div id='optionsPost'><ImagePlus id='iconOptionPost' /><span>Imagen</span></div>
            <div id='optionsPost'><Video id='iconOptionPost' /><span>Video</span></div>
            <div id='optionsPost'><ScanText id='iconOptionPost' /><span>Encuesta</span></div>
          </div>
          <div className="relative ml-auto" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-sm px-3 py-1 rounded-md transition-colors text-white"
            >
              {selectedVisibility.icon}
              <span>{selectedVisibility.label}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                {VisibilityOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSelectedVisibility(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 ${
                      selectedVisibility.id === option.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <PostsList />
    </div>
  )
}

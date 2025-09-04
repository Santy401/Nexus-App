import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: number;
  imageUrl: string;
  user: {
    name: string;
    avatar: string;
  };
}

const mockStories: Story[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop',
    user: {
      name: 'User Manager',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop',
    user: {
      name: 'User2 Manager2',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&auto=format&fit=crop',
    user: {
      name: 'Travel Lover',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    }
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&auto=format&fit=crop',
    user: {
      name: 'Nature Explorer',
      avatar: 'https://randomuser.me/api/portraits/men/82.jpg'
    }
  }
];

const StoryViewer = ({
  stories,
  initialIndex,
  onClose,
  onNext,
  onPrev,
}: {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
  }, [initialIndex]);

  useEffect(() => {
    if (isPaused) return;

    const duration = 20000; // Duracion de historias (10 segundos)
    const startTime = Date.now();
    const startProgress = progress;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(startProgress + (elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        onNext();
      } else {
        requestAnimationFrame(updateProgress);
      }
    };
    
    const frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, [currentIndex, isPaused, onNext, progress]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    const { left, right } = e.currentTarget.getBoundingClientRect();
    const middleThirdStart = left + (right - left) / 3;
    const middleThirdEnd = right - (right - left) / 3;
    
    if (touchX > middleThirdStart && touchX < middleThirdEnd) {
      setIsPaused(prev => !prev);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const { left, right } = e.currentTarget.getBoundingClientRect();
    const touchX = touch.clientX;
    const oneThird = (right - left) / 3;
    
    if (touchX < left + oneThird) {
      onPrev();
    } else if (touchX > right - oneThird) {
      onNext();
    }
  };

  const currentStory = stories[currentIndex];
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="relative w-[80vw] h-[80vh] max-w-3xl max-h-[80vh] bg-black rounded-xl overflow-hidden">
      <div className="absolute top-0 left-0 right-0 flex p-4 gap-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="h-1 bg-gray-600 flex-1 rounded-full overflow-hidden">
            <div 
              className={`h-full ${index < currentIndex ? 'bg-white' : index === currentIndex ? 'bg-white' : 'bg-white/30'}`}
              style={{ 
                width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                transition: 'width 0.1s linear'
              }}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2"
        aria-label="Cerrar"
      >
        <X size={24} />
      </button>

      <div 
        className="relative w-full h-full flex-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0">
          <Image
            src={currentStory.imageUrl}
            alt={`Historia de ${currentStory.user.name}`}
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button 
          onClick={onPrev}
          className="h-full w-1/3 flex items-center justify-start opacity-0 hover:opacity-100 transition-opacity"
          aria-label="Anterior"
        >
          <ChevronLeft className="text-white" size={48} />
        </button>
        <button 
          onClick={onNext}
          className="h-full w-1/3 flex items-center justify-end opacity-0 hover:opacity-100 transition-opacity"
          aria-label="Siguiente"
        >
          <ChevronRight className="text-white" size={48} />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center">
        <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white">
          <Image
            src={currentStory.user.avatar}
            alt={currentStory.user.name}
            width={40}
            height={40}
            className="object-cover"
            unoptimized
          />
        </div>
        <span className="ml-3 text-white font-medium">
          {currentStory.user.name}
        </span>
      </div>
    </div>
    </div>
  );
};

export const Storie = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const openStoryViewer = useCallback((index: number) => {
    setCurrentStoryIndex(index);
    setIsViewerOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const goToNextStory = useCallback(() => {
    setCurrentStoryIndex(prev => {
      if (prev < mockStories.length - 1) {
        return prev + 1;
      } else {
        closeViewer();
        return prev;
      }
    });
  }, [closeViewer]);

  const goToPrevStory = useCallback(() => {
    setCurrentStoryIndex(prev => (prev > 0 ? prev - 1 : 0));
  }, []);

  return (
    <div className="relative">
      <div className="flex space-x-4 pb-4 overflow-x-auto scrollbar-hide">
        {mockStories.map((story, index) => (
          <div 
            key={story.id} 
            className="flex-shrink-0 w-32 cursor-pointer"
            onClick={() => openStoryViewer(index)}
          >
            <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-200">
              <Image
                src={story.imageUrl}
                alt={`Historia de ${story.user.name}`}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center space-x-2">
                  <div className="relative h-6 w-6 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={story.user.avatar}
                      alt={story.user.name}
                      width={24}
                      height={24}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="text-xs font-medium text-white truncate">
                    {story.user.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {isViewerOpen && (
        <StoryViewer
          stories={mockStories}
          initialIndex={currentStoryIndex}
          onClose={closeViewer}
          onNext={goToNextStory}
          onPrev={goToPrevStory}
        />
      )}
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
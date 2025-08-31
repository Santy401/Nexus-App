import { Storie } from '@/app/ui/components/storie';
import Download from '@/app/ui/aseets/DowloadQR.png';
import { Suggestions } from '@/app/ui/components/suggeestions';

export const FeedRight = () => {
  return (
    <div className="flex flex-col fixed right-0 w-[20%] h-screen p-4 overflow-y-auto">
      <div className="stories-container">
        <h2 className="text-lg font-semibold text-primary mb-4">Historias</h2>
        <div id='CreateStory' className='position absolute left-0 top-[18%] text-2xl font-bold cursor-pointer bg-white rounded-full p-2 text-black z-10 hover:bg-gray-200 transition-colors h-8 w-8 flex items-center justify-center'>+</div>
        <Storie/>
        <div id='Suggestion'>
          <Suggestions/>
        </div>
      </div>
      <img src={Download.src} alt="Download" className=" scale-70 filter invert mt-4" />
    </div>
  );
};

import { Home, MessageSquare, Users, Bell, Settings } from 'lucide-react';
import Download from '@/app/ui/aseets/DowloadQR.png';
import Logo from '@/app/ui/aseets/LogoDontBG.png';

export const FeedNavbar = () => {
    return (
        <nav className='flex flex-col justify-between h-screen mt-8 position fixed w-1/5'>
            {/* <div id='profile' className='flex flex-col'>
                <img src={DefaultUser.src} alt="PhotoUser" className="w-44 h-44 mb-2 rounded-full flex m-auto" />
                <span id='username' className='text-2xl font-bold text-center'>DefaultUser</span>
                <span id='identifier' className='text-center text-gray-300'>@defaultuser</span>
            </div> */}
            <img src={Logo.src} alt="Logo" className="w-1/1 h-1/12 object-cover ml-6 " />
            <ul className='flex flex-col w-fit h-[20%] m-auto gap-6'>
                <div className='flex flex-col items-start gap-10'>
                    <li className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <Home className="w-5 h-5" />
                        <a href="#">Feed</a>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        <a href="#">Mensajes</a>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <Users className="w-5 h-5" />
                        <a href="#">Amigos</a>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <Bell className="w-5 h-5" />
                        <a href="#">Notificaciones</a>
                    </li>
                    <li className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <Settings className="w-5 h-5" />
                        <a href="#">Configuración</a>
                    </li>
                    <form action="/infraestructure/api/auth/logout" method="POST" className="mb-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Cerrar Sesión
                        </button>
                    </form>
                </div>
            </ul>
            <img src={Download.src} alt="Download" className=" scale-2  mt-4 " />
        </nav>
    )
}

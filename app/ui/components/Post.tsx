import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Repeat2, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DefaultUser from '@/app/ui/aseets/defaultUser.png';

const MOCK_POSTS = [
    {
        id: 1,
        user: {
            username: "AnaGarcia",
            avatar: DefaultUser.src,
            postTime: "3h ago",
            verified: true
        },
        content: {
            text: "¡Acabo de visitar el museo de arte moderno y quedé maravillada con las nuevas exposiciones! Definitivamente recomiendo visitarlo este fin de semana. ¿Alguien más ha ido recientemente?",
            images: [
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            ]
        },
        stats: {
            likes: 243,
            comments: 42,
            reposts: 18,
            views: 1250
        },
        actions: {
            liked: false,
            bookmarked: false,
            reposted: false
        },
        tags: ["#Arte", "#Museo", "#Cultura"]
    },
    {
        id: 2,
        user: {
            username: "CarlosTech",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            postTime: "5h ago",
            verified: false
        },
        content: {
            text: "Acabo de terminar de desarrollar una nueva aplicación móvil con React Native. ¡Estoy muy emocionado con los resultados! ¿Qué opinan de las nuevas tendencias en desarrollo móvil?",
            images: [
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            ],
            link: {
                url: "https://github.com/carlostech/app-demo",
                title: "Ver repositorio en GitHub",
                description: "Código fuente de la nueva aplicación móvil"
            }
        },
        stats: {
            likes: 187,
            comments: 35,
            reposts: 12,
            views: 980
        },
        actions: {
            liked: true,
            bookmarked: true,
            reposted: false
        },
        tags: ["#Programación", "#ReactNative", "#DesarrolloMóvil"]
    },
    {
        id: 3,
        user: {
            username: "ViajeraSofia",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            postTime: "1d ago",
            verified: true
        },
        content: {
            text: "¡Miren esta vista increíble desde mi último destino! La naturaleza siempre nos regala los mejores paisajes. ¿Cuál ha sido el lugar más hermoso que han visitado?",
            images: [
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            ]
        },
        stats: {
            likes: 542,
            comments: 87,
            reposts: 43,
            views: 2560
        },
        actions: {
            liked: false,
            bookmarked: false,
            reposted: true
        },
        tags: ["#Viajes", "#Naturaleza", "#Aventura", "#Paisajes"]
    }
];

// Componente Post individual
export const Post = ( { postData } ) => {
    const [commentText, setCommentText] = useState('');
    const [isLiked, setIsLiked] = useState(postData.actions?.liked || false);
    const [isBookmarked, setIsBookmarked] = useState(postData.actions?.bookmarked || false);
    const [isReposted, setIsReposted] = useState(postData.actions?.reposted || false);

    return (
        <div className="bg-[#1c1c1c] border border-[#3B3D3E] rounded-lg p-4 mb-4 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                    <img
                        src={postData.user.avatar}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex align-center items-center gap-1">
                        <div className='flex align-center items-center gap-1'>
                            <span className="font-semibold text-white">{postData.user.username}</span>
                            {postData.user.verified && (
                                <span className="text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </span>
                            )}
                            <span>•</span>
                            <span className="text-xs text-gray-400">{postData.user.postTime}</span>
                        </div>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="mb-4">
                <p className="text-white mb-3 text-start">
                    {postData.content.text}
                </p>

                {/* Tags */}
                {postData.tags && postData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {postData.tags.map((tag, index) => (
                            <span key={index} className="text-blue-400 text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Images */}
                {postData.content.images && postData.content.images.length > 0 && (
                    <div className={`grid ${postData.content.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 rounded-lg overflow-hidden`}>
                        {postData.content.images.map((imgSrc, index) => (
                            <img
                                key={index}
                                src={imgSrc}
                                alt={`Post content ${index + 1}`}
                                className="w-full h-48 object-cover"
                            />
                        ))}
                    </div>
                )}

                {/* Link preview */}
                {postData.content.link && (
                    <div className="mt-3 p-3 border border-[#3B3D3E] rounded-lg">
                        <a href={postData.content.url} className="text-blue-400 hover:underline">
                            {postData.content.link.title}
                        </a>
                        <p className="text-gray-400 text-sm">{postData.content.link.description}</p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mb-3 pt-3 border-t border-[#3B3D3E]">
                <div className="flex space-x-4">
                    <motion.button
                        className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`}
                        onClick={() => setIsLiked(!isLiked)}
                        whileTap={{ scale: 1.2 }}
                    >
                        <AnimatePresence mode="wait">
                            {isLiked ? (
                                <motion.div
                                    key="filled"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Heart className="w-5 h-5 mr-1" fill="currentColor" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="outline"
                                    initial={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <Heart className="w-5 h-5 mr-1" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <span className="text-sm">{isLiked ? 'Liked' : 'Like'}</span>
                    </motion.button>

                    <motion.button
                        className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle className="w-5 h-5 mr-1" />
                        <span className="text-sm">Comment</span>
                    </motion.button>

                    <motion.button
                        className="flex items-center text-gray-400 hover:text-green-500 transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <Share2 className="w-5 h-5 mr-1" />
                        <span className="text-sm">Share</span>
                    </motion.button>
                </div>
                <div className="flex space-x-4">
                    <motion.button
                        className={`flex items-center ${isReposted ? 'text-purple-500' : 'text-gray-400 hover:text-purple-500'} transition-colors`}
                        onClick={() => setIsReposted(!isReposted)}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Repeat2 className="w-5 h-5 mr-1" />
                        <span className="text-sm">Repost</span>
                    </motion.button>

                    <motion.button
                        className={`flex items-center ${isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'} transition-colors`}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        whileTap={{ scale: 1.2 }}
                    >
                        <AnimatePresence mode="wait">
                            {isBookmarked ? (
                                <motion.div
                                    key="filled"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Bookmark className="w-5 h-5" fill="currentColor" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="outline"
                                    initial={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <Bookmark className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between text-sm text-gray-400 border-t border-[#3B3D3E] pt-3">
                <div>
                    <span>{postData.stats.likes} Likes</span>
                    {postData.stats.views && <span className="ml-3">{postData.stats.views} Views</span>}
                </div>
                <div className="flex space-x-2">
                    <span>{postData.stats.comments} Comments</span>
                    <span>•</span>
                    <span>{postData.stats.reposts} Reposts</span>
                </div>
            </div>

            {/* Comment Input */}
            <div id='InputComment' className='flex items-center mt-3'>
                <input
                    type="text"
                    placeholder="Añadir un comentario..."
                    className='w-full h-10 border border-[#3B3D3E] p-2 rounded-lg focus:outline-none bg-transparent text-white'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                {commentText && (
                    <button className='text-black bg-white hover:bg-gray-200 h-10 px-4 rounded-lg ml-2'>
                        Publicar
                    </button>
                )}
            </div>
        </div>
    );
};

// Componente para mostrar múltiples posts
export const PostsList = () => {
    return (
        <div>
            {MOCK_POSTS.map(post => (
                <Post key={post.id} postData={post} />
            ))}
        </div>
    );
};

export default PostsList;
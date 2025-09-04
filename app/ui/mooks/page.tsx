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

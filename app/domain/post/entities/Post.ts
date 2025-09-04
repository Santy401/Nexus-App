export interface Post {
    id: string;
    user: {
        username: string;
        avatar: string;
        postTime: string;
        verified: boolean;
    };
    avatar: string;
    content: {
        text: string;
        images: string[];
        link?: {
            url: string;
            title: string;
            description: string;
        };
    };
    stats: {
        likes: number;
        comments: number;
        reposts: number;
        views: number;
    };
    actions: {
        liked: boolean;
        bookmarked: boolean;
        reposted: boolean;
    };
    tags: string[];
    reposts: Post[];
    voiceNotes: string[];
}
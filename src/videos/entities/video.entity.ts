import { videos } from "@prisma/client";

export class VideoEntity implements videos {
    id: string;
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    duration: number;
    dimension: string;
    caption: boolean;
    licensedContent: boolean;
    projection: string;
    viewCount: number;
    likeCount: number;
    favoriteCount: number;
    commentCount: number;
    shortId: string;
}

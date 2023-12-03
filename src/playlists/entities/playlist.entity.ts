import { playlists } from "@prisma/client";

export class PlaylistEntity implements playlists {
    id: string;
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    defaultLanguage: string;
}

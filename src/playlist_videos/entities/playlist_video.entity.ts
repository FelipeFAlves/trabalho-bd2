import { playlist_videos } from "@prisma/client";

export class PlaylistVideoEntity implements playlist_videos {
    videoId: string;
    playlistId: string;
}

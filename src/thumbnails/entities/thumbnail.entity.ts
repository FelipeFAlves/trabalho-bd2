import { thumbnails } from "@prisma/client";

export class ThumbnailEntity implements thumbnails {
    id: string;
    urlDefault: string;
    widthDefault: number;
    heightDefault: number;
    videoId: string;
}

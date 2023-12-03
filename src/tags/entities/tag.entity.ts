import { tags } from "@prisma/client";

export class TagEntity implements tags {
    id: string;
    videoId: string;
    text: string;
}

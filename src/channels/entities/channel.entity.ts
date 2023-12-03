import { channels } from "@prisma/client";

export class ChannelEntity implements channels {
    id: string;
    title: string;
    description: string;
    customUrl: string;
    publishedAt: Date;
    viewCount: bigint;
    subscriberCount: bigint;
}

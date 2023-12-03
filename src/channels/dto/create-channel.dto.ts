export class CreateChannelDto {
    id: string;
    title: string;
    description: string;
    customUrl: string;
    publishedAt: Date;
    viewCount: bigint;
    subscriberCount: bigint;
}

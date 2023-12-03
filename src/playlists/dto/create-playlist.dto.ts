export class CreatePlaylistDto {
    id: string;
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    defaultLanguage: string;
}

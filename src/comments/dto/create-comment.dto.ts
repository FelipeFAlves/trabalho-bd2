export class CreateCommentDto {
    id: string;
    channelId: string;
    videoId: string;
    topLevelCommentId: string;
    textDisplay: string;
    textOriginal: string;
    authorNameDisplay: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    canRate: boolean;
    viewerRating: number;
    likeCount: number;
    publishedAt: Date;
    updatedAt: Date;
}

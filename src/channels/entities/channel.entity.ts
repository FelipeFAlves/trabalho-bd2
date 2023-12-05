import { channels } from "@prisma/client";

export interface ChannelEntity {
    id: string;
    title: string;
    description: string;
    customUrl: string;
    publishedAt: Date;
    viewCount: string; // Alterado para string
    subscriberCount: string; // Alterado para string
  }

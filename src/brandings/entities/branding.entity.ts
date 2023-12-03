import { brandings } from "@prisma/client";

export class BrandingEntity implements brandings {
    id: string;
    title: string;
    description: string;
    keywords: string[];
}

export interface PartnerDetails {
    thumbnailUrl: string;
    name: string;
    description: string;
}

export type PartnerData = Record<string, PartnerDetails>;

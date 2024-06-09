export interface PartnerDetails {
    name: string;
    logoUrl: string;
    description: string;
    active: boolean;
}

export type Partners = Record<string, PartnerDetails>;

export interface CreateLibraryDto {

    name: string;

    description?: string;

    address: string;

    city?: string;

    state?: string;

    pincode?: string;

    latitude?: number;

    longitude?: number;

    openingMinutes?: number;

    closingMinutes?: number;
}

export interface UpdateLibraryDto {

    name?: string;

    description?: string;

    address?: string;

    city?: string;

    state?: string;

    pincode?: string;

    latitude?: number;

    longitude?: number;

    openingMinutes?: number;

    closingMinutes?: number;

    isActive?: boolean;
}
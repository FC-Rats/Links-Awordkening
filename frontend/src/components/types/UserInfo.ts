export interface UserInfo {
    id: number;
    email: string;
    user: {
        name: string;
        profilPicture?: string;
    };
    birthYear: number;
    tokenR: string | null;
    visibility: string;
    verified: boolean;
    admin: boolean;
    averageScore: number;
}
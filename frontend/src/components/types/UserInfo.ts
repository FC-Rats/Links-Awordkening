export interface UserInfo {
    id: number;
    email: string;
    name: string;
    profilPicture: string;
    birthYear: string;
    tokenR: string | null;
    visibility: string;
    verified: boolean;
    admin: boolean;
    averageScore: number;
}
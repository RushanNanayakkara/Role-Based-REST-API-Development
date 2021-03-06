export enum ClassModule {
    IMAGE_PROCESSING = "image-processing",
    VOICE_REC = "voice-recognition",
    FACE_DETECT = "face-detection"
}

export const JWT_SECRET_ACCESS: string = "test";
export const JWT_SECRET_REFRESH: string = "test_refresh";
export const Auth_Token_TTL: number = 600;
export const Refresh_Token_TTL: number = 60 * 60;
export const Bcrypt_Salt_Rounds: number = 10;
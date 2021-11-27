import { ClassModule } from "../util/constants";

export function classModuleEnumFromValue(value: string) {
    return {
        "image-processing": ClassModule.IMAGE_PROCESSING,
        "voice-recognition": ClassModule.VOICE_REC,
        "face-detection": ClassModule.FACE_DETECT
    }[value];
}
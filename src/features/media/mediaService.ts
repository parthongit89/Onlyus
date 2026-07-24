export type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO';

export interface MediaItem {
  id: string;
  fileName: string;
  fileSizeMb: number;
  mediaType: MediaType;
  url: string;
  previewUrl?: string;
  uploadedAt: string;
}

const ALLOWED_TYPES: Record<string, MediaType> = {
  'image/jpeg': 'IMAGE',
  'image/png': 'IMAGE',
  'image/gif': 'IMAGE',
  'image/webp': 'IMAGE',
  'video/mp4': 'VIDEO',
  'video/webm': 'VIDEO',
  'application/pdf': 'DOCUMENT',
  'application/msword': 'DOCUMENT',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCUMENT',
  'audio/mpeg': 'AUDIO',
  'audio/wav': 'AUDIO',
  'audio/mp3': 'AUDIO',
};

const MAX_FILE_SIZE_MB = 25; // Media Rule: limit max upload size

export class MediaService {
  static validateFile(file: File): { isValid: boolean; mediaType?: MediaType; error?: string } {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return {
        isValid: false,
        error: `Media Rule Violation: File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds maximum allowed limit of ${MAX_FILE_SIZE_MB}MB.`,
      };
    }

    const type = ALLOWED_TYPES[file.type];
    if (!type) {
      return {
        isValid: false,
        error: `Media Rule Violation: Unsupported file format (${file.type || 'unknown'}). Allowed: JPG, PNG, GIF, MP4, PDF, DOC, MP3.`,
      };
    }

    return { isValid: true, mediaType: type };
  }

  static async uploadMedia(file: File): Promise<MediaItem> {
    const validation = this.validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const objectUrl = URL.createObjectURL(file);
    const mediaItem: MediaItem = {
      id: `media_${Date.now()}`,
      fileName: file.name,
      fileSizeMb: parseFloat((file.size / (1024 * 1024)).toFixed(2)),
      mediaType: validation.mediaType!,
      url: objectUrl,
      previewUrl: validation.mediaType === 'IMAGE' || validation.mediaType === 'VIDEO' ? objectUrl : undefined,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    return mediaItem;
  }
}

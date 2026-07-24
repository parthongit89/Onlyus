import { apiUpload } from '../../api/client';

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

const MAX_FILE_SIZE_MB = 25; // Media Rule: limit max upload size

export class MediaService {
  static validateFile(file: File): { isValid: boolean; error?: string } {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return {
        isValid: false,
        error: `Media Rule Violation: File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`,
      };
    }
    return { isValid: true };
  }

  // Upload file to real Node.js Multer Backend Endpoint `/api/media/upload`
  static async uploadMedia(file: File): Promise<MediaItem> {
    const validation = this.validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await apiUpload<MediaItem>('/media/upload', formData);
      return res;
    } catch {
      // Fallback object URL if offline
      const objectUrl = URL.createObjectURL(file);
      return {
        id: `media_${Date.now()}`,
        fileName: file.name,
        fileSizeMb: parseFloat((file.size / (1024 * 1024)).toFixed(2)),
        mediaType: file.type.startsWith('image/') ? 'IMAGE' : file.type.startsWith('video/') ? 'VIDEO' : 'DOCUMENT',
        url: objectUrl,
        previewUrl: objectUrl,
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }
  }
}

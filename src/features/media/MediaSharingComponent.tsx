import React, { useState } from 'react';
import { Button } from '../../shared/components/Button';
import { MediaService, MediaItem } from './mediaService';

interface MediaSharingProps {
  onMediaSelect: (media: MediaItem) => void;
}

export const MediaSharingComponent: React.FC<MediaSharingProps> = ({ onMediaSelect }) => {
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    try {
      const media = await MediaService.uploadMedia(file);
      onMediaSelect(media);
    } catch (err: any) {
      setError(err.message || 'Media upload failed.');
    }
  };

  const handleVoiceNote = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const voiceItem: MediaItem = {
        id: `voice_${Date.now()}`,
        fileName: 'Voice_Note_001.mp3',
        fileSizeMb: 0.45,
        mediaType: 'AUDIO',
        url: '#',
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      onMediaSelect(voiceItem);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', padding: '8px 12px', borderRadius: '8px', fontSize: '0.78rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#9da4b0', fontSize: '0.85rem', padding: '6px 12px', backgroundColor: '#1e2229', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
          📎 Attach File
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} accept="image/*,video/*,.pdf,.doc,.docx,audio/*" />
        </label>

        <button
          type="button"
          onClick={handleVoiceNote}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: isRecording ? '#ef4444' : '#9da4b0', fontSize: '0.85rem', padding: '6px 12px', backgroundColor: '#1e2229', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
        >
          🎙️ {isRecording ? 'Recording Voice Note...' : 'Voice Note'}
        </button>
      </div>
    </div>
  );
};

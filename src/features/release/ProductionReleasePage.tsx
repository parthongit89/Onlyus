import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { ProductionService, ProductionReleaseManifest } from './productionService';

export const ProductionReleasePage: React.FC = () => {
  const navigate = useNavigate();
  const manifest: ProductionReleaseManifest = ProductionService.getReleaseManifest();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '36px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header Banner */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '32px', border: '1px solid rgba(34, 197, 94, 0.4)', marginBottom: '32px', textAlign: 'center', boxShadow: '0 8px 32px rgba(34, 197, 94, 0.15)' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>
            OnlyUs — Production Release 1.0.0
          </h1>
          <p style={{ fontSize: '1rem', color: '#22c55e', fontWeight: 600, marginTop: '6px' }}>
            All 15 Development Phases Successfully Completed & Verified!
          </p>
        </div>

        {/* Deliverables Checklist */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', color: '#f07b42' }}>Completed Development Phases (1 to 15)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {[
              'Phase 1 — Project Foundation',
              'Phase 2 — Authentication System',
              'Phase 3 — Admin Approval System',
              'Phase 4 — User Profiles',
              'Phase 5 — Contacts Management',
              'Phase 6 — Private Messaging',
              'Phase 7 — Group Messaging',
              'Phase 8 — Media Sharing',
              'Phase 9 — Notification System',
              'Phase 10 — Security & RBAC Guards',
              'Phase 11 — Settings Module',
              'Phase 12 — Owner Control Panel',
              'Phase 13 — Automated Testing Suite',
              'Phase 14 — Performance Optimization',
              'Phase 15 — Production Release',
            ].map((phase, i) => (
              <div key={i} style={{ padding: '12px 16px', backgroundColor: '#1e2229', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                <span style={{ color: '#22c55e', fontWeight: 700 }}>✔</span>
                <span>{phase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Release Manifest Specifications */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px' }}>Production Build Specifications</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#1e2229', borderRadius: '10px' }}>
              <span style={{ color: '#9da4b0' }}>App Name & Version</span>
              <span style={{ fontWeight: 600, color: '#f07b42' }}>{manifest.appName} v{manifest.version}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#1e2229', borderRadius: '10px' }}>
              <span style={{ color: '#9da4b0' }}>GitHub Repository</span>
              <a href={manifest.repositoryUrl} target="_blank" rel="noreferrer" style={{ fontWeight: 600, color: '#3b82f6', textDecoration: 'underline' }}>{manifest.repositoryUrl}</a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#1e2229', borderRadius: '10px' }}>
              <span style={{ color: '#9da4b0' }}>E2EE Encryption</span>
              <span style={{ fontWeight: 600, color: '#22c55e' }}>{manifest.e2eeProtocol}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#1e2229', borderRadius: '10px' }}>
              <span style={{ color: '#9da4b0' }}>Database Infrastructure</span>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>{manifest.database}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#1e2229', borderRadius: '10px' }}>
              <span style={{ color: '#9da4b0' }}>Performance Benchmark Score</span>
              <span style={{ fontWeight: 600, color: '#22c55e' }}>{manifest.performanceScore} / 100</span>
            </div>
          </div>
        </div>

        {/* Nav Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Button size="lg" variant="primary" onClick={() => navigate('/chats')}>
            Enter OnlyUs Application
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/owner')}>
            Owner Control Panel
          </Button>
        </div>
      </div>
    </div>
  );
};

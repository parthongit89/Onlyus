import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { SecurityService, SecurityEvent } from './securityService';

export const SecurityPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<SecurityEvent[]>(SecurityService.getSecurityEvents());
  const [testInput, setTestInput] = useState('<script>alert("XSS")</script>');
  const [sanitizedOutput, setSanitizedOutput] = useState('');
  const [rateLimitInfo, setRateLimitInfo] = useState<{ remaining: number }>(SecurityService.checkRateLimit());

  const handleTestSanitizer = (e: React.FormEvent) => {
    e.preventDefault();
    const result = SecurityService.sanitizeInput(testInput);
    setSanitizedOutput(result);
  };

  const handleTestRateLimit = () => {
    const res = SecurityService.checkRateLimit();
    setRateLimitInfo({ remaining: res.remaining });
    setEvents(SecurityService.getSecurityEvents());
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '32px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Security & Protection Panel</h1>
            <p style={{ fontSize: '0.88rem', color: '#9da4b0', marginTop: '4px' }}>
              RBAC authorization, XSS input sanitization, rate limiting, and threat detection
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/chats')}>
            ← Back to Chats
          </Button>
        </div>

        {/* Security Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div style={{ backgroundColor: '#16191e', borderRadius: '18px', padding: '20px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>E2EE Encryption Status</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#22c55e', marginTop: '6px' }}>Signal Protocol Active</div>
          </div>
          <div style={{ backgroundColor: '#16191e', borderRadius: '18px', padding: '20px', border: '1px solid rgba(240, 123, 66, 0.3)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>API Rate Limit Quota</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f07b42', marginTop: '6px' }}>{rateLimitInfo.remaining} / 100 reqs</div>
          </div>
          <div style={{ backgroundColor: '#16191e', borderRadius: '18px', padding: '20px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>RBAC Guards</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#3b82f6', marginTop: '6px' }}>Strict Enforcement</div>
          </div>
        </div>

        {/* Interactive XSS Sanitizer Tester */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '14px' }}>Input Sanitizer & XSS Inspector</h3>
          <form onSubmit={handleTestSanitizer} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input label="Test Input String" value={testInput} onChange={(e) => setTestInput(e.target.value)} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button type="submit">Sanitize Input</Button>
              <Button type="button" variant="outline" onClick={handleTestRateLimit}>Test Rate Limiter</Button>
            </div>
          </form>

          {sanitizedOutput && (
            <div style={{ marginTop: '18px', backgroundColor: '#1e2229', padding: '14px 16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.78rem', color: '#9da4b0', marginBottom: '4px' }}>Sanitized Result (HTML Escaped):</div>
              <code style={{ color: '#22c55e', fontSize: '0.92rem' }}>{sanitizedOutput}</code>
            </div>
          )}
        </div>

        {/* Security Audit Log */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Threat Events & Security Logs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {events.map((e) => (
              <div
                key={e.id}
                style={{
                  padding: '14px 18px',
                  backgroundColor: '#1e2229',
                  borderRadius: '12px',
                  borderLeft: `4px solid ${e.severity === 'HIGH' || e.severity === 'CRITICAL' ? '#ef4444' : '#eab308'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: e.severity === 'HIGH' ? '#ef4444' : '#eab308', fontSize: '0.86rem' }}>
                    [{e.type}] - {e.severity} SEVERITY
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#626975' }}>{e.timestamp}</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#f5f6f8' }}>{e.details}</div>
                <div style={{ fontSize: '0.75rem', color: '#9da4b0', marginTop: '4px' }}>Source IP: {e.ip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

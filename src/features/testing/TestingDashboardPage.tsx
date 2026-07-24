import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { runComprehensiveTestSuite } from '../../test/suite.test';

export const TestingDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState<{ passed: number; failed: number; log: string[] } | null>(null);

  const handleRunSuite = () => {
    const results = runComprehensiveTestSuite();
    setTestResults(results);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '32px 24px' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Phase 13 — System Testing Suite</h1>
            <p style={{ fontSize: '0.88rem', color: '#9da4b0', marginTop: '4px' }}>
              Automated unit testing, integration, authentication, UI routes, RBAC security, & performance verification
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/chats')}>
            ← Back to Chats
          </Button>
        </div>

        {/* Action Bar */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Run All Automated Tests</h3>
            <p style={{ fontSize: '0.82rem', color: '#9da4b0', marginTop: '2px' }}>
              Executes Unit, Auth, Security XSS, RBAC, and Group integration tests
            </p>
          </div>
          <Button variant="primary" onClick={handleRunSuite}>
            ▶ Run Test Suite
          </Button>
        </div>

        {/* Results Panel */}
        {testResults && (
          <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ padding: '14px 24px', backgroundColor: 'rgba(34, 197, 94, 0.15)', borderRadius: '14px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                <span style={{ fontSize: '0.8rem', color: '#9da4b0' }}>Passed Tests</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#22c55e' }}>{testResults.passed}</div>
              </div>
              <div style={{ padding: '14px 24px', backgroundColor: 'rgba(239, 68, 68, 0.15)', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <span style={{ fontSize: '0.8rem', color: '#9da4b0' }}>Failed Tests</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: testResults.failed === 0 ? '#22c55e' : '#ef4444' }}>{testResults.failed}</div>
              </div>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Execution Trace Logs</h4>
            <div style={{ backgroundColor: '#0d0f12', padding: '16px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '360px', overflowY: 'auto' }}>
              {testResults.log.map((line, i) => (
                <div key={i} style={{ color: line.startsWith('✔') ? '#22c55e' : '#ef4444' }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

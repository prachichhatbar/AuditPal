"use client"
import AuditDashboard from '@/components/dashboard/AuditDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AuditDashboard />
      </div>
    </main>
  );
}
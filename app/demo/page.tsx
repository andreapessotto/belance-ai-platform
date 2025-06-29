'use client';

import DemoExperience from '@/components/demo/demo-experience';
import { BoltBadge } from '@/components/layout/bolt-badge';

export default function DemoPage() {
  return (
    <>
      <DemoExperience />
      <BoltBadge fixedPosition={true} />
    </>
  );
}
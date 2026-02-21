/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { EbookReader } from './components/EbookReader';
import { CHAPTERS } from './components/Chapters';
import { AdminConsole, adminChaptersToChapters } from './components/AdminConsole';
import type { AdminChapterData } from './components/AdminConsole';
import type { Chapter } from './components/EbookReader';

const App: React.FC = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminChapters, setAdminChapters] = useState<Chapter[]>([]);

  const handleChaptersChange = useCallback((data: AdminChapterData[]) => {
    setAdminChapters(adminChaptersToChapters(data));
  }, []);

  const allChapters = [...CHAPTERS, ...adminChapters];

  return (
    <>
      <EbookReader
        chapters={allChapters}
        onAdminOpen={() => setAdminOpen(true)}
      />
      <AdminConsole
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        baseChapterCount={CHAPTERS.length}
        onChaptersChange={handleChaptersChange}
      />
    </>
  );
};

export default App;

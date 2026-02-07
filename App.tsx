/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EbookReader } from './components/EbookReader';
import { CHAPTERS } from './components/Chapters';

const App: React.FC = () => {
  return <EbookReader chapters={CHAPTERS} />;
};

export default App;

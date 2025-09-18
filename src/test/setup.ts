// src/test/setup.ts
import '@testing-library/jest-dom/vitest';

import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// limpa o DOM após cada teste
afterEach(() => {
  cleanup();
});

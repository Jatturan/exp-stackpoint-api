import app from './src/app.js';

import { NODE_ENV, PORT } from './src/config/index.js';

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} in ${NODE_ENV} mode`);
});

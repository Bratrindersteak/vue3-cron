import type { App } from 'vue';

import Cron from './components/Cron.vue';

Cron.install = function(app: App) {
    app.component(Cron.name, Cron);

    return app;
};

export default Cron

import type { App } from 'vue';

import Cron from './components/Cron.vue';

export default {
    install(app: App) {
        app.component(Cron.name, Cron);

        return app;
    },
}

<template>
    <div class="wrapper">
        <Cron v-model="expression" :locale="locale" />
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import Cron from './index.ts';

const expression = ref('* * * * * ?');
const locale = ref('en');

watchEffect(() => {
    console.log('App watchEffect expression: ', expression.value);
});

watchEffect(() => {
    console.log('App watchEffect locale: ', locale.value);
});
</script>

<style scoped>
.wrapper {
    padding: 100px;
}
</style>

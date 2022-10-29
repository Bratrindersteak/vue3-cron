<template>
    <div class="wrapper">
        <Cron v-model="expression" />
    </div>
</template>

<script lang="ts">
import Cron from '@/components/Cron.vue';

export default {
    components: {
        Cron,
    },
    data() {
        return {
            expression: '0 0 0 ? * 5',
        };
    },
    watch: {
        expression: {
            handler(value) {
                console.log('App watch expression: ', value);
            },
            immediate: true,
        },
    },
}
</script>

<style scoped>
.wrapper {
    padding: 100px;
}
</style>

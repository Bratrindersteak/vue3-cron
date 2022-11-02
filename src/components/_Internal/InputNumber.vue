<template>
    <a-input-number
        v-model:value="value"
        :min="range[0]"
        :max="range[1]"
        :formatter="formatter"
        :parser="parser"
        size="small"
        @change="onChange"
    />
</template>

<script lang="ts">
import { WEEK } from '@/shared/constants.ts';
import { formatterWeek, parserWeek } from '@/shared/utils.ts';

export default {
    props: {
        modelValue: [Number, String],
        range: {
            required: true,
            type: Array,
        },
        fieldValue: String,
        locale: {
            type: String,
        },
    },
    emits: ['update:modelValue', 'change'],
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
        formatter() {
            return (this.fieldValue === WEEK) ? ($event) => formatterWeek($event, this.locale) : null;
        },
        parser() {
            return (this.fieldValue === WEEK) ? ($event) => parserWeek($event, this.locale) : null;
        },
    },
    methods: {
        onChange(value) {
            this.$emit('change', value);
        },
    },
}
</script>

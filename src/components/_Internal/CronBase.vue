<template>
    <a-radio-group class="radio-group" v-model:value="type">
        <a-radio :value="TYPE.EMPTY" v-if="isEmpty">{{ label.empty }}</a-radio>
        <a-radio :value="TYPE.EVERY">{{ label.every }}</a-radio>
        <a-radio :value="TYPE.UNSPECIFIC" v-if="isUnspecific">{{ label.unspecific }}</a-radio>
        <a-radio :value="TYPE.RANGE">
            {{ label.range[0] }}
            <input-number
                v-model="range[0]"
                :range="[...rangeStart]"
                :field-value="field.value"
                :locale="locale"
                @change="onRangeStartChange"
            />
            {{ label.range[1] }}
            <input-number
                v-model="range[1]"
                :range="[...rangeEnd]"
                :field-value="field.value"
                :locale="locale"
            />
            {{ label.range[2] }}
        </a-radio>
        <a-radio :value="TYPE.STEP" v-if="isStep">
            {{ label.step[0] }}
            <input-number
                v-model="step[0]"
                :range="[...stepLeft]"
            />
            {{ label.step[1] }}
            <input-number
                v-model="step[1]"
                :range="[...stepRight]"
            />
            {{ label.step[2] }}
        </a-radio>
        <a-radio :value="TYPE.WELL" v-if="isWell">
            {{ label.well[0] }}
            <input-number
                v-model="well[1]"
                :range="[...wellLeft]"
            />
            {{ label.well[1] }}
            <input-number
                v-model="well[0]"
                :range="[...wellRight]"
                :field-value="field.value"
                :locale="locale"
            />
        </a-radio>
        <a-radio :value="TYPE.WEEKDAY" v-if="isWeekday">
            {{ label.weekday[0] }}
            <input-number
                v-model="weekday"
                :range="[...rangeStart]"
            />
            {{ label.weekday[1] }}
        </a-radio>
        <a-radio :value="TYPE.LAST_WEEKDAY" v-if="isLastWeekday">{{ label.lastWeekday }}</a-radio>
        <a-radio :value="TYPE.LAST_DAY" v-if="isLastDayOfDate">{{ label.lastDayOfDate }}</a-radio>
        <a-radio :value="TYPE.LAST_DAY" v-if="isLastDayOfWeek">
            {{ label.lastDayOfWeek }}
            <input-number
                v-model="lastDayOfWeek"
                :range="[0, 6]"
                :field-value="field.value"
                :locale="locale"
            />
        </a-radio>
        <a-radio :value="TYPE.SPECIFY">
            <div>{{ label.specify }}</div>
            <a-checkbox-group
                :class="{ 'checkbox-group-en-week': isEnWeek }"
                v-model:value="specify"
                :options="specifies"
                @change="onCheckboxGroupChange"
            />
        </a-radio>
    </a-radio-group>
</template>

<script>
import { DATE, WEEK, YEAR, TYPE, DEFAULT_LOCALE, LOCALE_EN } from '@/shared/constants.ts';
import { generateSpecifies, weekLetterToNumber } from '@/shared/utils.ts';

import I18n from '@/i18n';

import InputNumber from './InputNumber.vue';

export default {
    components: {
        InputNumber,
    },
    props: {
        modelValue: String,
        field: {
            value: String,
            label: String,
            min: Number,
            max: Number,
        },
        locale: {
            type: String,
            default: DEFAULT_LOCALE,
        },
    },
    emits: ['update:modelValue'],
    data() {
        const { min, max, value } = this.field;

        const labels = I18n[this.locale][value] ? Object.values(I18n[this.locale][value]) : null;
        const specifies = generateSpecifies(min, max, labels);

        let wellLeft, wellRight;

        if (value === WEEK) {
            wellLeft = [1, 5];
            wellRight = [min, max];
        }

        return {
            TYPE,
            type: TYPE.EVERY,
            range: [min, min + 1],
            step: [min, 1],
            well: [min, 1],
            specify: [],
            weekday: 1,
            lastDayOfWeek: 0,
            rangeStart: [min, max - 1],
            stepLeft: [min, max],
            stepRight: [1, max],
            wellLeft,
            wellRight,
            specifies,
        };
    },
    computed: {
        label() {
            const { type, fieldAlias } = I18n[this.locale];

            return {
                empty: type.empty,
                every: `${type.every}${fieldAlias[this.field.value]}`,
                unspecific: type.unspecific,
                range: [
                    type.range[0],
                    ((this.field.value === WEEK || this.locale === LOCALE_EN) ? '' : this.field.label) + type.range[1],
                    (this.field.value === WEEK || this.locale === LOCALE_EN) ? '' : this.field.label,
                ],
                step: [
                    type.step[0],
                    this.field.label + type.step[1],
                    fieldAlias[this.field.value] + type.step[2],
                ],
                well: type.well,
                weekday: type.weekday,
                lastWeekday: type.lastWeekday,
                lastDayOfDate: type.lastDayOfDate,
                lastDayOfWeek: type.lastDayOfWeek,
                specify: type.specify,
            };
        },
        isEnWeek() {
            return this.field.value === WEEK && this.locale === LOCALE_EN;
        },
        rangeEnd() {
            return [this.range[0] + 1, this.field.max];
        },
        isEmpty() {
            return this.field.value === YEAR;
        },
        isUnspecific() {
            return [DATE, WEEK].includes(this.field.value);
        },
        isStep() {
            return this.field.value !== WEEK;
        },
        isWell() {
            return this.field.value === WEEK;
        },
        isLastDayOfDate() {
            return this.field.value === DATE;
        },
        isLastDayOfWeek() {
            return this.field.value === WEEK;
        },
        isWeekday() {
            return this.field.value === DATE;
        },
        isLastWeekday() {
            return this.field.value === DATE;
        },
        value() {
            switch (this.type) {
                case TYPE.EMPTY:
                case TYPE.UNSPECIFIC:
                case TYPE.LAST_WEEKDAY:
                case TYPE.EVERY:
                    return this.type;
                case TYPE.RANGE:
                    return this.range.join(this.type);
                case TYPE.STEP:
                    return this.step.join(this.type);
                case TYPE.WELL:
                    return this.well.join(this.type);
                case TYPE.WEEKDAY:
                    return `${this.weekday}${this.type}`;
                case TYPE.LAST_DAY:
                    return (this.field.value === DATE) ? this.type : `${this.lastDayOfWeek}${this.type}`;
                case TYPE.SPECIFY:
                    return this.specify.length ? this.specify.sort((a, b) => a - b).join(this.type) : `${this.specifies[0].value}`;
                default:
                    return '';
            }
        },
    },
    watch: {
        modelValue: {
            handler(modelValue) {
                let value = modelValue;

                if (this.field.value === WEEK) {
                    value = weekLetterToNumber(value).replaceAll('7', '0');
                }

                if ([TYPE.EMPTY, TYPE.UNSPECIFIC, TYPE.LAST_DAY, TYPE.LAST_WEEKDAY, TYPE.EVERY].includes(value)) {
                    this.type = value;
                } else if (value.includes(TYPE.RANGE)) {
                    this.type = TYPE.RANGE;
                    this.range = value.split(TYPE.RANGE).map(i => parseInt(i));
                } else if (value.includes(TYPE.STEP)) {
                    this.type = TYPE.STEP;
                    this.step = value.split(TYPE.STEP).map(i => parseInt(i));
                } else if (value.includes(TYPE.WELL)) {
                    this.type = TYPE.WELL;
                    this.well = value.split(TYPE.WELL).map(i => parseInt(i));
                } else if (value.includes(TYPE.WEEKDAY)) {
                    this.type = TYPE.WEEKDAY;
                    this.weekday = parseInt(value);
                } else if (value.includes(TYPE.LAST_DAY)) {
                    this.type = TYPE.LAST_DAY;
                    this.lastDayOfWeek = parseInt(value);
                } else {
                    this.type = TYPE.SPECIFY;
                    this.specify = value.split(TYPE.SPECIFY).map(i => parseInt(i));
                }
            },
            immediate: true,
        },
        value: {
            handler(value) {
                this.$emit('update:modelValue', value);
            },
            deep: true,
        },
    },
    methods: {
        onRangeStartChange(value) {
            const [, rangeEnd] = this.range;

            if (value >= rangeEnd) {
                this.range[1] = value + 1;
            }
        },
        onCheckboxGroupChange(value) {
            let type = TYPE.SPECIFY;

            if (value.length === 0) {
                type = (this.field.value === YEAR) ? TYPE.EMPTY : TYPE.EVERY;
            }

            this.type = type;
        },
    },
}
</script>

<style scoped>
.radio-group {
    display: flex;
    flex-direction: column;
}
</style>

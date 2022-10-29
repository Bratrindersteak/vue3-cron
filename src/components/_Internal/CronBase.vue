<template>
    <a-radio-group class="radio-group" v-model:value="type">
        <a-radio :value="TYPE.EMPTY" v-if="isEmpty">不指定</a-radio>
        <a-radio :value="TYPE.EVERY">每{{ field.alias }}</a-radio>
        <a-radio :value="TYPE.UNSPECIFIC" v-if="isUnspecific">不指定</a-radio>
        <a-radio :value="TYPE.RANGE">
            从
            <input-number
                v-model="range[0]"
                :range="[...rangeStart]"
                :field-value="field.value"
                @change="onRangeStartChange"
            />
            {{ isWeekField ? '' : field.label }}到
            <input-number
                v-model="range[1]"
                :range="[...rangeEnd]"
                :field-value="field.value"
            />
            {{ isWeekField ? '' : field.label }}
        </a-radio>
        <a-radio :value="TYPE.STEP" v-if="isStep">
            从
            <input-number
                v-model="step[0]"
                :range="[...stepLeft]"
            />
            {{ field.label }}开始，每
            <input-number
                v-model="step[1]"
                :range="[...stepRight]"
            />
            {{ field.alias }}执行一次
        </a-radio>
        <a-radio :value="TYPE.WELL" v-if="isWell">
            当月第
            <input-number
                v-model="well[1]"
                :range="[...wellLeft]"
            />
            个
            <input-number
                v-model="well[0]"
                :range="[...wellRight]"
                :field-value="field.value"
            />
        </a-radio>
        <a-radio :value="TYPE.WEEKDAY" v-if="isWeekday">
            离当月
            <input-number
                v-model="weekday"
                :range="[...rangeStart]"
            />
            号最近的那个工作日
        </a-radio>
        <a-radio :value="TYPE.LAST_WEEKDAY" v-if="isLastWeekday">当月最后一个工作日</a-radio>
        <a-radio :value="TYPE.LAST_DAY" v-if="isLastDayOfDate">当月最后一天</a-radio>
        <a-radio :value="TYPE.LAST_DAY" v-if="isLastDayOfWeek">
            当月最后一个
            <input-number
                v-model="lastDayOfWeek"
                :range="[0, 6]"
                :field-value="field.value"
            />
        </a-radio>
        <a-radio :value="TYPE.SPECIFY">
            <div>指定</div>
            <a-checkbox-group
                v-model:value="specify"
                :options="specifies"
                @change="onCheckboxGroupChange"
            />
        </a-radio>
    </a-radio-group>
</template>

<script>
import { DATE, WEEK, YEAR, WEEKS, TYPE } from '@/shared/constants.ts';
import { generateSpecifies, weekLetterToNumber } from '@/shared/utils.ts';

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
            alias: String,
            min: Number,
            max: Number,
        },
    },
    emits: ['update:modelValue'],
    data() {
        const { min, max, value } = this.field;
        const specifies = (value === WEEK) ? WEEKS : generateSpecifies(min, max);

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
        rangeEnd() {
            return [this.range[0] + 1, this.field.max];
        },
        isWeekField() {
            return this.field.value === WEEK;
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
                    value = weekLetterToNumber(value);
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

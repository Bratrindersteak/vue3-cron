<template>
    <div class="cron-wrapper" :style="{ width }">
        <a-tabs class="cron-tabs" v-model:activeKey="activeKey" :tabBarGutter="-1" type="card">
            <a-tab-pane v-for="field in fields" :tab="field.label" :key="field.value">
                <CronBase v-model="cron[field.value]" :field="field" :locale="locale" />
            </a-tab-pane>
        </a-tabs>
        <div class="expression">
            <div class="title">
                <span class="label">{{ expressionLabel }}</span>
            </div>
            <span class="content">{{ expression }}</span>
        </div>
        <div class="preview">
            <div class="title">
                <span class="label">{{ previewLabel }}</span>
            </div>
            <ul class="list">
                <li v-for="preview in previews" :key="preview">{{ preview }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import cronParser from 'cron-parser';

import { FIELDS, TYPE, DEFAULT_CRON_EXPRESSION, DEFAULT_LOCALE, LOCALE_CN } from '@/shared/constants.ts';
import { zerofill, weekNumberToLetter } from '@/shared/utils.ts';

import I18n from '@/i18n';

import CronBase from './_Internal/CronBase.vue';

export default {
    name: 'Vue3Cron',
    components: {
        CronBase,
    },
    props: {
        modelValue: {
            type: String,
            default: DEFAULT_CRON_EXPRESSION,
        },
        locale: {
            type: String,
            default: DEFAULT_LOCALE,
        },
    },
    emits: ['update:modelValue'],
    data() {
        let [second, minute, hour, date, month, week, year = ''] = this.modelValue.split(' ');

        return {
            activeKey: FIELDS[0].value,
            cron: { second, minute, hour, date, month, week, year },
            previewTime: 5,
        };
    },
    computed: {
        width() {
            return (this.locale === LOCALE_CN) ? '438px' : '516px';
        },
        fields() {
            return FIELDS.map(field => {
                const label = I18n[this.locale].field[field.value];

                return { ...field, label };
            });
        },
        expressionLabel() {
            return I18n[this.locale].expression;
        },
        previewLabel() {
            return I18n[this.locale].preview.join(this.previewTime);
        },
        expression() {
            return Object.values(this.cron).join(' ');
        },
        previews() {
            let previews = [];

            try {
                const interval = cronParser.parseExpression(this.expression);

                for(let i = 0; i < this.previewTime; i += 1) {
                    const datetime = interval.next();
                    const year = zerofill(datetime.getFullYear());
                    const month = zerofill(datetime.getMonth() + 1);
                    const date = zerofill(datetime.getDate());
                    const hour = zerofill(datetime.getHours());
                    const minute = zerofill(datetime.getMinutes());
                    const second = zerofill(datetime.getSeconds());

                    previews.push(`${year}-${month}-${date} ${hour}:${minute}:${second}`);
                }
            } catch(error) {
                previews = ['此表达式暂时无法解析！'];
            }

            return previews;
        },
    },
    watch: {
        cron: {
            handler(value) {
                value.week = weekNumberToLetter(value.week);

                this.$emit('update:modelValue', Object.values(value).join(' '));
            },
            deep: true,
        },
        'cron.date': {
            handler(value) {
                if (value === TYPE.UNSPECIFIC) {
                    if (this.cron.week === TYPE.UNSPECIFIC) {
                        this.cron.week = TYPE.EVERY;
                    }
                } else {
                    if (this.cron.week !== TYPE.UNSPECIFIC) {
                        this.cron.week = TYPE.UNSPECIFIC;
                    }
                }
            },
        },
        'cron.week': {
            handler(value) {
                if (value === TYPE.UNSPECIFIC) {
                    if (this.cron.date === TYPE.UNSPECIFIC) {
                        this.cron.date = TYPE.EVERY;
                    }
                } else {
                    if (this.cron.date !== TYPE.UNSPECIFIC) {
                        this.cron.date = TYPE.UNSPECIFIC;
                    }
                }
            },
        },
    },
}
</script>

<style>
.cron-tabs {
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 3px;
}

.cron-tabs .ant-tabs-nav {
    margin-top: -1px;
    margin-left: -1px;
    background-color: #fafafa;
}

.cron-tabs .ant-tabs-content-holder {
    padding: 0 16px 16px;
}

.cron-tabs .ant-radio-wrapper:not(:first-child) {
    margin-top: 8px;
}

.cron-tabs .ant-checkbox-wrapper.ant-checkbox-group-item {
    min-width: 47px;
}

.checkbox-group-en-week .ant-checkbox-wrapper.ant-checkbox-group-item {
    min-width: 88px;
}
</style>

<style scoped>
.expression, .preview {
    margin: 32px 0;
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 3px;
}

.expression .title, .preview .title {
    display: flex;
    justify-content: center;
    margin-top: -28px;
}

.expression .label, .preview .label {
    padding: 0 16px;
    background-color: #ffffff;
}

.preview .list {
    margin-bottom: 0;
    padding-left: 16px;
}
</style>

export const MIN_SECOND = 0;
export const MAX_SECOND = 59;

export const MIN_MINUTE = 0;
export const MAX_MINUTE = 59;

export const MIN_HOUR = 0;
export const MAX_HOUR = 23;

export const MIN_DATE = 1;
export const MAX_DATE = 31;

export const MIN_MONTH = 1;
export const MAX_MONTH = 12;

export const MIN_WEEK = 0;
export const MAX_WEEK = 6;

export const MIN_YEAR = new Date().getFullYear();
export const MAX_YEAR = 2099;

export const WEEK_OBJ = {
    SUN: { value: 'SUN', label: '星期日', index: ['0', '7'] },
    MON: { value: 'MON', label: '星期一', index: ['1'] },
    TUE: { value: 'TUE', label: '星期二', index: ['2'] },
    WED: { value: 'WED', label: '星期三', index: ['3'] },
    THU: { value: 'THU', label: '星期四', index: ['4'] },
    FRI: { value: 'FRI', label: '星期五', index: ['5'] },
    SAT: { value: 'SAT', label: '星期六', index: ['6'] },
};
export const WEEKS = Object.values(WEEK_OBJ).map(({ index, label }) => ({ value: parseInt(index[0]), label }));
export const WEEK_INDEX_REGEXP = new RegExp(WEEKS.map(({ value }) => `(?<!#)${value}`).join('|'), 'g');
export const WEEK_LETTER_REGEXP = new RegExp(Object.keys(WEEK_OBJ).join('|'), 'g');

export const TYPE = {
    EVERY: '*',
    RANGE: '-',
    STEP: '/',
    SPECIFY: ',',
    UNSPECIFIC: '?',
    EMPTY: '',
    LAST_DAY: 'L',
    LAST_WEEKDAY: 'LW',
    WELL: '#',
    WEEKDAY: 'W',

};

export const SECOND = 'second';
export const MINUTE = 'minute';
export const HOUR = 'hour';
export const DATE = 'date';
export const MONTH = 'month';
export const WEEK = 'week';
export const YEAR = 'year';

export const FIELDS = [
    { value: SECOND, label: '秒', alias: '秒钟', min: MIN_SECOND, max: MAX_SECOND },
    { value: MINUTE, label: '分', alias: '分钟', min: MIN_MINUTE, max: MAX_MINUTE },
    { value: HOUR, label: '时', alias: '小时', min: MIN_HOUR, max: MAX_HOUR },
    { value: DATE, label: '日', alias: '天', min: MIN_DATE, max: MAX_DATE },
    { value: MONTH, label: '月', alias: '个月', min: MIN_MONTH, max: MAX_MONTH },
    { value: WEEK, label: '周', alias: '星期', min: MIN_WEEK, max: MAX_WEEK },
    { value: YEAR, label: '年', alias: '年', min: MIN_YEAR, max: MAX_YEAR },
];

export const DEFAULT_CRON_EXPRESSION = '* * * * * ?';

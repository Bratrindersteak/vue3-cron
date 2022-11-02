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

export const SUNDAY = 'sunday';
export const MONDAY = 'monday';
export const TUESDAY = 'tuesday';
export const WEDNESDAY = 'wednesday';
export const THURSDAY = 'thursday';
export const FRIDAY = 'friday';
export const SATURDAY = 'saturday';

export const WEEKS = [
    { value: SUNDAY, abbr: 'SUN', index: '0' },
    { value: MONDAY, abbr: 'MON', index: '1' },
    { value: TUESDAY, abbr: 'TUE', index: '2' },
    { value: WEDNESDAY, abbr: 'WED', index: '3' },
    { value: THURSDAY, abbr: 'THU', index: '4' },
    { value: FRIDAY, abbr: 'FRI', index: '5' },
    { value: SATURDAY, abbr: 'SAT', index: '6' },
];

export const WEEK_INDEX_REGEXP = new RegExp(WEEKS.map(({ index }) => `(?<!#)${index}`).join('|'), 'g');
export const WEEK_LETTER_REGEXP = new RegExp(WEEKS.map(({ abbr }) => abbr).join('|'), 'g');

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
    { value: SECOND, min: MIN_SECOND, max: MAX_SECOND },
    { value: MINUTE, min: MIN_MINUTE, max: MAX_MINUTE },
    { value: HOUR, min: MIN_HOUR, max: MAX_HOUR },
    { value: DATE, min: MIN_DATE, max: MAX_DATE },
    { value: MONTH, min: MIN_MONTH, max: MAX_MONTH },
    { value: WEEK, min: MIN_WEEK, max: MAX_WEEK },
    { value: YEAR, min: MIN_YEAR, max: MAX_YEAR },
];

export const LOCALE_CN = 'cn';
export const LOCALE_EN = 'en';

export const DEFAULT_CRON_EXPRESSION = '* * * * * ?';
export const DEFAULT_LOCALE = LOCALE_CN;


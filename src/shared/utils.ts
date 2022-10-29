import { WEEK_OBJ, WEEKS, WEEK_INDEX_REGEXP, WEEK_LETTER_REGEXP } from './constants.ts';

/**
 * 生成指定数组.
 *
 * @param min - 区间最小值.
 * @param max - 区间最大值.
 */
export function generateSpecifies(min: number, max: number): Array<{ value: number, label: string }> {
    const specifies = [];

    for (let specify = min; specify <= max; specify += 1) {
        specifies.push({ value: specify, label: specify.toString() });
    }

    return specifies;
}

/**
 * 日期时间字段补零.
 *
 * @param value - 待补零处理的数字.
 */
export function zerofill(value: number): string {
    const prefix = (value < 10) ? '0' : '';

    return `${prefix}${value}`;
}

/**
 * 转换星期数字为缩写.
 *
 * @param value - .
 */
export function weekNumberToLetter(value: string): string {
    return value.replace(WEEK_INDEX_REGEXP, value => Object.values(WEEK_OBJ).find(({ index }) => index.includes(value))?.value || value);
}

/**
 * 转换星期缩写为数字.
 *
 * @param value - .
 */
export function weekLetterToNumber(value: string): string {
    return value.replace(WEEK_LETTER_REGEXP, value => WEEK_OBJ[value]?.index[0] || value);
}

/**
 * 星期字段的 <a-input-number> 组件 formatter 函数.
 *
 * @param value - .
 */
export function formatterWeek(value: number): string {
    return WEEKS[value]?.label;
}

/**
 * 星期字段的 <a-input-number> 组件 parser 函数.
 *
 * @param value - .
 */
export function parserWeek(value: string): number {
    return WEEKS.findIndex(i => i.label === value);
}

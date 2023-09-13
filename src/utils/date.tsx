export function parseDateToString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} `+
        `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:`+
        `${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
}
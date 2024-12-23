export function formattedDate(date: Date | string) {
    date = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        // timeStyle: 'medium'
    });
    return formatter.format(date)
}
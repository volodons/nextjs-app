export function sanitizeInput(input) {
    if (!input) return '';
    return input.trim().replace(/[<>]/g, '').slice(0, 5000);
}

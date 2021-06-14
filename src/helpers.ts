export const meterToKilometer = (meters: string): number => {
    const km = parseFloat((parseInt(meters) / 1000).toFixed(2));
    return Number.isInteger(km) ? Math.trunc(km) : km;
}

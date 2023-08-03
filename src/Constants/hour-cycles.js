const HOUR_CYCLE = 'hourCycle';
const HOUR_CYCLE_VALUES = {
    H11: 'h11',   // 0 - 11, Midnight starts at 0:00 am
    H12: 'h12',  // 1-12, Midnight starts at 12:00 am
    H23: 'h23',  // 0-23, Midnight starts at 0:00
    H24: 'h24'  // 1-24, Midnight starts at 24:00
};

module.exports = {
    HOUR_CYCLE,
    HOUR_CYCLE_VALUES
};

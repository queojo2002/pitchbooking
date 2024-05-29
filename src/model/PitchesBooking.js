export class PitchesBooking {
    constructor(timeBooking, timeStart, timeEnd, priceFinal, user, statusBooking, pitches) {
        this.timeBooking = timeBooking;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.user = user;
        this.statusBooking = statusBooking;
        this.priceFinal = priceFinal;
        this.pitches = pitches;
    }

    toObject() {
        return {
            timeBooking: this.timeBooking,
            timeStart: this.timeStart,
            timeEnd: this.timeEnd,
            user: this.user,
            statusBooking: this.statusBooking,
            pitches: this.pitches,
        };
    }
}

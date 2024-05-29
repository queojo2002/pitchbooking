export class PitchesBooking {
    constructor(timeBooking, timeStart, timeEnd, userBooking, statusBooking, pitches) {
        this.timeBooking = timeBooking;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.userBooking = userBooking;
        this.statusBooking = statusBooking;
        this.pitches = pitches;
    }

    toObject() {
        return {
            timeBooking: this.timeBooking,
            timeStart: this.timeStart,
            timeEnd: this.timeEnd,
            userBooking: this.userBooking,
            statusBooking: this.statusBooking,
            pitches: this.pitches
        };
    }
}
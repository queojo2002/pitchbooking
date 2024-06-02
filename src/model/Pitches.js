export class Pitches {
    constructor(name, price, pitchType, status, imageURL, creator, timeMake, timeUpdate) {
        this.name = name;
        this.price = Number(price);
        this.pitchType = Number(pitchType);
        this.status = Number(status);
        this.imageURL = imageURL;
        this.creator = creator.toLowerCase();
        this.timeMake = timeMake;
        this.timeUpdate = timeUpdate;
    }

    toObject() {
        return {
            name: this.name,
            price: this.price,
            pitchType: this.pitchType,
            status: this.status,
            imageURL: this.imageURL,
            creator: this.creator,
            timeMake: this.timeMake,
            timeUpdate: this.timeUpdate,
        };
    }
}

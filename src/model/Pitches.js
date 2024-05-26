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

    // có thể validate dữ liệu trước khi lưu vào firestore, chưa test thử, để đây test sau
    validate() {
        if (!this.name) {
            throw new Error('Name is required');
        }
        if (isNaN(this.price)) {
            throw new Error('Price must be a number');
        }
        if (![1, 2, 3].includes(this.pitchType)) {
            throw new Error('PitchType must be 1, 2, or 3');
        }
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
            timeUpdate: this.timeUpdate
        };
    }
}
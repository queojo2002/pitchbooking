export class User {
    constructor(
        fullname,
        email,
        password = '',
        phone = '0326393540',
        address = 'LNC',
        imageURL = 'https://www.w3schools.com/howto/img_avatar.png	',
        role = 'user',
    ) {
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.imageURL = imageURL;
        this.role = role;
    }

    toObject() {
        return {
            fullname: this.fullname,
            email: this.email,
            password: this.password,
            phone: this.phone,
            address: this.address,
            imageURL: this.imageURL,
            role: this.role,
        };
    }

    toObjectUpdate() {
        return {
            fullname: this.fullname,
            phone: this.phone,
            address: this.address,
            imageURL: this.imageURL,
        };
    }
}

export class User {
    constructor(name, email, phone = "0326393540", address = "LNC", role = "user") {
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.address = address;
      this.role = role;
    }
  
    toObject() {
      return {
        name: this.name,
        phone: this.phone,
        address: this.address,
        email: this.email.toLowerCase(),
        role: this.role
      };
    }
  }
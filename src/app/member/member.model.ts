export class Member {
    public membername: string;
    public dob: Date;
    public gender: string;
    public contactNo: string;
    public address: string;
    public bloodGroup: string;

    /* constructor(membername: string, dob: Date, gender: string, contactNo: string, address: string, bloodGroup: string) {
        this.membername = membername;
        this.dob = dob;
        this.gender = gender;
        this.contactNo = contactNo;
        this.address = address;
        this.bloodGroup = bloodGroup;
    } */

    constructor() {
        this.membername = '';
        this.dob = new Date();
        this.gender = 'Male';
        this.contactNo = '';
        this.address = '';
        this.bloodGroup = '';
    }
}
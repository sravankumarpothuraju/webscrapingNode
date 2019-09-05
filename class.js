class BankDetails {
    constructor(institution, bankName, branchCode, address, city, postalCode, country, swiftCode, swiftCodeEightChar) {
        this.institution = institution;
        this.bankName = bankName;
        this.branchCode = branchCode;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;

        this.swiftCode = swiftCode;
        this.swiftCodeEightChar = swiftCodeEightChar;


    }
}
module.exports = BankDetails;
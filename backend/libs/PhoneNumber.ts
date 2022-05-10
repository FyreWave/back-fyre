import {
    PhoneNumber,
    PhoneNumberFormat as PNF,
    PhoneNumberUtil
} from "google-libphonenumber";

// Get an instance of `PhoneNumberUtil`.
const phoneUtil = PhoneNumberUtil.getInstance();

class PhoneNumberParser {
    public number: PhoneNumber;
    public phone: string;
    public origin: string;

    constructor(number: string, origin: string = "NG") {
        try {
            if (number.substr(0, 3) === "234") {
                number = "+234" + number.substr(3);
            }

            this.number = phoneUtil.parseAndKeepRawInput(number, origin);
        } catch (e: any) {
            throw Error(e.message);
        }

        this.phone = number;
        this.origin = origin;
    }

    fullDetails() {
        return {
            number: this.number.getNationalNumber(),
            original: this.phone,
            isValid: phoneUtil.isValidNumber(this.number),
            isNumberValidForOrigin: this.isValidForRegion(),
            full: phoneUtil.format(this.number, PNF.E164)
        };
    }

    full() {
        return phoneUtil.format(this.number, PNF.E164);
    }

    isValid() {
        return phoneUtil.isValidNumber(this.number);
    }

    isValidForRegion() {
        return phoneUtil.isValidNumberForRegion(this.number, this.origin);
    }

    nationalNumber() {
        const nationalNumber = this.number.getNationalNumber();
        return nationalNumber ? String(nationalNumber) : undefined;
    }
}

export function getNationalNumber(phone: string) {
    return new PhoneNumberParser(phone, "NG").nationalNumber();
}

export default PhoneNumberParser;

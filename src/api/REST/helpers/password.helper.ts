import { generate } from "generate-password";

const passwordOptions = {
    length: 10,
    numbers: true
};

export function generatePassword():string {
    return generate(passwordOptions);
}
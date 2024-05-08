import { Month, monthToNumber, months } from "common";
import PasswordValidator from "password-validator";

const transform = (
  res: any[],
  options?: { beginning: string; end: string }
): string | true => {
  if (res.length === 0) {
    return true;
  }
  const res2 = res.map((res: any) => {
    if (typeof res.message === "string") {
      return res.message;
    }
  });
  if (res2.every((i) => typeof i === "string")) {
    const res3 = res2.join(", ");
    if (options) {
      const { beginning, end } = options;
      const res4 = beginning + res3 + end;
      return res4;
    }
    return res3;
  }
  return `something went wrong res: ${res.toString()}`;
};

export const passwordSyntaxValidator = (password: string): true | string => {
  const schema = new PasswordValidator();
  schema
    .is()
    .min(8, "mindestens 8 Zeichen") // Minimum length 8
    .is()
    .max(100, "nicht mehr als 100 Zeichen") // Maximum length 100
    .has()
    .uppercase(1, "mindesten einen Großbuchstaben") // Must have uppercase letters
    .has()
    .lowercase(1, "mindesten einen Kleinbuchstaben") // Must have lowercase letters
    .has()
    .digits(1, "mindesten eine Zahl") // Must have at least 2 digits
    .has()
    .not()
    .spaces(0, "keine Leerzeichen") // Should not have spaces
    .is()
    .not()
    .oneOf(
      ["Passw0rd", "Password123"],
      'sollte nicht einfach, z.B. "Passw0rd" oder "Password123"'
    ); // Blacklist these values

  const res = schema.validate(password, { details: true }) as unknown as any[];

  /* 
  if false the response will look like this:
  [
  {
    validation: 'min',
    arguments: 8,
    message: 'The string should have a minimum length of 8 characters'
  },
  {
    validation: 'uppercase',
    message: 'The string should have a minimum of 1 uppercase letter'
  },
  {
    validation: 'digits',
    arguments: 2,
    message: 'The string should have a minimum of 2 digits'
  }
] */

  return transform(res, {
    beginning: "Das Passwort sollte ",
    end: " enthalten",
  });
};

export const userNameSyntaxValidator = (userName: string): true | string => {
  const schema = new PasswordValidator();
  schema
    .is()
    .min(4, "Der Benutzername sollte mindestens 4 Zeichen enthalten") // Minimum length 8
    .is()
    .max(100, "Der Benutzername sollte nicht mehr als 100 Zeichen enthalten"); // Maximum length 100
  const res = schema.validate(userName, { details: true }) as unknown as any[];
  return transform(res);
};

export const emailSyntaxValidator = (email: string): true | string => {
  const isValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  if (isValid) return isValid;
  return "Bitte gebe eine echte Email Adresse ein.";
};

export const dateSyntaxValidator = (
  day: number,
  month: Month,
  year: number
): true | string => {
  /*   if (typeof day !== "number") {
    return "Bitte für den Tag eine Nummer eingeben";
  }
  if (typeof year !== "number") {
    return "Bitte für das Jahr eine Nummer eingeben";
  } */
  if (!months.includes(month)) {
    return "Bitte einen Monat mit dem Wert Januar, Februar, März, Apirl, Mai, Juni, Juli, August, September, Oktovber, November oder Dezember eingeben.";
  }
  const monthNumber = monthToNumber(month);
  const date = `${year}/${monthNumber}/${day}`;
  const isValid = !isNaN(Number(new Date(date)));
  if (isValid) return isValid;
  return "Bitte gebe ein gültiges Datum ein.";
};

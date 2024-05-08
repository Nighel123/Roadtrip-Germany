import { Address, RoadtripObject, UserObject } from "./mongoose.gen";
export * from "./mongoose.gen";
export type UserFrontend = Omit<UserObject, "password">;
export type RoadtripFrontend = RoadtripObject;
export type AddressFrontend = Omit<Address, "_id">;
export type ApiDataRoadtripsType = {
    message: string;
    status: string;
    roadtrips: RoadtripFrontend[];
    roadtrip?: RoadtripFrontend;
};
export type ApiDataUserNameType = {
    message: string;
    userName: string;
};
export type ApiDataValidatorType = {
    message: string;
};
export type ApiDataUserType = {
    message: string;
    user: UserFrontend;
};
export interface IRoadtripForm {
    description: string;
    startTown: string;
    startLand: string;
    destTown: string;
    destLand: string;
    day: number;
    month: Month;
    year: number;
    file: File[];
}
declare enum Sex {
    männlich = "m\u00E4nnlich",
    weiblich = "weiblich"
}
export interface IRegisterInputs extends Omit<UserObject, "birthday" | "sex" | "_id"> {
    day: number;
    month: Month;
    year: number;
    sex: Sex;
}
export type SingletonDate = {
    day: number;
    month: Month;
    year: number;
};
export declare const log: (message: string) => void;
export declare const months: readonly ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
export type Month = (typeof months)[number];
export declare const monthToNumber: (month: Month) => number;

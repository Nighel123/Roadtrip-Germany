import mongoose from "mongoose";
/**
 * Lean version of AddressDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `AddressDocument.toObject()`. To avoid conflicts with model names, use the type alias `AddressObject`.
 * ```
 * const addressObject = address.toObject();
 * ```
 */
export type Address = {
    town: string;
    land: string;
    _id: mongoose.Types.ObjectId;
};
/**
 * Lean version of AddressDocument (type alias of `Address`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Address } from "../models"
 * import { AddressObject } from "../interfaces/mongoose.gen.ts"
 *
 * const addressObject: AddressObject = address.toObject();
 * ```
 */
export type AddressObject = Address;
/**
 * Mongoose Query type
 *
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type AddressQuery = mongoose.Query<any, AddressDocument, AddressQueries> & AddressQueries;
/**
 * Mongoose Query helper types
 *
 * This type represents `AddressSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type AddressQueries = {};
export type AddressMethods = {};
export type AddressStatics = {};
/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Address = mongoose.model<AddressDocument, AddressModel>("Address", AddressSchema);
 * ```
 */
export type AddressModel = mongoose.Model<AddressDocument, AddressQueries> & AddressStatics;
/**
 * Mongoose Schema type
 *
 * Assign this type to new Address schema instances:
 * ```
 * const AddressSchema: AddressSchema = new mongoose.Schema({ ... })
 * ```
 */
export type AddressSchema = mongoose.Schema<AddressDocument, AddressModel, AddressMethods, AddressQueries>;
/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Address = mongoose.model<AddressDocument, AddressModel>("Address", AddressSchema);
 * ```
 */
export type AddressDocument = mongoose.Document<mongoose.Types.ObjectId, AddressQueries> & AddressMethods & {
    town: string;
    land: string;
    _id: mongoose.Types.ObjectId;
};
/**
 * Lean version of RoadtripStartAddressDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `RoadtripDocument.toObject()`.
 * ```
 * const roadtripObject = roadtrip.toObject();
 * ```
 */
export type RoadtripStartAddress = {
    town: string;
    land: string;
    _id: mongoose.Types.ObjectId;
};
/**
 * Lean version of RoadtripDestAddressDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `RoadtripDocument.toObject()`.
 * ```
 * const roadtripObject = roadtrip.toObject();
 * ```
 */
export type RoadtripDestAddress = {
    town: string;
    land: string;
    _id: mongoose.Types.ObjectId;
};
/**
 * Lean version of RoadtripDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `RoadtripDocument.toObject()`. To avoid conflicts with model names, use the type alias `RoadtripObject`.
 * ```
 * const roadtripObject = roadtrip.toObject();
 * ```
 */
export type Roadtrip = {
    description: string;
    iniUser: string;
    startAddress: RoadtripDestAddress;
    destAddress: RoadtripDestAddress;
    startDateGF: Date;
    imgExt: string;
    _id: mongoose.Types.ObjectId;
};
/**
 * Lean version of RoadtripDocument (type alias of `Roadtrip`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { Roadtrip } from "../models"
 * import { RoadtripObject } from "../interfaces/mongoose.gen.ts"
 *
 * const roadtripObject: RoadtripObject = roadtrip.toObject();
 * ```
 */
export type RoadtripObject = Roadtrip;
/**
 * Mongoose Query type
 *
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type RoadtripQuery = mongoose.Query<any, RoadtripDocument, RoadtripQueries> & RoadtripQueries;
/**
 * Mongoose Query helper types
 *
 * This type represents `RoadtripSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type RoadtripQueries = {};
export type RoadtripMethods = {};
export type RoadtripStatics = {};
/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Roadtrip = mongoose.model<RoadtripDocument, RoadtripModel>("Roadtrip", RoadtripSchema);
 * ```
 */
export type RoadtripModel = mongoose.Model<RoadtripDocument, RoadtripQueries> & RoadtripStatics;
/**
 * Mongoose Schema type
 *
 * Assign this type to new Roadtrip schema instances:
 * ```
 * const RoadtripSchema: RoadtripSchema = new mongoose.Schema({ ... })
 * ```
 */
export type RoadtripSchema = mongoose.Schema<RoadtripDocument, RoadtripModel, RoadtripMethods, RoadtripQueries>;
/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Roadtrip = mongoose.model<RoadtripDocument, RoadtripModel>("Roadtrip", RoadtripSchema);
 * ```
 */
export type RoadtripStartAddressDocument = mongoose.Document<mongoose.Types.ObjectId> & {
    town: string;
    land: string;
    _id: mongoose.Types.ObjectId;
};
/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Roadtrip = mongoose.model<RoadtripDocument, RoadtripModel>("Roadtrip", RoadtripSchema);
 * ```
 */
export type RoadtripDestAddressDocument = mongoose.Document<mongoose.Types.ObjectId> & {
    town: string;
    land: string;
    _id: mongoose.Types.ObjectId;
};
/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const Roadtrip = mongoose.model<RoadtripDocument, RoadtripModel>("Roadtrip", RoadtripSchema);
 * ```
 */
export type RoadtripDocument = mongoose.Document<mongoose.Types.ObjectId, RoadtripQueries> & RoadtripMethods & {
    description: string;
    iniUser: string;
    startAddress: RoadtripDestAddressDocument;
    destAddress: RoadtripDestAddressDocument;
    startDateGF: Date;
    imgExt: string;
    _id: mongoose.Types.ObjectId;
};
/**
 * Lean version of UserDocument
 *
 * This has all Mongoose getters & functions removed. This type will be returned from `UserDocument.toObject()`. To avoid conflicts with model names, use the type alias `UserObject`.
 * ```
 * const userObject = user.toObject();
 * ```
 */
export type User = {
    userName: string;
    password: string;
    email: string;
    birthday: Date;
    sex: string;
    _id: mongoose.Types.ObjectId;
};
/**
 * Lean version of UserDocument (type alias of `User`)
 *
 * Use this type alias to avoid conflicts with model names:
 * ```
 * import { User } from "../models"
 * import { UserObject } from "../interfaces/mongoose.gen.ts"
 *
 * const userObject: UserObject = user.toObject();
 * ```
 */
export type UserObject = User;
/**
 * Mongoose Query type
 *
 * This type is returned from query functions. For most use cases, you should not need to use this type explicitly.
 */
export type UserQuery = mongoose.Query<any, UserDocument, UserQueries> & UserQueries;
/**
 * Mongoose Query helper types
 *
 * This type represents `UserSchema.query`. For most use cases, you should not need to use this type explicitly.
 */
export type UserQueries = {};
export type UserMethods = {};
export type UserStatics = {};
/**
 * Mongoose Model type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);
 * ```
 */
export type UserModel = mongoose.Model<UserDocument, UserQueries> & UserStatics;
/**
 * Mongoose Schema type
 *
 * Assign this type to new User schema instances:
 * ```
 * const UserSchema: UserSchema = new mongoose.Schema({ ... })
 * ```
 */
export type UserSchema = mongoose.Schema<UserDocument, UserModel, UserMethods, UserQueries>;
/**
 * Mongoose Document type
 *
 * Pass this type to the Mongoose Model constructor:
 * ```
 * const User = mongoose.model<UserDocument, UserModel>("User", UserSchema);
 * ```
 */
export type UserDocument = mongoose.Document<mongoose.Types.ObjectId, UserQueries> & UserMethods & {
    userName: string;
    password: string;
    email: string;
    birthday: Date;
    sex: string;
    _id: mongoose.Types.ObjectId;
};
/**
 * Check if a property on a document is populated:
 * ```
 * import { IsPopulated } from "../interfaces/mongoose.gen.ts"
 *
 * if (IsPopulated<UserDocument["bestFriend"]>) { ... }
 * ```
 */
export declare function IsPopulated<T>(doc: T | mongoose.Types.ObjectId): doc is T;
/**
 * Helper type used by `PopulatedDocument`. Returns the parent property of a string
 * representing a nested property (i.e. `friend.user` -> `friend`)
 */
type ParentProperty<T> = T extends `${infer P}.${string}` ? P : never;
/**
* Helper type used by `PopulatedDocument`. Returns the child property of a string
* representing a nested property (i.e. `friend.user` -> `user`).
*/
type ChildProperty<T> = T extends `${string}.${infer C}` ? C : never;
/**
* Helper type used by `PopulatedDocument`. Removes the `ObjectId` from the general union type generated
* for ref documents (i.e. `mongoose.Types.ObjectId | UserDocument` -> `UserDocument`)
*/
type PopulatedProperty<Root, T extends keyof Root> = Omit<Root, T> & {
    [ref in T]: Root[T] extends mongoose.Types.Array<infer U> ? mongoose.Types.Array<Exclude<U, mongoose.Types.ObjectId>> : Exclude<Root[T], mongoose.Types.ObjectId>;
};
/**
 * Populate properties on a document type:
 * ```
 * import { PopulatedDocument } from "../interfaces/mongoose.gen.ts"
 *
 * function example(user: PopulatedDocument<UserDocument, "bestFriend">) {
 *   console.log(user.bestFriend._id) // typescript knows this is populated
 * }
 * ```
 */
export type PopulatedDocument<DocType, T> = T extends keyof DocType ? PopulatedProperty<DocType, T> : (ParentProperty<T> extends keyof DocType ? Omit<DocType, ParentProperty<T>> & {
    [ref in ParentProperty<T>]: (DocType[ParentProperty<T>] extends mongoose.Types.Array<infer U> ? (mongoose.Types.Array<ChildProperty<T> extends keyof U ? PopulatedProperty<U, ChildProperty<T>> : PopulatedDocument<U, ChildProperty<T>>>) : (ChildProperty<T> extends keyof DocType[ParentProperty<T>] ? PopulatedProperty<DocType[ParentProperty<T>], ChildProperty<T>> : PopulatedDocument<DocType[ParentProperty<T>], ChildProperty<T>>));
} : DocType);
/**
 * Helper types used by the populate overloads
 */
type Unarray<T> = T extends Array<infer U> ? U : T;
type Modify<T, R> = Omit<T, keyof R> & R;
/**
 * Augment mongoose with Query.populate overloads
 */
declare module "mongoose" {
    interface Query<ResultType, DocType, THelpers = {}> {
        populate<T extends string>(path: T, select?: string | any, model?: string | Model<any, THelpers>, match?: any): Query<ResultType extends Array<DocType> ? Array<PopulatedDocument<Unarray<ResultType>, T>> : (ResultType extends DocType ? PopulatedDocument<Unarray<ResultType>, T> : ResultType), DocType, THelpers> & THelpers;
        populate<T extends string>(options: Modify<PopulateOptions, {
            path: T;
        }> | Array<PopulateOptions>): Query<ResultType extends Array<DocType> ? Array<PopulatedDocument<Unarray<ResultType>, T>> : (ResultType extends DocType ? PopulatedDocument<Unarray<ResultType>, T> : ResultType), DocType, THelpers> & THelpers;
    }
}
export {};

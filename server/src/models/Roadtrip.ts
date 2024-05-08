import { Schema, model } from "mongoose";
import {
  AddressDocument,
  AddressModel,
  AddressSchema,
  RoadtripDocument,
  RoadtripModel,
  RoadtripSchema,
} from "common";

const AddressSchema: AddressSchema = new Schema({
  town: {
    type: String,
    required: true,
  },

  land: {
    type: String,
    required: true,
  },
});

export const Address: AddressModel = model<AddressDocument, AddressModel>(
  "Address",
  AddressSchema
);

const RoadtripSchema: RoadtripSchema = new Schema({
  /*   title: {
    type: String,
    required: true,
  }, */

  description: {
    type: String,
    required: true,
  },

  iniUser: {
    type: String,
    required: true,
  },

  startAddress: { type: AddressSchema, required: true },

  destAddress: { type: AddressSchema, required: true },

  startDateGF: {
    type: Date,
    required: true,
  },

  imgExt: {
    type: String,
    required: true,
  },

  /*   stops: { 
    type: [String],
    required: true,
  }, */
});

export const Roadtrip: RoadtripModel = model<RoadtripDocument, RoadtripModel>(
  "Roadtrip",
  RoadtripSchema
);

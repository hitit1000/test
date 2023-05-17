import { typeLawOptions, typeLawQuery } from "./types";

const initLawOptions: typeLawOptions = {
  region: [""],
  client: [""],
  usage: [""],
  approval: [""],
  construct: [""],
  heating: [""],
  education: [""],
  maintenance: [""],
  rivers: [""],
};

const lawInputs: typeLawQuery = {
  region: "",
  client: "",
  usage: "",
  approval: "",
  number_of_households: "0",
  land_area: "0",
  floor_area: "0",
  parking_area: "0",
  number_of_floors: "0",
  construct: "",
  heating: "",
  education: "",
  maintenance: "",
  rivers: "",
};
export { lawInputs, initLawOptions };

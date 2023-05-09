type typeLawOptions = {
  region: string[];
  client: string[];
  usage: string[];
  approval: string[];
  construct: string[];
  heating: string[];
  education: string[];
  maintenance: string[];
  rivers: string[];
};

type typeLawQuery = {
  region: string;
  client: string;
  usage: string;
  approval: string;
  number_of_households: string;
  land_area: string;
  floor_area: string;
  parking_area: string;
  number_of_floors: string;
  construct: string;
  heating: string;
  education: string;
  maintenance: string;
  rivers: string;
};

type typeLawName =
  | "region"
  | "client"
  | "usage"
  | "approval"
  | "number_of_households"
  | "land_area"
  | "floor_area"
  | "parking_area"
  | "number_of_floors"
  | "construct"
  | "heating"
  | "education"
  | "maintenance"
  | "rivers";
export type { typeLawOptions, typeLawQuery, typeLawName };

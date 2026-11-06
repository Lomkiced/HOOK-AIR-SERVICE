export type BrandId =
  | "daikin"
  | "mitsubishi"
  | "carrier"
  | "haier"
  | "amena"
  | "samsung"
  | "toshiba"
  | "tcl"
  | "sharp"
  | "midea"
  | "fujitsu"
  | "lg"
  | "panasonic";

/** Front-panel finish drawn by the brand visualizer. */
export type PanelStyle = "micro" | "ribbed" | "smooth" | "mesh" | "slot";
/** Louver geometry drawn by the brand visualizer. */
export type LouverStyle = "coanda" | "dual" | "wide" | "single";

export interface Brand {
  id: BrandId;
  name: string;
  panel: PanelStyle;
  louver: LouverStyle;
  /** Coil wash pressure our technicians use for this brand. */
  psi: number;
  /** Typical wall-split service time per unit. */
  minutes: number;
}

export const BRANDS: Brand[] = [
  { id: "daikin", name: "Daikin", panel: "smooth", louver: "coanda", psi: 120, minutes: 60 },
  { id: "mitsubishi", name: "Mitsubishi Electric", panel: "ribbed", louver: "dual", psi: 90, minutes: 60 },
  { id: "carrier", name: "Carrier", panel: "slot", louver: "single", psi: 130, minutes: 50 },
  { id: "haier", name: "Haier", panel: "smooth", louver: "wide", psi: 120, minutes: 50 },
  { id: "amena", name: "Amena", panel: "ribbed", louver: "single", psi: 150, minutes: 45 },
  { id: "samsung", name: "Samsung", panel: "micro", louver: "wide", psi: 110, minutes: 65 },
  { id: "toshiba", name: "Toshiba", panel: "smooth", louver: "dual", psi: 100, minutes: 55 },
  { id: "tcl", name: "TCL", panel: "slot", louver: "single", psi: 130, minutes: 45 },
  { id: "sharp", name: "Sharp", panel: "mesh", louver: "single", psi: 120, minutes: 55 },
  { id: "midea", name: "Midea", panel: "slot", louver: "wide", psi: 130, minutes: 50 },
  { id: "fujitsu", name: "Fujitsu", panel: "ribbed", louver: "coanda", psi: 110, minutes: 60 },
  { id: "lg", name: "LG", panel: "smooth", louver: "wide", psi: 100, minutes: 55 },
  { id: "panasonic", name: "Panasonic", panel: "mesh", louver: "dual", psi: 110, minutes: 60 },
];

export function getBrand(id: BrandId): Brand {
  return BRANDS.find((b) => b.id === id) ?? BRANDS[0];
}


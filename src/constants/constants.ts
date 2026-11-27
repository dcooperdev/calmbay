import type { VesselConfig } from "../types/vesselConfig";

// inputs
export const DEAD_ZONE: number = 0.2;

// Vessels
export const VESSEL_CONFIG: VesselConfig = {
    acceleration: 0.05,
    drag: 0.02,
    maxSpeed: 3,
    turnMaxSpeed: 0.03,
    turnAcceleration: 0.005,
    turnDrag: 0.005,
    minTurnSpeed: 0.5
}

// world
export const DEFAUL_BACKGROUND_COLOR: string = '#1099bb';
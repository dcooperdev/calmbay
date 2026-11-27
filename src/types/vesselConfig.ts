export interface VesselConfig {
    readonly acceleration: number;
    readonly drag: number;
    readonly maxSpeed: number;
    readonly turnMaxSpeed: number;
    readonly turnAcceleration: number;
    readonly turnDrag: number;
    readonly minTurnSpeed: number;
}
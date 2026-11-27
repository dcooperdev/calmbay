import { Graphics } from "pixi.js";
import { getInput } from "./input";
import type { Position } from "../types/position";
import type { VesselConfig } from "../types/vesselConfig";
import { VESSEL_CONFIG } from "../constants/constants";

export class Boat {
    sprite: Graphics = new Graphics();
    speed: number = 0;
    turnSpeed: number = 0;

    readonly acceleration: number;
    readonly drag: number;
    readonly maxSpeed: number;
    readonly turnMaxSpeed: number;
    readonly turnAcceleration: number;
    readonly turnDrag: number;
    readonly minTurnSpeed: number;

    constructor(position: Position, vesselConfig: VesselConfig = VESSEL_CONFIG) {
        this.sprite
            .rect(0, 0, 50, 100)
            .fill(0xff0000);

        this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);

        this.sprite.x = position.x;
        this.sprite.y = position.y;

        this.acceleration = vesselConfig.acceleration;
        this.drag = vesselConfig.drag;
        this.maxSpeed = vesselConfig.maxSpeed;
        this.turnMaxSpeed = vesselConfig.turnMaxSpeed;
        this.turnAcceleration = vesselConfig.turnAcceleration;
        this.turnDrag = vesselConfig.turnDrag;
        this.minTurnSpeed = vesselConfig.minTurnSpeed;
    }

    update(updateDelta: number): void {
        const input = getInput();
        if (input.throttle > 0) {
            this.speed = Math.min(this.speed + this.acceleration * updateDelta, this.maxSpeed);
        }

        if (input.throttle < 0) {
            this.speed = Math.max(this.speed - this.acceleration * updateDelta, -this.maxSpeed / 2);
        }

        if (input.steering < 0) {
            this.turnSpeed = Math.max(this.turnSpeed - this.turnAcceleration * updateDelta, -this.turnMaxSpeed);
        }

        if (input.steering > 0) {
            this.turnSpeed = Math.min(this.turnSpeed + this.turnAcceleration * updateDelta, this.turnMaxSpeed);
        }

        if (input.throttle === 0) {
            if (Math.abs(this.speed) <= this.drag * updateDelta) {
                this.speed = 0;
            } else {
                this.speed -= Math.sign(this.speed) * this.drag * updateDelta;
            }
        }

        if (input.steering === 0) {
            if (Math.abs(this.turnSpeed) <= this.turnDrag * updateDelta) {
                this.turnSpeed = 0;
            } else {
                this.turnSpeed -= Math.sign(this.turnSpeed) * this.turnDrag * updateDelta;
            }
        }

        if (input.steering !== 0 && this.speed >= 0 && this.speed < this.minTurnSpeed) {
            this.speed = this.minTurnSpeed;
        }

        this.sprite.x += Math.sin(this.sprite.rotation) * this.speed * updateDelta;
        this.sprite.y -= Math.cos(this.sprite.rotation) * this.speed * updateDelta;
        this.sprite.rotation += this.turnSpeed * updateDelta;
    }
}

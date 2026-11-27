import { Graphics } from "pixi.js";
import { pressedKeys } from "./input";

interface Position {
    x: number;
    y: number;
}

interface VesselConfig {
    readonly acceleration: number;
    readonly drag: number;
    readonly maxSpeed: number;
    readonly turnMaxSpeed: number;
    readonly turnAcceleration: number;
    readonly turnDrag: number;
}

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

    constructor(position: Position, vesselConfig: VesselConfig = {
        acceleration: 0.05,
        drag: 0.02,
        maxSpeed: 3,
        turnMaxSpeed: 0.03,
        turnAcceleration: 0.005,
        turnDrag: 0.005
    }) {
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
    }

    update(updateDelta: number): void {
        if (pressedKeys.has("KeyW")) {
            this.speed = Math.min(this.speed + this.acceleration * updateDelta, this.maxSpeed);
        }

        if (pressedKeys.has("KeyS")) {
            this.speed = Math.max(this.speed - this.acceleration * updateDelta, -this.maxSpeed / 2);
        }

        if (pressedKeys.has("KeyA")) {
            this.turnSpeed = Math.max(this.turnSpeed - this.turnAcceleration * updateDelta, -this.turnMaxSpeed);
        }

        if (pressedKeys.has("KeyD")) {
            this.turnSpeed = Math.min(this.turnSpeed + this.turnAcceleration * updateDelta, this.turnMaxSpeed);
        }

        if (!pressedKeys.has("KeyW") && !pressedKeys.has("KeyS")) {
            if (Math.abs(this.speed) <= this.drag * updateDelta) {
                this.speed = 0;
            } else {
                this.speed -= Math.sign(this.speed) * this.drag * updateDelta;
            }
        }

        if (!pressedKeys.has("KeyA") && !pressedKeys.has("KeyD")) {
            if (Math.abs(this.turnSpeed) <= this.turnDrag * updateDelta) {
                this.turnSpeed = 0;
            } else {
                this.turnSpeed -= Math.sign(this.turnSpeed) * this.turnDrag * updateDelta;
            }
        }

        this.sprite.x += Math.sin(this.sprite.rotation) * this.speed * updateDelta;
        this.sprite.y -= Math.cos(this.sprite.rotation) * this.speed * updateDelta;
        this.sprite.rotation += this.turnSpeed * updateDelta;
    }
}
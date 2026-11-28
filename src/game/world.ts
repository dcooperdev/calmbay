import { Container, Rectangle } from "pixi.js";
import type { Boat } from "./boat";
import { CAMERA_FOLLOW_SPEED } from "../constants/constants";

export class World {
    container: Container = new Container();
    private boat: Boat;
    private screen: Rectangle;
    private cameraX: number;
    private cameraY: number;

    constructor(boat: Boat, screen: Rectangle) {
        this.container.addChild(boat.sprite);
        this.boat = boat;
        this.screen = screen;
        this.cameraX = this.boat.sprite.x;
        this.cameraY = this.boat.sprite.y;
    }

    update(delta: number): void {
        this.boat.update(delta);
        this.cameraX = this.cameraX + (this.boat.sprite.x - this.cameraX) * CAMERA_FOLLOW_SPEED;
        this.cameraY = this.cameraY + (this.boat.sprite.y - this.cameraY) * CAMERA_FOLLOW_SPEED;
        this.container.x = (this.screen.width / 2) - this.cameraX;
        this.container.y = (this.screen.height / 2) - this.cameraY;
    }
}
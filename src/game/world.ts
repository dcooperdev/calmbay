import { Container } from "pixi.js";
import type { Boat } from "./boat";

export class World {
    container: Container = new Container();
    private boat: Boat;

    constructor(boat: Boat) {
        this.container.addChild(boat.sprite);
        this.boat = boat;
    }

    update(delta: number): void {
        this.boat.update(delta);
    }
}
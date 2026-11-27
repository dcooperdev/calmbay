import type { InputState } from "../types/inputState";
import { clamp } from "../utils/clamp";
import { DEAD_ZONE } from "../constants/constants"

export const pressedKeys = new Set<string>();

window.addEventListener('keydown', (e) => pressedKeys.add(e.code));
window.addEventListener('keyup', (e) => pressedKeys.delete(e.code));

export const getInput = (): InputState => {
    let throttle = 0;
    let steering = 0;

    const gamepad = navigator.getGamepads()[0];

    if (pressedKeys.has("KeyW"))
        throttle += 1;

    if (pressedKeys.has("KeyS"))
        throttle -= 1;

    if (pressedKeys.has("KeyD"))
        steering += 1;

    if (pressedKeys.has("KeyA"))
        steering -= 1;

    if (gamepad) {
        if (Math.abs(gamepad.axes[1] ?? 0) > DEAD_ZONE) {
            throttle -= gamepad.axes[1];
        }
        if (Math.abs(gamepad.axes[0] ?? 0) > DEAD_ZONE) {
            steering += gamepad.axes[0];
        }
    }

    
    throttle = clamp(throttle, -1, 1);
    steering = clamp(steering, -1, 1);

    return {
        throttle,
        steering
    }
}

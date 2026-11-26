import { Application, Container, Graphics } from "pixi.js";
import { useEffect, useRef } from "react";
import { pressedKeys } from "../game/input";
import styles from "./PlayPage.module.css";

export const PlayPage = () => {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        let initialize = false;
        let cancelled = false;
        const app = new Application();

        const drawMap = async () => {
            await app.init({ background: '#1099bb', resizeTo: window });
            initialize = true;
            if (!cancelled) {
                canvasContainerRef.current?.appendChild(app.canvas);
                const container = new Container();
                const boat = new Graphics()
                    .rect(0, 0, 50, 100)
                    .fill(0xff0000);

                boat.x = app.screen.width / 2;
                boat.y = app.screen.height / 2;
                boat.pivot.set(boat.width / 2, boat.height / 2);
                
                app.stage.addChild(container);
                container.addChild(boat);

                app.ticker.add(() => {
                    if (pressedKeys.has("KeyW")) {
                        boat.x += Math.sin(boat.rotation) * 2;
                        boat.y -= Math.cos(boat.rotation) * 2;
                    }
                    if (pressedKeys.has("KeyA")) {
                        boat.rotation -= 0.01;
                    }
                    if (pressedKeys.has("KeyD")) {
                        boat.rotation += 0.01;
                    }
                })
            } else {
                app.destroy();
            }
        }

        drawMap();

        return () => {
            cancelled = true;
            if(initialize) {
                app.destroy({ removeView: true});
            }
        }
    }, []);

    return (
        <div className={styles['canvas-container']} ref={canvasContainerRef}></div>
    );
}

export default PlayPage;

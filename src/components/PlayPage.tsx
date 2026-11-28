import { Application } from "pixi.js";
import { useEffect, useRef } from "react";
import { Boat } from "../game/boat";
import { DEFAUL_BACKGROUND_COLOR, VESSEL_CONFIG } from "../constants/constants";
import { World } from "../game/world";
import styles from "./PlayPage.module.css";

export const PlayPage = () => {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        let initialize = false;
        let cancelled = false;
        const app = new Application();

        const drawMap = async () => {
            await app.init({ background: DEFAUL_BACKGROUND_COLOR, resizeTo: window });
            initialize = true;
            if (!cancelled) {
                canvasContainerRef.current?.appendChild(app.canvas);
                const boat = new Boat({ x: app.screen.width / 2, y: app.screen.height / 2 }, { ...VESSEL_CONFIG, turnAcceleration: 0.001, turnDrag: 0.001 });
                const world = new World(boat, app.screen);
                
                app.stage.addChild(world.container);

                app.ticker.add((ticker) => {
                    world.update(ticker.deltaTime);
                });
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

import { Application, Container } from "pixi.js";
import { useEffect, useRef } from "react";
import styles from "./PlayPage.module.css";
import { Boat } from "../game/boat";
import { VESSEL_CONFIG } from "../constants/constants";

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
                const boat = new Boat({ x: app.screen.width / 2, y: app.screen.height / 2 }, { ...VESSEL_CONFIG, turnAcceleration: 0.001,turnDrag: 0.001 });
                
                app.stage.addChild(container);
                container.addChild(boat.sprite);

                app.ticker.add((ticker) => {
                    boat.update(ticker.deltaTime);
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

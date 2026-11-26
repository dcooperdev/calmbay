import { Application, Container } from "pixi.js";
import { useEffect, useRef } from "react";
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
                app.stage.addChild(container);
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

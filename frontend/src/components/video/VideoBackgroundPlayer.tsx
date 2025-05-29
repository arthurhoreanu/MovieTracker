import { useState, useEffect } from "react";
import styles from "./VideoBackgroundPlayer.module.css";

interface Props {
    url: string;
    className?: string;
}

export default function VideoBackgroundPlayer({ url, className = "" }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={styles.loadingPlayer}>Loading...</div>;
    }

    return (
        <div className={`${styles.videoContainer} ${className}`}>
            <div className={styles.overlay}></div>
            <video
                className={styles.videoElement}
                src={url}
                preload="auto"
                autoPlay
                muted
                loop
                playsInline
            />
        </div>
    );
}

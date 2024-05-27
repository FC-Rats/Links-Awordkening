import { useEffect, useState } from "react";
import { TimerState } from "../types/TimerState";
import "../../assets/css/Timer.css";

export const Timer: React.FC<{ time: number, setIsTimerFinished: (value: boolean) => void; }> = (props) => {
    const initialTime = props.time;
    const [time, setTime] = useState<TimerState>({
        time: initialTime,
        seconds: initialTime % 60,
        minutes: Math.floor(initialTime / 60),
    });

    useEffect(() => { 
        const timerId = setTimeout(() => {
            if (time.time === 0) {
                return;
            }

            const newTime = time.time - 1;
            setTime({
                time: newTime,
                seconds: newTime % 60,
                minutes: Math.floor(newTime / 60),
            });
        }, 1000);

        return () => clearTimeout(timerId);
    }, [time.time]);

    return (
        <>
        <div className="container-timer">
            {`${time.minutes}:${time.seconds < 10 ? `0${time.seconds}` : time.seconds}`}
        </div>
        </>
    );
};

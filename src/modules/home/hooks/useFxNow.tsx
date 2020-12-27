import { useEffect, useRef } from 'react';

const useFxNow = () => {
    const fxNowRef = useRef<number>(Date.now());

    const createFxNow = () => {
        window.setTimeout(() => {
            fxNowRef.current = undefined;
        });

        return (fxNowRef.current = Date.now());
    };

    useEffect(() => {
        fxNowRef.current = fxNowRef.current || createFxNow();
    }, []);

    return {
        fxNow: fxNowRef.current || createFxNow(),
    };
};

export { useFxNow };

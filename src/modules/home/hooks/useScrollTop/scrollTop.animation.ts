import { type } from 'os';
import { useEffect, useRef } from 'react';
import { Subject } from 'rxjs';
import { AniEasing } from './ani.easing';

interface AniProperty {
    targetEl: Element;
    start: number;
    end: number;
    startTime: number;
    duration: number;
    easing: string;
}

interface ScrollTopParam {
    targetSelector?: string;
    to?: number;
    duration?: number;
    easing?: string;
}

const useScrollTop = (initParam?: ScrollTopParam) => {
    // const defaultParam = {
    //     duration: 400,
    //     easing: AniEasing._default,
    // };

    const interval = 13;

    //const schedule$ = new Subject();

    const scrollAniproperty = useRef<AniProperty>({
        targetEl: undefined,
        start: 0,
        end: 0,
        startTime: Date.now(),
        duration: initParam.duration,
        easing: initParam.easing,
    });

    const getTarget = (
        targetElSelector: string,
        to: number,
        duration: number = 400,
        easing: string = AniEasing._default,
    ) => {
        if (typeof document !== 'undefined' && !!document && targetElSelector?.length > 0 && !!to) {
            const targetEl = document.querySelector(targetElSelector);

            if (!!targetEl) {
                const aniProperty: AniProperty = {
                    targetEl: targetEl,
                    start: targetEl.scrollTop || 0,
                    end: to,
                    startTime: Date.now(),
                    duration: duration,
                    easing: easing,
                };

                schedule();

                // scrollAniproperty.current.targetEl = targetEl;
                // scrollAniproperty.current.start = targetEl['scrollTop'] || 0; //parseFloat(getCurCss(targetEl, 'scrollTop') || '0');
                // scrollAniproperty.current.end = to;
            }
        }
    };

    const start = (startParam?: ScrollTopParam) => {
        const {
            targetSelector = initParam.targetSelector,
            to = initParam.to,
            duration = initParam.duration,
            easing = initParam.easing,
        } = startParam;
    };

    const tick = () => {
        const nextTick = {
            hasNext: false,
            percent: 0,
        };

        if (!inProgress.current) {
            return nextTick;
        }

        const currentTime = Date.now();
        const remaining = Math.max(
            0,
            scrollAniproperty.current.startTime + scrollAniproperty.current.duration - currentTime,
        );

        const percent = 1 - (remaining / scrollAniproperty.current.duration || 0);
        //const index = 0;
        //const length = 1;

        nextTick.percent = percent;
        if (
            percent < 1 //&& length
        ) {
            nextTick.hasNext = !!remaining;
        }

        return nextTick;
    };

    const schedule = (aniProperty: AniProperty) => {
        if (!!inProgress.current) {
            if (document.hidden === false && window.requestAnimationFrame) {
                window.requestAnimationFrame(() => schedule(aniProperty));
            } else {
                window.setTimeout(() => schedule(aniProperty), interval);
            }

            //schedule$.next(); // call next frame

            doNext();
        }
    };

    const doNext = (targetEl: Element, to: number, easing: string) => {
        const nextTick = tick();

        run(targetEl, nextTick.percent, to, easing || defaultParam.easing);
        if (!nextTick.hasNext) {
            stop();
        }
    };

    const run = (targetEl: Element, percent: number, to: number, easing: string) => {
        if (!inProgress.current || scrollAniproperty.current.start === to) {
            return;
        }

        let eased = AniEasing[easing](percent);
        eased = (to - scrollAniproperty.current.start) * eased + scrollAniproperty.current.start;

        targetEl['scrollTop'] = eased;
    };

    const inProgress = useRef(true);

    const stop = () => (inProgress.current = false);

    useEffect(() => {
        getTarget(initParam.targetSelector, initParam.to);
        schedule();
    }, []);

    return {
        start,
        stop,
    };
};

export { useScrollTop };

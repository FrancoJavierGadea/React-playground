import { useMemo } from "react";

import Stats from 'stats.js';

export function useStats(){

    return useMemo(() => {

        const stats = new Stats();

        stats.showPanel(0);

        document.body.appendChild(stats.dom);

        return stats;

    }, []);
}
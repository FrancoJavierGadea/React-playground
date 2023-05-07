import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    base: "/React-playground/",


    //? For JSXHighlighter and @babel/traverse working successfully
    define: {
        "process.env": 'import.meta.env',
        Buffer: {}
    },
 
});

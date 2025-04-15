/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_EXTENSION_NAME: string;
    readonly VITE_EXTENSION_VERSION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
} 
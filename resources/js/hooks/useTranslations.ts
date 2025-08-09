import { usePage } from '@inertiajs/react';
import { get } from 'lodash';
import type { SharedData } from '@/types'; // Import SharedData

// Define a more specific type for your shared translations if possible,
// for now, we'll use a generic one.
interface Translations {
    [key: string]: string | Translations;
}

// Define the expected structure for page props including translations
type PagePropsWithTranslations = SharedData & {
    translations: Translations;
};

export function useTranslations() {
    const { props } = usePage<PagePropsWithTranslations>();

    /**
     * Translate a key.
     *
     * @param key The key to translate (e.g., 'welcome.log_in' or 'auth.failed').
     * @param replacements An object of replacements to make in the string.
     * @returns The translated string or the key if not found.
     */
    function t(key: string, replacements: Record<string, string | number> = {}): string {
        const rawTranslation = get(props.translations, key, key);

        if (typeof rawTranslation !== 'string') {
            // If the key itself is an object (e.g., user requested 'welcome' but it has nested keys)
            // return the key itself as we can't display an object.
            console.warn(`Translation for key '${key}' is an object or not found, returning key.`);
            return key;
        }

        // Now, rawTranslation is definitely a string.
        let finalTranslation: string = rawTranslation;

        Object.keys(replacements).forEach(r => {
            const placeholder = `:${r}`;
            // Use a loop to handle multiple occurrences of the same placeholder
            while (finalTranslation.includes(placeholder)) {
                finalTranslation = finalTranslation.replace(placeholder, String(replacements[r]));
            }
        });

        return finalTranslation;
    }

    return { t };
}

// You might also want a global translate function if you need it outside of React components,
// but for Inertia pages, the hook is generally preferred.
// export function __(key: string, replacements: Record<string, string | number> = {}): string {
//     const props = usePage<PagePropsWithTranslations>().props;
//     // This global function approach has limitations with reactivity if props.translations changes.
//     // The hook `useTranslations` is generally safer.
//     let translation = get(props.translations, key, key);
//     if (typeof translation !== 'string') return key;
//     Object.keys(replacements).forEach(r => {
//         const regex = new RegExp(`:${r}`, 'g');
//         translation = translation.replace(regex, String(replacements[r]));
//     });
//     return translation;
// }

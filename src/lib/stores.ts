import { readable, derived, writable } from "svelte/store";
import { channel } from "./channel";

type WebSerialIsAvailable = boolean;

export const isDocumentVisible = readable<DocumentVisibilityState>('visible', (set) => {
    function handleVisibilityChange(): void {
        console.log(document.hidden)
        if (document.hidden) {
            set('hidden');
        } else {
            set('visible');
        }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
});

export const webSerialIsAvailable = writable<WebSerialIsAvailable>(true, (set) => {
    channel.onmessage = (event) => {
        const { id, message } = event.data;
        console.log(event)
        if (id !== channel.id && message === 'visible') {
            set(false)
        }
        if (id !== channel.id && message === 'hidden') {
            set(true)
        }
    }
    const unsub = isDocumentVisible.subscribe((value) => {
        channel.postMessage({ message: value });
    })
    return unsub;
})
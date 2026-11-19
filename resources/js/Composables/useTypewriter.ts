import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useTypewriter(
    phrases: string[],
    { typeSpeed = 55, eraseSpeed = 28, hold = 2200, pause = 450 } = {},
) {
    const text = ref('');
    let index = 0;
    let erasing = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    function tick() {
        const full = phrases[index];

        if (!erasing) {
            text.value = full.slice(0, text.value.length + 1);
            if (text.value === full) {
                erasing = true;
                timer = setTimeout(tick, hold);
                return;
            }
            timer = setTimeout(tick, typeSpeed);
        } else {
            text.value = full.slice(0, text.value.length - 1);
            if (text.value === '') {
                erasing = false;
                index = (index + 1) % phrases.length;
                timer = setTimeout(tick, pause);
                return;
            }
            timer = setTimeout(tick, eraseSpeed);
        }
    }

    onMounted(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            text.value = phrases[0];
            return;
        }
        tick();
    });

    onBeforeUnmount(() => clearTimeout(timer));

    return { text };
}
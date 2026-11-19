import { computed, type Ref } from 'vue';

export interface PasswordRule {
    key: string;
    label: string;
    ok: boolean;
}

const LEVELS = ['', 'Faible', 'Moyen', 'Bon', 'Excellent'];

export function usePasswordStrength(password: Ref<string>) {
    // Pour ajouter un critère, ajoutez simplement une ligne ici.
    const rules = computed<PasswordRule[]>(() => [
        { key: 'length', label: '8 caractères minimum', ok: password.value.length >= 8 },
        {
            key: 'case',
            label: 'Majuscule et minuscule',
            ok: /[a-z]/.test(password.value) && /[A-Z]/.test(password.value),
        },
        { key: 'number', label: 'Un chiffre', ok: /\d/.test(password.value) },
        { key: 'symbol', label: 'Un symbole', ok: /[^A-Za-z0-9]/.test(password.value) },
    ]);

    const score = computed(() =>
        password.value ? rules.value.filter((r) => r.ok).length : 0,
    );
    const label = computed(() => LEVELS[score.value]);

    return { rules, score, label };
}
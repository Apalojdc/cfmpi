<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthInput from '@/Components/Auth/AuthInput.vue';
import PasswordInput from '@/Components/Auth/PasswordInput.vue';
import PasswordStrength from '@/Components/Auth/PasswordStrength.vue';
import StepIndicator from '@/Components/Auth/StepIndicator.vue';
import BrandButton from '@/Components/Auth/BrandButton.vue';
import CfmpiShowcase from '@/Components/Auth/CfmpiShowcase.vue';
import CfmpiMobileHeader from '@/Components/Auth/CfmpiMobileHeader.vue';

/* ------------------------------------------------------------------ *
 * Configuration : pour ajouter une étape, ajoutez-la ici, puis son bloc
 * <div v-else-if="step === n"> dans le template.
 * ------------------------------------------------------------------ */
const steps = [
    { key: 'account', label: 'Votre compte', fields: ['name', 'email', 'password', 'password_confirmation'] },
    { key: 'profile', label: 'Votre profil', fields: ['role', 'interests'] },
];

const roles = [
    { value: 'learner', title: 'Apprenant', description: 'Je veux suivre des formations.' },
    { value: 'instructor', title: 'Formateur', description: 'Je veux partager mon expertise.' },
];

const interestOptions = [
    'Développement web',
    'Design',
    'Marketing digital',
    'Gestion de projet',
    'Comptabilité',
    'Langues',
];

/* ------------------------------ Formulaire ------------------------------ */
const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'learner',
    interests: [] as string[],
});

const step = ref(0);
const isLast = computed(() => step.value === steps.length - 1);

/* --------------------------- Validation en direct --------------------------- */
const accountFields = ['name', 'email', 'password', 'password_confirmation'] as const;
type AccountField = (typeof accountFields)[number];

const touched = reactive<Record<string, boolean>>({});
const touch = (field: string) => (touched[field] = true);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clientErrors = computed<Record<AccountField, string>>(() => ({
    name: form.name.trim() ? '' : 'Indiquez votre nom complet.',
    email: !form.email
        ? 'Indiquez votre adresse e-mail.'
        : emailPattern.test(form.email)
          ? ''
          : 'Cette adresse e-mail semble incomplète.',
    password: form.password.length >= 8 ? '' : 'Au moins 8 caractères.',
    password_confirmation:
        form.password_confirmation === form.password
            ? ''
            : 'Les mots de passe ne correspondent pas.',
}));

// Erreur serveur en priorité, sinon erreur locale une fois le champ visité.
const errorFor = (field: AccountField) =>
    form.errors[field] || (touched[field] ? clientErrors.value[field] : '');

/* ------------------------------ Navigation ------------------------------ */
function next() {
    if (step.value === 0) {
        accountFields.forEach(touch);
        if (accountFields.some((f) => clientErrors.value[f])) return;
    }
    step.value++;
}

function back() {
    if (step.value > 0) step.value--;
}

function submit() {
    if (!isLast.value) return next();

    form.post(route('register'), {
        onError: (errors) => {
            // Ramène l'utilisateur à la première étape qui contient une erreur.
            const first = steps.findIndex((s) => s.fields.some((f) => f in errors));
            if (first >= 0) step.value = first;
        },
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
}

function toggleInterest(interest: string) {
    form.interests = form.interests.includes(interest)
        ? form.interests.filter((i) => i !== interest)
        : [...form.interests, interest];
}

/* ------------------------------ Focus ------------------------------ */
const formEl = ref<HTMLFormElement | null>(null);
const focusFirst = () =>
    nextTick(() =>
        formEl.value
            ?.querySelector<HTMLElement>('input:not([type=radio]), input[type=radio]:checked')
            ?.focus(),
    );
</script>

<template>
    <Head title="Créer un compte" />

    <!--
        Desktop (lg+) : deux colonnes ; le panneau animé reste visible (sticky)
        pendant le défilement.
        Mobile / tablette : bandeau animé compact en haut, puis le formulaire
        dans une carte arrondie qui chevauche le bandeau.
    -->
    <div class="flex min-h-screen flex-col bg-white lg:grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[5fr_6fr]">
        <!-- Desktop : panneau animé -->
        <CfmpiShowcase class="hidden lg:block" />

        <!-- Mobile / tablette : bandeau animé -->
        <CfmpiMobileHeader class="lg:hidden" />

        <!-- Formulaire -->
        <main
            class="relative -mt-10 flex flex-1 flex-col rounded-t-[2rem] bg-white px-6 pb-10 pt-8 shadow-[0_-12px_30px_-12px_rgb(0_0_0/0.3)] sm:px-10 lg:mt-0 lg:justify-center lg:rounded-none lg:bg-slate-50 lg:px-10 lg:py-12 lg:shadow-none xl:px-14"
        >
            <div
                class="mx-auto w-full max-w-md lg:max-w-lg lg:rounded-3xl lg:bg-white lg:p-10 lg:shadow-xl lg:shadow-slate-900/5 lg:ring-1 lg:ring-slate-900/5"
            >
                <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
                    Créer votre compte
                </h1>
                <p class="mt-2 text-slate-600">
                    Rejoignez la plateforme et commencez à apprendre en quelques minutes.
                </p>

                <StepIndicator class="mt-8" :steps="steps" :current="step" />

                <form ref="formEl" class="mt-8" novalidate @submit.prevent="submit">
                    <Transition
                        mode="out-in"
                        enter-active-class="transition duration-200 ease-out motion-reduce:transition-none"
                        enter-from-class="translate-x-3 opacity-0"
                        leave-active-class="transition duration-100 ease-in motion-reduce:transition-none"
                        leave-to-class="-translate-x-3 opacity-0"
                        @after-enter="focusFirst"
                    >
                        <!-- Étape 1 : compte -->
                        <div v-if="step === 0" key="account" class="space-y-5">
                            <AuthInput
                                id="name"
                                v-model="form.name"
                                label="Nom complet"
                                type="text"
                                autocomplete="name"
                                autofocus
                                required
                                :error="errorFor('name')"
                                @blur="touch('name')"
                                @input="form.clearErrors('name')"
                            />

                            <AuthInput
                                id="email"
                                v-model="form.email"
                                label="Adresse e-mail"
                                type="email"
                                autocomplete="username"
                                required
                                :error="errorFor('email')"
                                @blur="touch('email')"
                                @input="form.clearErrors('email')"
                            />

                            <div class="space-y-3">
                                <PasswordInput
                                    id="password"
                                    v-model="form.password"
                                    label="Mot de passe"
                                    autocomplete="new-password"
                                    required
                                    :error="errorFor('password')"
                                    @blur="touch('password')"
                                    @input="form.clearErrors('password')"
                                />
                                <PasswordStrength :password="form.password" />
                            </div>

                            <div>
                                <PasswordInput
                                    id="password_confirmation"
                                    v-model="form.password_confirmation"
                                    label="Confirmer le mot de passe"
                                    autocomplete="new-password"
                                    required
                                    :error="errorFor('password_confirmation')"
                                    @blur="touch('password_confirmation')"
                                    @input="form.clearErrors('password_confirmation')"
                                />
                                <p
                                    v-if="form.password_confirmation && !clientErrors.password_confirmation"
                                    class="mt-1.5 text-sm text-brand-700"
                                >
                                    Les mots de passe correspondent.
                                </p>
                            </div>
                        </div>

                        <!-- Étape 2 : profil -->
                        <div v-else key="profile" class="space-y-8">
                            <fieldset>
                                <legend class="text-sm font-medium text-slate-700">Vous êtes</legend>
                                <div class="mt-3 grid gap-3 sm:grid-cols-2">
                                    <label v-for="role in roles" :key="role.value" class="relative cursor-pointer">
                                        <input
                                            v-model="form.role"
                                            type="radio"
                                            name="role"
                                            :value="role.value"
                                            class="peer sr-only"
                                        />
                                        <span
                                            class="block h-full rounded-xl border border-slate-300 p-4 transition peer-checked:border-brand-600 peer-checked:bg-brand-50 peer-checked:ring-1 peer-checked:ring-brand-600 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 peer-focus-visible:ring-offset-2 motion-reduce:transition-none"
                                        >
                                            <span class="block font-semibold text-slate-900">{{ role.title }}</span>
                                            <span class="mt-1 block text-sm text-slate-600">{{ role.description }}</span>
                                        </span>
                                    </label>
                                </div>
                                <p v-if="form.errors.role" class="mt-2 text-sm text-red-600" role="alert">
                                    {{ form.errors.role }}
                                </p>
                            </fieldset>

                            <fieldset>
                                <legend class="text-sm font-medium text-slate-700">
                                    Domaines qui vous intéressent
                                    <span class="font-normal text-slate-500">(facultatif)</span>
                                </legend>
                                <div class="mt-3 flex flex-wrap gap-2">
                                    <button
                                        v-for="interest in interestOptions"
                                        :key="interest"
                                        type="button"
                                        :aria-pressed="form.interests.includes(interest)"
                                        class="rounded-full border px-4 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 motion-reduce:transition-none"
                                        :class="
                                            form.interests.includes(interest)
                                                ? 'border-brand-600 bg-brand-600 text-white'
                                                : 'border-slate-300 text-slate-700 hover:border-brand-500'
                                        "
                                        @click="toggleInterest(interest)"
                                    >
                                        {{ interest }}
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </Transition>

                    <div class="mt-8 flex items-center gap-3">
                        <BrandButton v-if="step > 0" type="button" variant="ghost" @click="back">
                            Retour
                        </BrandButton>
                        <BrandButton type="submit" class="flex-1" :loading="form.processing">
                            {{ isLast ? 'Créer mon compte' : 'Continuer' }}
                        </BrandButton>
                    </div>
                </form>

                <p class="mt-8 text-center text-sm text-slate-600">
                    Déjà inscrit ?
                    <Link
                        :href="route('login')"
                        class="rounded font-semibold text-brand-700 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                        Se connecter
                    </Link>
                </p>
            </div>
        </main>
    </div>
</template>
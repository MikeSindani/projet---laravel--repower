import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <div className="mx-auto w-full max-w-[400px] space-y-6 p-4 sm:p-0">
            <Head title="Connexion - Repower" />
            <PasskeyVerify />

            {/* En-tête de la carte (Style Pur Shadcn) */}
            <div className="flex flex-col space-y-2 text-center">
                {/* Icône minimaliste Énergie / Technologie */}
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-emerald-500 shadow-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Bienvenue
                </h1>
                <p className="text-sm text-muted-foreground">
                    Connectez-vous à votre compte <span className="font-medium text-foreground">Repower</span>
                </p>
            </div>

            {/* Alerte de statut (Style Alert Shadcn) */}
            {status && (
                <div className="relative w-full rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {status}
                </div>
            )}

            {/* Formulaire (Style Form/Card Shadcn) */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-4">
                                {/* Champ Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Adresse email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="nom@repower-sarl.com"
                                        className="h-9 border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Champ Mot de passe */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-medium leading-none">
                                            Mot de passe
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-xs font-medium text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                                                tabIndex={5}
                                            >
                                                Mot de passe oublié ?
                                            </TextLink>
                                        )}
                                    </div>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="h-9 border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Case à cocher "Se souvenir de moi" */}
                                <div className="flex items-center space-x-2 pt-1">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="h-4 w-4 rounded border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none cursor-pointer select-none text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Se souvenir de moi
                                    </Label>
                                </div>
                            </div>

                            {/* Bouton Principal Shadcn */}
                            <Button
                                type="submit"
                                className="w-full h-9 bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 mt-2"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <Spinner className="h-4 w-4 animate-spin text-current" />
                                        <span>Connexion en cours...</span>
                                    </div>
                                ) : (
                                    "Se connecter"
                                )}
                            </Button>
                        </>
                    )}
                </Form>
            </div>

            {/* Pied de page (Lien d'inscription style Shadcn) */}
            <div className="text-center text-sm text-muted-foreground hidden">
                Vous n'avez pas de compte ?{' '}
                <TextLink 
                    href={register()} 
                    tabIndex={5} 
                    className="font-medium text-foreground underline-offset-4 hover:underline transition-colors"
                >
                    S'inscrire
                </TextLink>
            </div>
        </div>
    );
}

Login.layout = {
    title: 'Connexion',
    description: 'Entrez vos identifiants ci-dessous pour vous connecter à votre compte.',
};
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/useTranslations';
import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Welcome() {
    const { auth, ziggy, locale: currentLocaleFromProps } = usePage<SharedData & { locale: string }>().props;
    const { t } = useTranslations();

    const currentLocale = currentLocaleFromProps || 'en';
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'de', name: 'Deutsch' },
        { code: 'fr', name: 'Français' },
        { code: 'es', name: 'Español' },
    ];

    return (
        <>
            <Head title={t('welcome.title')}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1b1b18] text-white">
                {/* Navigation */}
                <header className="container mx-auto py-6 px-4">
                    <nav className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-[#F53003]">{t('welcome.logo')}</div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-[#F53003] px-5 py-2 text-sm font-medium text-white hover:bg-[#d62a02] transition-colors"
                                >
                                    {t('welcome.dashboard')}
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md border border-white/20 px-5 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                                    >
                                        {t('welcome.log_in')}
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-[#F53003] px-5 py-2 text-sm font-medium text-white hover:bg-[#d62a02] transition-colors"
                                    >
                                        {t('welcome.register')}
                                    </Link>
                                </>
                            )}

                            {/* Language Switcher Dropdown */}
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 hover:bg-white/10">
                                        <GlobeAltIcon className="-ml-0.5 h-5 w-5 text-white" aria-hidden="true" />
                                        {languages.find(lang => lang.code === currentLocale)?.name || currentLocale.toUpperCase()}
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-auto min-w-max origin-top-right rounded-md bg-[#1f1f1e] shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {languages.map((language) => (
                                            <MenuItem key={language.code}>
                                                {({ focus }) => (
                                                    <Link
                                                        href={route('language.switch', { locale: language.code })}
                                                        className={`block px-4 py-2 text-sm ${focus ? 'bg-[#F53003] text-white' : 'text-gray-300 hover:bg-white/5'}`}
                                                        method="get"
                                                        as="button"
                                                        type="button"
                                                        preserveScroll
                                                        preserveState={false}
                                                    >
                                                        {language.name}
                                                    </Link>
                                                )}
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="container mx-auto px-4 py-12 md:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('welcome.hero_title')}</h1>
                            <p className="text-xl md:text-2xl text-gray-300 mb-8">
                                {t('welcome.hero_subtitle')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-[#F53003] px-6 py-3 text-center text-white font-medium hover:bg-[#d62a02] transition-colors"
                                >
                                    {t('welcome.start_creating')}
                                </Link>
                                <Link
                                    href="#learn-more"
                                    className="rounded-md border border-white/20 px-6 py-3 text-center text-white font-medium hover:bg-white/10 transition-colors"
                                >
                                    {t('welcome.learn_more')}
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="relative rounded-lg bg-[#161615] p-6 border border-white/10 shadow-xl">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-[#F53003] flex items-center justify-center">
                                        <span className="text-white font-medium">DS</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">{t('welcome.hero_character_intro_ds')}</p>
                                    </div>
                                </div>
                                <p className="mb-6 text-gray-300">
                                    {t('welcome.hero_story_snippet_ds')}
                                </p>

                                <div className="border-t border-white/10 pt-4 mt-4"></div>

                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-[#3b82f6] flex items-center justify-center">
                                        <span className="text-white font-medium">JM</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">{t('welcome.hero_character_intro_jm')}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300">
                                    {t('welcome.hero_story_snippet_jm')}
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section id="learn-more" className="py-16 bg-black/30">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">{t('welcome.features_title')}</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6 bg-[#161615] rounded-lg border border-white/10">
                                <div className="w-12 h-12 bg-[#F53003] rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{t('welcome.feature_1_title')}</h3>
                                <p className="text-gray-400">
                                    {t('welcome.feature_1_description')}
                                </p>
                            </div>

                            <div className="p-6 bg-[#161615] rounded-lg border border-white/10">
                                <div className="w-12 h-12 bg-[#F53003] rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{t('welcome.feature_2_title')}</h3>
                                <p className="text-gray-400">
                                    {t('welcome.feature_2_description')}
                                </p>
                            </div>

                            <div className="p-6 bg-[#161615] rounded-lg border border-white/10">
                                <div className="w-12 h-12 bg-[#F53003] rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{t('welcome.feature_3_title')}</h3>
                                <p className="text-gray-400">
                                    {t('welcome.feature_3_description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">{t('welcome.cta_title')}</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            {t('welcome.cta_subtitle')}
                        </p>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-md bg-[#F53003] px-8 py-3 text-white font-medium hover:bg-[#d62a02] transition-colors"
                        >
                            {t('welcome.create_account')}
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-black/50 py-8">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} Roleplay.Chat — {t('welcome.footer_text')}
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

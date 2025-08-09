import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { usePage } from '@inertiajs/react';
import { Link, router } from '@inertiajs/react';
import { LogOut, Settings, Check } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const { available_locales: availableLocales = [], locale: currentLocale = 'en' } =
        (usePage().props as { available_locales?: string[]; locale?: string });

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {availableLocales.map((loc: string) => (
                <DropdownMenuItem asChild key={loc} disabled={loc === currentLocale}>
                    <Link
                        className="w-full flex items-center capitalize"
                        href={route('language.switch', loc)}
                        as="button"
                        onClick={cleanup}
                    >
                        {loc}
                        {loc === currentLocale && <Check className="ml-auto size-4" />}
                    </Link>
                </DropdownMenuItem>
            ))}
        </>
    );
}

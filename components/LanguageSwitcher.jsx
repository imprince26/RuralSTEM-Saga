import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages, Check } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">
                {languages.find(lang => lang.code === i18n.language)?.nativeName || 'English'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Change Language
          </TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">{language.name}</span>
            </div>
            {i18n.language === language.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
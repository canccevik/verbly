import { ChevronsUpDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import ISO6391 from 'iso-639-1'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from './ui/command'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface LanguageDropdownProps {
  language: string
  setLanguage: (language: string) => void
  contentClassName: string
}

const languageNames = ISO6391.getAllNames()

export default function LanguageDropdown({
  language,
  setLanguage,
  contentClassName
}: LanguageDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <PopoverTrigger asChild className="focus-visible:ring-0">
        <Button
          role="combobox"
          aria-expanded={isDropdownOpen}
          className="w-full justify-between bg-main-grey px-6 text-muted-foreground hover:bg-main-grey border-2"
        >
          {language
            ? languageNames.find((name) => name.toLowerCase() === language)
            : 'Native language'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn('h-60 p-0', contentClassName)}>
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>

          <CommandGroup>
            {languageNames.map((name) => (
              <CommandItem
                key={name}
                onSelect={(currentValue) => {
                  setLanguage(currentValue === language ? '' : currentValue)
                  setIsDropdownOpen(false)
                }}
              >
                {name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

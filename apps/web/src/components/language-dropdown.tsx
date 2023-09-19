import { ChevronsUpDown } from 'lucide-react'
import ISO6391 from 'iso-639-1'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from './ui/command'

interface LanguageDropdownProps {
  language: string
  setLanguage: (language: string) => void
  onChange: (language: string) => void
  contentClassName: string
}

const languageNames = ISO6391.getAllNames()

export default function LanguageDropdown({
  language,
  setLanguage,
  onChange,
  contentClassName
}: LanguageDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  function setLanguageCode(language: string) {
    const languageCode = ISO6391.getCode(language)
    setLanguage(languageCode)
    onChange(languageCode)
  }

  return (
    <Popover open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <PopoverTrigger asChild className="focus-visible:ring-0">
        <Button
          role="combobox"
          aria-expanded={isDropdownOpen}
          className="w-full justify-between bg-main-grey px-6 text-muted-foreground hover:bg-main-grey border-2"
        >
          {language ? ISO6391.getName(language) : 'Native language'}
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
                  setLanguageCode(currentValue)
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

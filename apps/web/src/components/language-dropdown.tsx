import { Dispatch, SetStateAction } from 'react'
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

interface LanguageDropdownProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  language: string
  setLanguage: Dispatch<SetStateAction<string>>
}

const languageNames = ISO6391.getAllNames()

export default function LanguageDropdown({
  open,
  setOpen,
  language,
  setLanguage
}: LanguageDropdownProps) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="focus-visible:ring-0">
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-main-grey px-6 text-muted-foreground hover:bg-main-grey"
        >
          {language
            ? languageNames.find((name) => name.toLowerCase() === language)
            : 'Native language'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[400px] h-60 p-0 mt-2">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>

          <CommandGroup>
            {languageNames.map((name) => (
              <CommandItem
                key={name}
                onSelect={(currentValue) => {
                  setLanguage(currentValue === language ? '' : currentValue)
                  setOpen(false)
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

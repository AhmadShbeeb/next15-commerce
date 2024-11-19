'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import Link from 'next/link';

interface SelectSearchableProps {
  items: { id: string; name: string }[];
  placeholder: string;
  createLink: string;
  inputName: string;
  defaultValue?: string;
}

export function SelectSearchable({ items, placeholder, createLink, inputName, defaultValue }: SelectSearchableProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? '');

  return (
    <>
      <input type="hidden" name={inputName} value={value} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
            {value ? items?.find((category) => category.id === value)?.name : `Select a ${placeholder}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput name={inputName} placeholder={`Search ${placeholder}...`} />
            <CommandList>
              <CommandEmpty>
                <Link href={createLink} className="text-blue-500">
                  Create a new {placeholder} +
                </Link>
              </CommandEmpty>
              <CommandGroup>
                {items?.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === item.id ? 'opacity-100' : 'opacity-0')} />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

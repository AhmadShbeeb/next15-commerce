'use client';

import { Check, ChevronsUpDown, Edit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';

interface SelectSearchableProps {
  items: { id: string; name: string }[];
  placeholder: string;
  createLink?: string;
  Form?: React.JSXElementConstructor<{ id?: string; name?: string; setMenuOpen: (open: boolean) => void }>;
  inputName: string;
  defaultValue?: string | string[];
  isError?: boolean;
}

export function SelectSearchable({
  items,
  placeholder,
  inputName,
  defaultValue,
  isError,
  Form,
}: SelectSearchableProps) {
  const [value, setValue] = useState(defaultValue ?? '');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id?: string; name?: string }>();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input type="hidden" name={inputName} value={value} />
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={menuOpen}
            className={cn('w-[240px] justify-between', { 'border-red-500': isError })}
          >
            {value ? items?.find((item) => item.id === value)?.name : `Select a ${placeholder}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <Command>
            <CommandInput name={inputName} placeholder={`Search ${placeholder}...`} ref={inputRef} />
            <CommandList>
              <CommandEmpty>
                <Button
                  onClick={() => {
                    setSelectedItem({ name: inputRef.current?.value });
                    setDialogOpened(true);
                  }}
                  className="bg-blue-100 text-blue-500 hover:bg-blue-200"
                >
                  Create a new {placeholder} +
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {items?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2">
                    <CommandItem
                      value={item.name}
                      onSelect={() => {
                        setValue(item.id);
                        setMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      <Check className={cn('mr-2 h-4 w-4', value === item.id ? 'opacity-100' : 'opacity-0')} />
                      {item.name}
                    </CommandItem>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedItem(item);
                        setDialogOpened(true);
                      }}
                    >
                      <Edit className="size-4 text-blue-500" />
                    </Button>
                  </div>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedItem?.id ? `Update ${placeholder}` : `Create a new ${placeholder}`}</DialogTitle>
          </DialogHeader>
          <DialogDescription />
          {Form && <Form id={selectedItem?.id} name={selectedItem?.name} setMenuOpen={setMenuOpen} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

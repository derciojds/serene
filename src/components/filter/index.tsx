import { SortFilterItem } from '@/lib/shopify/constants';
import { cn } from '@/utils';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from '../Icons';
import { FilterCheckbox } from './FilterCheckbox';
import { FilterRadio } from './FilterRadio';
import { FilterSlider } from './FilterSlider';
import styles from './filter.module.scss';

type FilterProps = {
  trigger: {
    label: string;
    icon?: () => JSX.Element;
    className?: string;
  };
  urlTerm?: string;
} & (Checkbox | Slider | Radio);

interface Checkbox {
  type: 'checkbox';
  list: string[] | SortFilterItem[];
}

interface Slider {
  type: 'slider';
  min: number;
  max: number;
}

interface Radio {
  type: 'radio';
  list: string[] | SortFilterItem[];
}

export function Filter(props: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const name = props.trigger.label.toLowerCase();
  const term = props.urlTerm || name;

  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentTerms = params.get(name)?.split(',') || [];

  let list: string[] = [];

  if (props.type === 'checkbox' || props.type === 'radio') {
    list = props.list.map((item) => {
      return typeof item === 'string' ? item : item.title;
    });
  }

  const handleCheckboxChange = (item: string) => {
    const newTerm = item.toLowerCase();

    if (currentTerms.includes(newTerm)) {
      const filteredTerms = currentTerms.filter((term) => term !== newTerm);
      params.set(name, filteredTerms.join(','));
    } else {
      currentTerms.push(newTerm);
      params.set(name, currentTerms.join(','));
    }

    if (params.get(name) === '') {
      params.delete(name);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleSliderChange = (values: number[]) => {
    params.set(term, values.join(','));
    replace(`${pathname}?${params.toString()}`);
  };

  const [activeRadioValue, setActiveRadioValue] = useState('');

  const handleRadioValueChange = (value: string) => {
    setActiveRadioValue(value);

    if (props.type === 'radio') {
      for (const obj of props.list) {
        if (typeof obj === 'string') {
          params.set(term, value.toLowerCase());
          break;
        }

        if (obj.title === value && !!obj.slug) {
          params.set(term, obj.slug);
          break;
        } else {
          params.delete(term);
        }
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const count = ((starter) =>
    props.type === 'checkbox' ? currentTerms.length : starter)('');

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            styles.triggerButton,
            isOpen ? styles.open : '',
            props.trigger.className,
          )}
        >
          <span>
            {name} {count ? `(${count})` : ''}
          </span>
          <span className={props.trigger.icon ? styles.customIcon : ''}>
            {props.trigger.icon ? <props.trigger.icon /> : <ChevronDown />}
          </span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.menuContent} sideOffset={5}>
          {props.type === 'checkbox' ? (
            <FilterCheckbox
              onCheckedChange={handleCheckboxChange}
              content={list}
              checkedContent={currentTerms}
            />
          ) : props.type === 'slider' ? (
            <FilterSlider
              onValueChange={handleSliderChange}
              min={props.min}
              max={props.max}
              currentValues={[Number(currentTerms[0]), Number(currentTerms[1])]}
              closeMenu={setIsOpen}
            />
          ) : props.type === 'radio' ? (
            <FilterRadio
              onValueChange={handleRadioValueChange}
              name={name}
              currentValue={activeRadioValue}
              content={list}
            />
          ) : (
            ''
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

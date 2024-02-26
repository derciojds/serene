'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './filter.module.scss';

interface FilterCheckboxProps {
  content: string[];
  checkedContent: string[];
  onCheckedChange: (item: string) => void;
}

export function FilterCheckbox({
  content,
  checkedContent,
  onCheckedChange,
}: FilterCheckboxProps) {
  return (
    <>
      <DropdownMenu.Label className={styles.dropdownMenuLabel}>
        <span>{checkedContent.length} Selected</span>
        <button type="button">
          <span>clear</span>
        </button>
      </DropdownMenu.Label>
      <DropdownMenu.Separator className={styles.separator} />
      {content.map((item) => (
        <DropdownMenu.CheckboxItem
          key={item}
          className={styles.checkboxItem}
          checked={checkedContent.includes(item.toLowerCase())}
          onCheckedChange={() => onCheckedChange(item)}
        >
          <DropdownMenu.ItemIndicator
            className={styles.dropdownMenuItemIndicator}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m5 14 3.5 3.5L19 6.5"
              />
            </svg>
          </DropdownMenu.ItemIndicator>
          {item}
        </DropdownMenu.CheckboxItem>
      ))}
      <DropdownMenu.Arrow className={styles.dropdownMenuArrow} />
    </>
  );
}

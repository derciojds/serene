import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from './filter.module.scss';

interface FilterRadioProps {
  name: string;
  content: string[];
  currentValue: string;
  onValueChange: (value: string) => void;
}

export function FilterRadio({
  name,
  currentValue,
  content,
  onValueChange,
}: FilterRadioProps) {
  return (
    <DropdownMenu.RadioGroup value={currentValue} onValueChange={onValueChange}>
      {content?.map((item) => (
        <DropdownMenu.RadioItem
          key={item}
          className={styles.checkboxItem}
          value={item}
        >
          <DropdownMenu.ItemIndicator
            className={styles.dropdownMenuItemIndicator}
          >
            •
          </DropdownMenu.ItemIndicator>
          {item}
        </DropdownMenu.RadioItem>
      ))}
    </DropdownMenu.RadioGroup>
  );
}

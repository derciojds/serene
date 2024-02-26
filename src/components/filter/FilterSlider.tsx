import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Slider from '@radix-ui/react-slider';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../button';
import styles from './filter.module.scss';

interface FilterSliderProps {
  min: number;
  max: number;
  onValueChange: (values: number[]) => void;
  currentValues: number[];
  closeMenu?: Dispatch<SetStateAction<boolean>>;
}

export function FilterSlider({
  min,
  max,
  onValueChange,
  currentValues,
  closeMenu,
}: FilterSliderProps) {
  const [current_min, current_max] = currentValues;

  const [values, setValues] = useState<number[]>([
    current_min ? current_min : min,
    current_max ? current_max : max,
  ]);

  return (
    <div>
      <DropdownMenu.Label className={styles.dropdownMenuLabel}>
        <span>Price range</span>
        <button
          onClick={() => {
            onValueChange([min, max]);
            if (closeMenu) closeMenu(false);
          }}
          type="button"
        >
          <span>reset</span>
        </button>
      </DropdownMenu.Label>
      <div className={styles.sliderContainer}>
        <form>
          <Slider.Root
            className={styles.sliderRoot}
            onValueChange={setValues}
            value={values}
            defaultValue={values}
            min={min}
            max={max}
            step={1}
          >
            <Slider.Track className={styles.sliderTrack}>
              <Slider.Range className={styles.sliderRange} />
            </Slider.Track>
            <Slider.Thumb
              className={styles.sliderThumb}
              aria-label="Minimum price"
            />
            <Slider.Thumb
              className={styles.sliderThumb}
              aria-label="Maximum price"
            />
          </Slider.Root>
          <div className={styles.sliderLabel}>
            <span>{min}</span>
            <span>{max}</span>
          </div>
          <div className={styles.inputs}>
            <div>
              <label htmlFor="minPrice">From</label>
              <input
                type="number"
                value={values[0]}
                onChange={(e) => {
                  setValues([Number(e.target.value), values[1]]);
                }}
                min={min}
                max={max}
                name="Minimum price"
                id="minPrice"
              />
            </div>
            <div>
              <label htmlFor="maxPrice">To</label>
              <input
                type="number"
                value={values[1]}
                onChange={(e) => {
                  setValues([values[0], Number(e.target.value)]);
                }}
                min={min}
                max={max}
                name="Maximum price"
                id="maxPrice"
              />
            </div>
          </div>
          <Button.root
            disabled={
              values[0] === currentValues[0] && values[1] === currentValues[1]
            }
            className={styles.applyButton}
            element="button"
            size="sm"
            onClick={() => {
              onValueChange(values);
              if (closeMenu) closeMenu(false);
            }}
          >
            <Button.content text="Apply Filter" />
          </Button.root>
        </form>
      </div>
    </div>
  );
}

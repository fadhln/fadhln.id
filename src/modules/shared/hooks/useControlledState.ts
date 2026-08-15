import { useState } from "react";

/**
 * A custom hook that manages a controlled or uncontrolled state.
 *
 * @template T - The type of the state value.
 * @param {T | undefined} controlledValue - The controlled value. If provided, the state will be controlled.
 * @param {T} defaultValue - The default value for the state when uncontrolled.
 * @param {(value: T) => void} [onChange] - Optional callback function that is called when the state changes.
 * @returns {[T, (value: T) => void]} An array containing the current state value and a setter function to update it.
 */
function useControlledState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(
    controlledValue !== undefined ? controlledValue : defaultValue,
  );

  const isControlled = controlledValue !== undefined;

  const setControlledValue = (newValue: T) => {
    if (!isControlled) {
      setValue(newValue);
    }
    onChange?.(newValue);
  };

  return [isControlled ? (controlledValue as T) : value, setControlledValue];
}

export default useControlledState;

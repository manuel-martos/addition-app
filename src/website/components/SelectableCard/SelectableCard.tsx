import { useState, useEffect, useCallback, MouseEvent } from 'react';
import Card from 'react-bootstrap/Card';

export interface SelectableCardProps {
  title: string;
  text: string;
  selected: boolean;
  onSelectionChanged?: (selected: boolean) => void;
}

/**
 * SelectableCard — React 18+ function component
 * - Uses button semantics for accessibility
 * - Syncs internal state if the `selected` prop changes
 * - Emits `onSelectionChanged(selected)` after toggling
 */
export function SelectableCard({
  title,
  text,
  selected: selectedProp,
  onSelectionChanged,
}: SelectableCardProps) {
  const [selected, setSelected] = useState<boolean>(selectedProp);

  // keep internal state in sync if parent updates the prop
  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);

  const toggleSelection = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const next = !selected;
    setSelected(next);
    onSelectionChanged?.(next);
  }, [selected, onSelectionChanged]);

  return (
    <button
      type="button"
      onClick={toggleSelection}
      aria-pressed={selected}
      style={{ all: 'unset', cursor: 'pointer', display: 'block' }} // avoid default button styles
    >
      <Card>
        <Card className={selected ? 'selected' : 'unselected'}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{text}</Card.Text>
          </Card.Body>
        </Card>
      </Card>
    </button>
  );
}

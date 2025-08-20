import { Children, ReactElement, isValidElement, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { SelectableCard } from "../SelectableCard/SelectableCard";
import type { SelectableCardProps } from "../SelectableCard/SelectableCard";

export interface SelectableCardGroupProps {
  children: ReactElement<SelectableCardProps> | ReactElement<SelectableCardProps>[];
}

export function SelectableCardGroup({ children }: SelectableCardGroupProps) {
  // Normalize children to a typed array of elements
  const items = useMemo(
    () =>
      Children.toArray(children).filter(
        (c): c is ReactElement<SelectableCardProps> => isValidElement(c)
      ),
    [children]
  );

  // Initialize from whichever child is pre-selected (if any)
  const initialSelectedIndex = useMemo(
    () => items.findIndex((el) => Boolean(el.props.selected)),
    [items]
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);

  return (
    <Container>
      <Row className="justify-content-md-center">
        {items.map((child, idx) => {
          const { title, text } = child.props;
          const isSelected = selectedIndex === idx;

          return (
            <Col className="col-md-4" key={child.key ?? idx}>
              <SelectableCard
                title={title}
                text={text}
                selected={isSelected}
                onSelectionChanged={(selected) => {
                  if (selected) setSelectedIndex(idx);
                  else if (selectedIndex === idx) setSelectedIndex(-1);
                }}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

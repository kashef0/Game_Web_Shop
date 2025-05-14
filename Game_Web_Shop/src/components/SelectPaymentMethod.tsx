import { ListCollection, Portal, Select } from "@chakra-ui/react";

interface Items {
  label: string,
  value: string
}

interface Props {
  collection: ListCollection<Items>;
  value: string[];
  onChange: (value: string[]) => void;
}

const SelectPaymentMethod = ({ collection, value, onChange }: Props) => {
  return (
    <Select.Root
      collection={collection}
      value={value}
      onValueChange={(details) => onChange(details.value)}
      size="sm"
      width="320px"
    >
      <Select.HiddenSelect />
      <Select.Label>Select Payment Method</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Payment Method" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item: Items) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectPaymentMethod;

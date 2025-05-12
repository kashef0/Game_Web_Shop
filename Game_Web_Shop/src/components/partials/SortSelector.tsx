import { selectedRelevanceId } from "@/store/Slices/genreSlice";
import { RootState } from "@/store/store";

import { Button, Flex, Menu, Portal } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const SortSelector = () => {
  const dispatch = useDispatch();
  const selectedSortValue = useSelector(
    (state: RootState) => state.genre.selectedRelevance
  );

  // Definierar en lista över möjliga sorteringsalternativ
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date Added" },
    { value: "name", label: "Name (A-Z)" },
    { value: "-released", label: "Newest Release" },
    { value: "-metacritic", label: "Highest Rated" },
    { value: "-rating", label: "Top User Rating" },
  ];

    // Hittar etiketten för den aktuella sorteringsordningen annars sätt Relevance
  const selectedLabel =
    sortOrders.find((order) => order.value === selectedSortValue)?.label ||
    'Relevance';

// Funktion som hanterar när användaren väljer ett nytt sorteringsalternativ
  const onSelectSortOrder = (id: string) => {
    dispatch(selectedRelevanceId(id));
    // Hittar det valda sorteringsalternativet baserat på id
        const selected = sortOrders.find((p) => p.value === id);
        if (selected) {
            selectedRelevanceId(selected.value);
        }
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" p=".75rem" rounded={4}>
          <Flex align="center" gap={1}>
            Order by: {selectedLabel}
            <BsChevronDown />
          </Flex>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {sortOrders.map((order) => (
              <Menu.Item
                p=".75rem"
                key={order.value}
                value={order.value}
                onClick={() => onSelectSortOrder(order.value)}
                cursor="pointer"
              >
                {order.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default SortSelector;

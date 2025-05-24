import { ButtonGroup, IconButton, Pagination as ChakraPagination } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface Props {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onChange }) => {
  return (
    <ChakraPagination.Root
      count={totalPages}
      pageSize={1}
      page={currentPage}
      onPageChange={(e) => onChange(e.page)}
    >
      <ButtonGroup variant="ghost" size="sm" justifyContent="center" width="100%" mt={6}>
        <ChakraPagination.PrevTrigger asChild>
          <IconButton aria-label="Previous page">
            <HiChevronLeft />
          </IconButton>
        </ChakraPagination.PrevTrigger>

        <ChakraPagination.Items
          render={(page) => (
            <IconButton
              key={page.value}
              variant={page.value === currentPage ? "solid" : "ghost"}
              onClick={() => onChange(page.value)}
            >
              {page.value}
            </IconButton>
          )}
        />

        <ChakraPagination.NextTrigger asChild>
          <IconButton aria-label="Next page">
            <HiChevronRight />
          </IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
};

export default Pagination;

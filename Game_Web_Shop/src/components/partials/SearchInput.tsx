import { onSearch } from "@/store/Slices/gamesSlice";
import { Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import { LuSearch } from "react-icons/lu";
import { useDispatch } from "react-redux";


import { Form } from "react-router-dom";
    
const SearchInput = () => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (ref.current) {
            dispatch(onSearch(ref.current.value))
        }
    }
  return (
    <Form className="searchForm" onSubmit={handleSubmit} >
      <InputGroup flex="1" startElement={<LuSearch />} color='white' >
        <Input ref={ref} bg='gray.700' borderRadius={20} _placeholder={{ color: "inherit" }} placeholder="Search games..." />
      </InputGroup>
    </Form>

  );
};

export default SearchInput;

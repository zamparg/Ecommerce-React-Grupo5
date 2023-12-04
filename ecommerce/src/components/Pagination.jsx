import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Pagination = ({ currentPage, onChangePage }) => {
  const handleDecrement = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const handleIncrement = () => {
    onChangePage(currentPage + 1);
  };

  return (
    <ButtonGroup size="md" mb={6}>
      <IconButton
        icon={<FaArrowLeft />}
        variant="outline"
        onClick={handleDecrement}
        isDisabled={currentPage === 1}
      />
      <IconButton
        icon={<FaArrowRight />}
        variant="outline"
        onClick={handleIncrement}
      />
    </ButtonGroup>
  );
};

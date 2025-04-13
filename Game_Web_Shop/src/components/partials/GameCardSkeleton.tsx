import { Card, Skeleton, SkeletonText, Wrap, WrapItem } from "@chakra-ui/react";

const GameCardSkeleton = () => {
    return (
      <Wrap gap={8} p="10px">
        {Array.from({ length: 10 }).map((_, index) => (
          <WrapItem key={index}>
            <Card.Root width="250px">
              <Skeleton height="200px" />
              <Card.Body gap={10}>
                <SkeletonText />
              </Card.Body>
            </Card.Root>
          </WrapItem>
        ))}
      </Wrap>
    );
  };
export default GameCardSkeleton;

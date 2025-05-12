import { Card, Skeleton, SkeletonText, Wrap, WrapItem } from "@chakra-ui/react";

const GameCardSkeleton = () => {
    return (
      <Wrap gap={6} p="10px">
        {Array.from({ length: 10 }).map((_, index) => (
          <WrapItem key={index}>
            <Card.Root width="300px">
              <Skeleton height="300px" />
              <Card.Body gap={8}>
                <SkeletonText />
              </Card.Body>
            </Card.Root>
          </WrapItem>
        ))}
      </Wrap>
    );
  };
export default GameCardSkeleton;

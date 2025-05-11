import { HStack, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'

const GenreListSkelton = () => {
    return (
        <HStack gap="5" paddingY={2}>
          <SkeletonCircle size="12" borderRadius={8}/>
          <Stack flex="1">
            <Skeleton height="5" />
            <Skeleton height="5" width="80%" />
          </Stack>
        </HStack>
      )
}

export default GenreListSkelton
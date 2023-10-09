import { Box, Grid, Text, Stack, HStack, VStack, Input, Link } from '@chakra-ui/react'
import React from 'react'

function Timeline() {
  return (
    <Box>
        <Grid 
        className=''
        gridTemplateColumns={'1fr 2fr 1fr'}
        marginLeft={'18%'}
        marginRight={'18%'}>
          <VStack align={'stretch'}>
            <Grid>

            </Grid>
            <Link>Home</Link>
            <Link>Notification</Link>
            <Link>Message</Link>
          </VStack>
          
          <VStack>
            <Input/>
          </VStack>
          
          <VStack>
          <Text>Home</Text>
            <Text>Notification</Text>
            <Text>Message</Text>
          </VStack>
        </Grid>
    </Box>
  )
}

export default Timeline
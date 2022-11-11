import Link from 'next/link';
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { IconContext } from 'react-icons';
import { FaHome } from 'react-icons/fa';

export const HomeButton = () => {
    const buttonSize = useBreakpointValue(['20px', '25px', '30px','40px', '45px', '70px']);
    return (
        <Link href={'/top'}>
            <Flex
                position={'fixed'}
                right={'3%'}
                bottom={'3%'}
                width={{
                    base: '45px',
                    sm: '50px',
                    md: '55px',
                    lg: '60px',
                    xl: '70px',
                    '2xl': '110px',
                }}
                height={{
                    base: '45px',
                    sm: '50px',
                    md: '55px',
                    lg: '60px',
                    xl: '70px',
                    '2xl': '110px',
                }}
                backgroundColor={'#f49f2b'}
                borderRadius={'full'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <IconContext.Provider value={{ color: 'ffffff', size: buttonSize }}>
                        <FaHome />
                    </IconContext.Provider>
                </Box>
                <Text
                    color={'#ffffff'}
                    fontSize={{ base: '10px', sm: '12px', md: '13px', xl: '15px', '2xl': '25px' }}
                    textAlign={'center'}
                >
                    Home
                </Text>
            </Flex>
        </Link>
    );
};

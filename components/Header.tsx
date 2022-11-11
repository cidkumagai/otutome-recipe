import { Box, Img } from '@chakra-ui/react';

import rogoPic from '../pages/images/rogo.jpeg';

export const Header = () => {
    return (
        <Box width={'100%'} height={'100px'} backgroundColor={'#ffffff'} position={'relative'}>
            <Img
                src={rogoPic.src}
                alt='ロゴ画像'
                maxWidth={'30%'}
                maxHeight={'70px'}
                margin={'20px auto'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            />
        </Box>
    );
};

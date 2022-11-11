import { Box, Img } from "@chakra-ui/react";

import rogoPic from '../pages/images/cscpロゴ.png';

export const Footer = () => {
    return (
        <Box backgroundColor={'#ffffff'}>
            <Box width={'100%'} height={'70px'} display={'flex'} alignItems={'center'} marginTop={'30px'}>
                <Img
                    src={rogoPic.src}
                    alt='ロゴ画像'
                    maxWidth={'50%'}
                    maxHeight={'50%'}
                    margin={'20px auto'}
                />
            </Box>
        </Box>
    );
}
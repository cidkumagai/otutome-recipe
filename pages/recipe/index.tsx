import { NextPage } from 'next';

import { Box, Flex, Img, Text } from '@chakra-ui/react';

import { usePickUpFoodId } from './[id]';
import { GetFood } from '../../lib/queries/getFood';
import { HomeButton } from '../../components/HomeButton';
import { Header } from '../../components/Header';

export { Recipe as default };

const Recipe: NextPage = () => {
    const { foodId } = usePickUpFoodId();
    const { data, loading, error } = GetFood(Number(foodId));
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <HomeButton />
            <Header />
            <Flex
                justifyContent={'space-around'}
                width={'90%'}
                margin={'0 auto'}
                paddingTop={'100px'}
                display={{ base: 'block', lg: 'flex' }}
            >
                <Img
                    src={data?.getFood.photo}
                    alt={'料理完成写真'}
                    maxWidth={{ base: '90%', lg: '50%' }}
                    maxHeight={'50%'}
                    objectFit={'contain'}
                    margin={{ base: '0 auto 30px auto', lg: '0 auto' }}
                />
                <Box width={{ base: '90%', lg: '40%' }} margin='0 auto'>
                    <Text
                        width={'fit-content'}
                        margin={'0 auto 20px auto'}
                        position={'relative'}
                        fontSize={{
                            base: '17px',
                            sm: '22px',
                            md: '27px',
                            lg: '30px',
                            xl: '35px',
                        }}
                        fontWeight='bold'
                        fontFamily='"游明朝","YuMincho",serif'
                        textAlign={'center'}
                        borderBottom={'3px solid #f49f2b'}
                        _after={{
                            content: '""',
                            width: '15px',
                            height: '15px',
                            position: 'absolute',
                            bottom: '-9px',
                            borderRadius: 'full',
                            backgroundColor: '#f49f2b',
                        }}
                    >
                        {data?.getFood.name}
                    </Text>
                    <Box>
                        {data?.getFood.ingredient.map((item, index) => {
                            return (
                                <Flex
                                    key={index}
                                    justifyContent={'space-between'}
                                    borderBottom={'2px solid #ed7332'}
                                    position={'relative'}
                                    _after={{
                                        content: '""',
                                        width: '10px',
                                        height: '10px',
                                        position: 'absolute',
                                        bottom: '-6px',
                                        right: '-10px',
                                        borderRadius: 'full',
                                        backgroundColor: '#ed7332',
                                    }}
                                >
                                    <Text
                                        fontSize={{
                                            base: '14px',
                                            sm: '18px',
                                            md: '22px',
                                            lg: '27px',
                                            xl: '30px',
                                        }}
                                        fontFamily={
                                            '"ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", "Meiryo", "verdana", sans-serif'
                                        }
                                        fontWeight={400}
                                    >
                                        {item.material}
                                    </Text>
                                    <Text
                                        fontSize={{
                                            base: '14px',
                                            sm: '18px',
                                            md: '22px',
                                            lg: '27px',
                                            xl: '30px',
                                        }}
                                        fontFamily={
                                            '"ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", "Meiryo", "verdana", sans-serif'
                                        }
                                        fontWeight={400}
                                    >
                                        {item.amount}
                                    </Text>
                                </Flex>
                            );
                        })}
                    </Box>
                </Box>
            </Flex>
            <Box
                width={'80%'}
                margin='30px auto'
                border={'3px solid #f49f2b'}
                borderRadius='10px'
                backgroundColor='#ffffff'
            >
                <Text
                    fontSize={{ base: '20px', sm: '25px', md: '30px', lg: '35px', xl: '40px' }}
                    fontFamily={'"游明朝","YuMincho",serif'}
                    fontWeight={500}
                    textAlign={'center'}
                >
                    料理手順
                </Text>
            </Box>
            <Flex
                flexWrap={'wrap'}
                width={'90%'}
                margin={'0 auto'}
                justifyContent={{ base: 'center', lg: 'unset' }}
            >
                {data?.getFood.recipe.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            width={{
                                base: '90%',
                                lg: 'calc(100% / 2)',
                                xl: 'calc(100% / 3)',
                            }}
                            margin={'15px 0'}
                        >
                            <Box
                                width={{ base: '100%', lg: '95%' }}
                                backgroundColor='#ffffff'
                                border={'2px solid #b7d44b'}
                                borderRadius={'10px'}
                                padding={'10px'}
                            >
                                <Text
                                    width={'30px'}
                                    height={'30px'}
                                    border={'1px solid #40414d'}
                                    borderRadius={'5px'}
                                    backgroundColor={'#40414d'}
                                    color={'#ffffff'}
                                    textAlign={'center'}
                                    fontWeight={500}
                                >
                                    {index + 1}
                                </Text>
                                {item.photo ? <Img src={item.photo} alt='料理手順写真' /> : <></>}
                                <Text fontSize={'20px'}>{item.procedule}</Text>
                            </Box>
                        </Box>
                    );
                })}
            </Flex>
        </>
    );
};

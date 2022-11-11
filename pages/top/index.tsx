import { NextPage } from 'next';
import Link from 'next/link';

import ReactPaginate from 'react-paginate';

import { Box, Flex, Img, Spacer, Text } from '@chakra-ui/react';

import styles from '../../styles/Top.module.scss';
import pcTitlePic from '../images/pc_top.png';
import spTitlePic from '../images/sp_top.png';
import subTitlePic from '../images/sub_title.jpg';
import rogoPic from '../images/cscpロゴ.png';
import { SectionTitle } from '../../components/SectionTitle';
import { GetAllFoods } from '../../lib/queries/getAllFoods';
import { Fragment, useRef, useState } from 'react';
import { usePvUpdateMutation } from '../../lib/mutations/mutationPv';

export { Top as default };

const Top: NextPage = () => {
    const { data, loading, error } = GetAllFoods();
    const { useUpdateByFoodId } = usePvUpdateMutation();
    const [offset, setOffset] = useState(0);
    const perPage = 6;
    const pagenateRef = useRef<HTMLDivElement>(null);
    const handlePageChange = (data: { [x: string]: any }) => {
        let page_number = data['selected'];
        setOffset(page_number * perPage);
        pagenateRef!.current!.scrollIntoView();
    };
    const OnClick = (id: number) => {
        useUpdateByFoodId(id).then(() => {
            window.location.href = `/recipe?foodId=${id}`;
        });
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <Box
                zIndex={-1}
                width={'100%'}
                height={'100vh'}
                position={'fixed'}
                top={0}
                left={0}
                bgRepeat={'no-repeat'}
                backgroundColor={'#fefbf7'}
                backgroundSize={'100%'}
                backgroundImage={{ base: spTitlePic.src, md: pcTitlePic.src }}
                marginBottom={'30px'}
            />
            <Box width={'100%'} backgroundColor={'#fefbf7'} paddingBottom={'30px'}>
                <Box
                    zIndex={2}
                    width={'100%'}
                    height={'100%'}
                    backgroundColor={'#fefbf7'}
                    marginTop={'100%'}
                    paddingBottom={{ base: '30px', sm: '40px', md: '100px' }}
                >
                    <Box
                        paddingTop={'100px'}
                        width={{ base: '100%', md: '90%', xl: '80%' }}
                        display={{ base: 'block', md: 'flex' }}
                        margin={{ md: '0 auto' }}
                    >
                        <Flex
                            justifyContent={{
                                base: 'space-between',
                                md: 'center',
                            }}
                            width={{ base: '50%', md: '100%' }}
                            margin={{
                                base: '0 auto',
                                sm: '5% auto 5% auto',
                                md: '5% 0 0 0',
                            }}
                        >
                            <Text
                                lineHeight={1}
                                height={'fit-content'}
                                borderRight={{
                                    base: '#f49f2b 3px solid',
                                    '2xl': '#f49f2b 5px solid',
                                }}
                                fontSize={{
                                    base: '40px',
                                    sm: '60px',
                                    md: '50px',
                                    lg: '60px',
                                    '2xl': '75px',
                                }}
                                fontWeight={'bold'}
                                fontFamily={'"游明朝","YuMincho",serif'}
                                display={'inline-block'}
                                verticalAlign={'middle'}
                                paddingRight={{
                                    base: '10px',
                                    md: '15px',
                                    lg: '20px',
                                }}
                                color={'#40414d'}
                                margin={{ '2xl': '0 20px' }}
                            >
                                今<br />
                                日<br />
                                の<br />
                                一<br />品
                            </Text>
                            <Text
                                lineHeight={1}
                                height={'fit-content'}
                                borderRight={{
                                    base: '#f49f2b 3px solid',
                                    '2xl': '#f49f2b 5px solid',
                                }}
                                fontSize={{
                                    base: '40px',
                                    sm: '60px',
                                    md: '50px',
                                    lg: '60px',
                                    '2xl': '75px',
                                }}
                                fontWeight={'bold'}
                                fontFamily={'"游明朝","YuMincho",serif'}
                                color={'#40414d'}
                                paddingRight={{
                                    base: '10px',
                                    md: '15px',
                                    lg: '20px',
                                }}
                                paddingLeft={{
                                    base: '10px',
                                    md: '15px',
                                    lg: '20px',
                                }}
                                margin={{ '2xl': '0 20px' }}
                            >
                                余<br />
                                り<br />
                                物<br />で
                            </Text>
                            <Text
                                lineHeight={1}
                                height={'fit-content'}
                                borderRight={{
                                    base: '#f49f2b 3px solid',
                                    '2xl': '#f49f2b 5px solid',
                                }}
                                fontSize={{
                                    base: '40px',
                                    sm: '60px',
                                    md: '50px',
                                    lg: '60px',
                                    '2xl': '75px',
                                }}
                                fontWeight={'bold'}
                                fontFamily={'"游明朝","YuMincho",serif'}
                                paddingRight={{
                                    base: '10px',
                                    md: '15px',
                                    lg: '20px',
                                }}
                                paddingLeft={{
                                    base: '10px',
                                    md: '15px',
                                    lg: '20px',
                                }}
                                color={'#40414d'}
                                margin={{ '2xl': '0 20px' }}
                            >
                                冷<br />
                                蔵<br />
                                庫<br />の
                            </Text>
                        </Flex>
                        <Spacer />
                        <Img
                            src={subTitlePic.src}
                            alt='サブタイトル画像'
                            maxWidth={{ base: '90%', md: '50%' }}
                            maxHeight={{ base: '90%', md: '50%' }}
                            margin={{ base: '50px auto', md: '0' }}
                        />
                    </Box>
                </Box>
                <SectionTitle title='CSCP' />
                <Text
                    width={{ base: '90%', md: '80%', lg: '60%' }}
                    margin={'0 auto'}
                    padding={'20px'}
                    fontSize={{ base: '15px', md: '20px' }}
                    color={'#40414d'}
                    lineHeight={{ base: 1.4, md: 1.8 }}
                    backgroundColor='white'
                >
                    この文章はダミーです。大きさ、量、行間、行間等を確認するために入れています。この文章はダミーです。大きさ、量、行間、行間等を確認するために入れています。この文章はダミーです。大きさ、量、行間、行間等を確認するために入れています。この文章はダミーです。大きさ、量、行間、行間等を確認するために入れています。この文章はダミーです。大きさ、量、行間、行間等を確認するために入れています。この文章はダミーです。大きさ、量、行間、行間等を確認するために入れています。この文章はダミーです。大きさ、量、行間、行間等を確認するために入れています。この文章はダミーです。大きさ、量、行間、行間等を確認するために入れています。
                </Text>
                <SectionTitle title='レシピ一覧' />
                <Flex
                    as={'div'}
                    ref={pagenateRef}
                    flexWrap={'wrap'}
                    width={'90%'}
                    margin={'0 auto'}
                >
                    {data &&
                        data.allFoods.slice(offset, offset + perPage).map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <Box
                                        width={{
                                            base: '90%',
                                            lg: 'calc(100% / 2)',
                                            xl: 'calc(100% / 3)',
                                        }}
                                        margin={{ base: '0 auto', xl: '0' }}
                                    >
                                        <Box
                                            width={'95%'}
                                            transition='0.8s all'
                                            border={'1px solid #ffffff'}
                                            borderRadius={'15px'}
                                            margin={'80px 15px 20px 15px'}
                                            padding={'20px'}
                                            backgroundColor={'white'}
                                            // backgroundColor={'#ffffff'}
                                            pointerEvents={'none'}
                                            _hover={{
                                                border: '2px solid #f49f2b',
                                            }}
                                        >
                                            <Text
                                                color={'#40414d'}
                                                fontWeight={100}
                                                opacity={0.7}
                                                textAlign={'right'}
                                            >
                                                閲覧数：{item.information.pv}
                                            </Text>
                                            {item.photo && (
                                                <Img
                                                    src={String(item.photo)}
                                                    alt='料理サムネイル'
                                                    maxWidth={'100%'}
                                                    width={{
                                                        base: '90%',
                                                        xl: '300px',
                                                    }}
                                                    height={{
                                                        base: '90%',
                                                        xl: '300px',
                                                    }}
                                                    margin={'0 auto'}
                                                    objectFit={'contain'}
                                                />
                                            )}
                                            <Text
                                                fontSize={{
                                                    base: '13px',
                                                    sm: '15px',
                                                    md: '30px',
                                                    lg: '20px',
                                                    xl: '23px',
                                                    '2xl': '30px',
                                                }}
                                                fontFamily={'"Hiragino Kaku Gothic ProN"'}
                                                fontWeight={600}
                                                color={'#ed7332'}
                                                position='relative'
                                                textAlign={'center'}
                                                borderBottom={'2px solid #ed7332'}
                                                width='90%'
                                                margin={'10px auto'}
                                                _after={{
                                                    content: '""',
                                                    display: 'inline-block',
                                                    width: '10px',
                                                    position: 'absolute',
                                                    bottom: '-6px',
                                                    right: '-6px',
                                                    height: '10px',
                                                    borderRadius: '15px',
                                                    backgroundColor: '#ed7332',
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                width={'95%'}
                                                margin={'20px auto'}
                                                color={'#40414d'}
                                                textAlign={'center'}
                                                fontSize={{
                                                    base: '8px',
                                                    sm: '10px',
                                                    md: '17px',
                                                    lg: '15px',
                                                    xl: '17px',
                                                }}
                                                fontWeight={300}
                                                fontFamily={'"Hiragino Kaku Gothic ProN"'}
                                            >
                                                {item.comment}
                                            </Text>
                                            <Box
                                                color={'#ffffff'}
                                                fontSize={'20px'}
                                                backgroundColor={'#40414d'}
                                                width={'50%'}
                                                margin={'10px auto'}
                                                textAlign={'center'}
                                                cursor={'pointer'}
                                                transition='all 0.5s'
                                                pointerEvents={'auto'}
                                                onClick={() => {
                                                    OnClick(item.id);
                                                }}
                                                _hover={{
                                                    transition: 'all 0.5s',
                                                    cursor: 'pointer',
                                                    boxShadow:
                                                        '0 3px 10px rgba(0, 0, 0, 0.8), 0 0 50px rgba(128, 128, 128, 0.1)',
                                                }}
                                            >
                                                MORE
                                            </Box>
                                        </Box>
                                    </Box>
                                </Fragment>
                            );
                        })}
                </Flex>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(data ? data.allFoods.length / perPage : 1)}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={10}
                    onPageChange={handlePageChange}
                    containerClassName={styles.pagination}
                    activeClassName={styles.active}
                    previousClassName={'pagination_previous'}
                    nextClassName={'pagination_next'}
                    disabledClassName={styles.pagination_disabled}
                />
                <Link href={'/post'}>
                    <Text
                        fontSize={'20px'}
                        as={'u'}
                        color={'#f49f2b'}
                        textAlign={'center'}
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        レシピ投稿はこちら
                    </Text>
                </Link>
            </Box>
            <Box backgroundColor={'#ffffff'}>
                <Box width={'100%'} height={'70px'} display={'flex'} alignItems={'center'}>
                    <Img
                        src={rogoPic.src}
                        alt='ロゴ画像'
                        maxWidth={'50%'}
                        maxHeight={'50%'}
                        margin={'0 auto'}
                    />
                </Box>
            </Box>
        </>
    );
};

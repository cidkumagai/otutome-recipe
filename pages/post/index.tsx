import {
    Alert,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Flex,
    FormLabel,
    Img,
    Input,
    Spacer,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { ChangeEvent, createRef, RefObject, use, useEffect, useRef, useState } from 'react';

import thumbnail from '../images/add_pic.png';
import { Header } from '../../components/Header';
import { HomeButton } from '../../components/HomeButton';
import { Footer } from '../../components/Footer';
import { AddFood } from '../../lib/mutations/mutationFood';

export { Recipe as default };

const NO_NAME_ALERT_TEXT = '料理名を入力してください！';
const NO_PHOTO_ALERT_TEXT = '料理完成写真を選択してください！';
const NO_COMMENT_ALERT_TEXT = '一言コメントを入力してください！';
const NO_INGREDIENT_ALERT_TEXT = '材料・分量を入力してください！';
const NO_RECIPE_ALERT_TEXT = '料理手順を入力してください！';

const AlertComponent = (props: { flag: boolean; text: string }) => {
    return (
        <>
            <Alert status='error' margin={'10px'} display={props.flag ? 'block' : 'none'}>
                <AlertIcon />
                <AlertTitle>{props.text}</AlertTitle>
            </Alert>
        </>
    );
};

const Recipe: NextPage = () => {
    const [postData, setPostData] = useState({
        name: '',
        photo: thumbnail.src,
        comment: '',
        recipe: [{ rank: 0, procedule: '' }],
        ingredient: [{ material: '', amount: '' }],
    });
    const { addFood, data, loading, error } = AddFood();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isNameAlert, setIsNameAlert] = useState(false);
    const [isPhotoAlert, setIsPhotoAlert] = useState(false);
    const [isCommentAlert, setIsCommentAlert] = useState(false);
    const [isRecipeAlert, setIsRecipeAlert] = useState(false);
    const [isIngredientAlert, setIsIngredientAlert] = useState(false);
    const ingredients: Array<JSX.Element> = [];
    const recipes: Array<JSX.Element> = [];
    const materialRefs = useRef<RefObject<HTMLInputElement>[]>([]);
    const amountRefs = useRef<RefObject<HTMLInputElement>[]>([]);
    const proceduleRefs = useRef<RefObject<HTMLInputElement>[]>([]);

    const [ingredientLength, setIngredientLength] = useState(4);
    const [recipeLength, setRecipeLength] = useState(4);

    let materialArray: Array<{ material: string; amount: string }> = [];
    let recipeArray: Array<{ rank: number; procedule: string }> = [];

    const onThumbnailInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length === 0 || !event.target.files?.[0].type.match('image.*')) {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                setPostData({ ...postData, photo: String(reader.result) });
            }
        };
        reader.readAsDataURL(event.target?.files[0]);
    };

    const onProceduleInput = () => {
        for (let index = 0; index < recipeLength; index++) {
            const recipeData = {
                rank: index + 1,
                procedule: proceduleRefs.current[index].current!.value,
            };
            recipeArray[index] = recipeData;
            setPostData({ ...postData, recipe: recipeArray });
        }
    };

    const onInputIngredient = () => {
        for (let index = 0; index < ingredientLength; index++) {
            const isAdd = (index: number) => {
                return (
                    materialRefs.current[index].current &&
                    amountRefs.current[index].current &&
                    materialRefs.current[index].current?.value &&
                    amountRefs.current[index].current?.value
                );
            };
            if (isAdd(index)) {
                const materials = {
                    material: materialRefs.current[index].current!.value,
                    amount: amountRefs.current[index].current!.value,
                };
                if (materials) {
                    materialArray[index] = materials;
                    setPostData({ ...postData, ingredient: materialArray });
                }
            }
        }
    };

    const postCheck = () => {
        return (
            postData.name !== '' &&
            postData.photo !== thumbnail.src &&
            postData.comment !== '' &&
            postData.recipe[0].rank !== 0 &&
            (postData.ingredient[0].amount !== '' || postData.ingredient[0].material !== '')
        );
    };

    const onClick = () => {
        if (postCheck()) {
            onOpen();
        } else {
            if (postData.name === '') {
                setIsNameAlert(true);
                setTimeout(function () {
                    setIsNameAlert(false);
                }, 5000);
            }
            if (postData.photo === thumbnail.src) {
                setIsPhotoAlert(true);
                setTimeout(function () {
                    setIsPhotoAlert(false);
                }, 5000);
            }
            if (postData.comment === '') {
                setIsCommentAlert(true);
                setTimeout(() => {
                    setIsCommentAlert(false);
                }, 5000);
            }
            if (postData.recipe[0].rank === 0) {
                setIsRecipeAlert(true);
                setTimeout(() => {
                    setIsRecipeAlert(false);
                }, 5000);
            }
            if (postData.ingredient[0].amount === '' || postData.ingredient[0].material === '') {
                setIsIngredientAlert(true);
                setTimeout(() => {
                    setIsIngredientAlert(false);
                }, 5000);
            }
        }
    };

    const postRecipe = () => {
        const { name, photo, comment } = postData;
        const recipe = postData.recipe
            .sort(function (a, b) {
                return a.rank - b.rank;
            })
            .map((item) => {
                return item.procedule;
            })
            .filter((e) => e !== '');
        const material = postData.ingredient.map((item) => {
            return item.material;
        });
        const amount = postData.ingredient.map((item) => {
            return item.amount;
        });
        // console.log(name, photo, comment, recipe, material, amount);
        addFood(name, photo, comment, recipe, material, amount);
    };

    for (let i = 0; i < ingredientLength; i++) {
        materialRefs.current[i] = createRef<HTMLInputElement>();
        amountRefs.current[i] = createRef<HTMLInputElement>();
        ingredients.push(
            <Flex key={i}>
                <Spacer />
                <Input
                    width={'45%'}
                    variant='flushed'
                    placeholder='例：米'
                    ref={materialRefs.current[i]}
                    onChange={() => onInputIngredient()}
                />
                <Spacer />
                <Input
                    width={'45%'}
                    variant='flushed'
                    placeholder='例：３合'
                    ref={amountRefs.current[i]}
                    onChange={() => onInputIngredient()}
                />
                <Spacer />
            </Flex>,
        );
    }

    for (let i = 0; i < recipeLength; i++) {
        proceduleRefs.current[i] = createRef<HTMLInputElement>();
        recipeArray.push({ rank: i + 1, procedule: '' });
        recipes.push(
            <Box
                key={i}
                width={{
                    base: '90%',
                    lg: 'calc(100% / 2)',
                    xl: 'calc(100% / 3)',
                }}
                margin={{ base: '0 auto', xl: '0' }}
            >
                <Box
                    width={'95%'}
                    border={'2px solid #f49f2b'}
                    borderRadius={'10px'}
                    padding='10px'
                    margin={'10px 0'}
                >
                    <Text
                        width=' 30px'
                        height='30px'
                        border='1px solid #40414d'
                        borderRadius='5px'
                        backgroundColor='#40414d'
                        color='#ffffff'
                        textAlign='center'
                        fontWeight='500'
                    >
                        {i + 1}
                    </Text>
                    <Input
                        width={'100%'}
                        variant='flushed'
                        placeholder='例：お米を研ぎます'
                        ref={proceduleRefs.current[i]}
                        onChange={() => onProceduleInput()}
                    />
                </Box>
            </Box>,
        );
    }
    return (
        <>
            <HomeButton />
            <Header />
            <Box width={'100%'} backgroundColor={'#fefbf7'}>
                <Box padding={'30px 0'}>
                    <Input
                        width={{ base: '90%', xl: '45%' }}
                        margin={'0px auto'}
                        display={'flex'}
                        justifyContent={'center'}
                        placeholder='料理名'
                        backgroundColor='#ffffff'
                        onChange={(e) => setPostData({ ...postData, name: e.target.value })}
                    />
                </Box>
                <Flex display={{ base: 'block', xl: 'flex' }}>
                    <Spacer />
                    <Box width={{ base: '90%', xl: '50%' }} margin={'0 auto'}>
                        <Text
                            color={'#40414d'}
                            fontSize={'20px'}
                            textAlign={'center'}
                            fontWeight={500}
                            fontFamily={'YuMincho'}
                        >
                            料理完成写真
                        </Text>
                        <FormLabel
                            cursor='pointer'
                            color={'#4c4d58'}
                            display={'flex'}
                            justifyContent={'center'}
                            width={{ base: '90%', xl: '600px' }}
                            height={{ base: '90%', xl: '600px' }}
                            position={'relative'}
                            margin={'0 auto'}
                        >
                            <Img
                                src={postData.photo}
                                alt={'test'}
                                maxWidth={{ base: '100%', xl: '600px' }}
                                objectFit={'contain'}
                            />
                            <Input
                                type={'file'}
                                name={'file1'}
                                multiple
                                accept='image/*'
                                onChange={(e) => onThumbnailInput(e)}
                                display={'none'}
                            />
                        </FormLabel>
                    </Box>
                    <Spacer />
                    <Box width={{ base: '90%', xl: '45%' }} margin={'0 auto'}>
                        <Input
                            variant='flushed'
                            placeholder='一言コメントを入力'
                            onChange={(e) => setPostData({ ...postData, comment: e.target.value })}
                            marginTop={{ base: '20px', xl: '0' }}
                        />
                        <Text
                            fontSize={'20px'}
                            textAlign={'center'}
                            margin={'30px'}
                            fontFamily={'YuMincho'}
                        >
                            材料・分量入力
                        </Text>
                        {ingredients}
                        <Box marginTop={'30px'} display={'flex'} justifyContent={'end'}>
                            <Text
                                width={'40px'}
                                height={'40px'}
                                backgroundColor={'#f49f2b'}
                                borderRadius={'full'}
                                fontSize={'30px'}
                                fontWeight={600}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                color={'#ffffff'}
                                onClick={() => setIngredientLength(ingredientLength + 1)}
                                cursor={'pointer'}
                            >
                                ＋
                            </Text>
                        </Box>
                    </Box>
                    <Spacer />
                </Flex>
                <Box width={'95%'} margin={'30px auto'} paddingBottom={'30px'}>
                    <Text
                        fontSize={'20px'}
                        color='#40414d'
                        fontFamily={'YuMincho'}
                        marginBottom={'20px'}
                    >
                        調理手順入力
                    </Text>
                    <Flex flexWrap={'wrap'}>
                        {recipes}
                        <Box margin={'30px 30px 0 0'}>
                            <Text
                                width={'40px'}
                                height={'40px'}
                                backgroundColor={'#f49f2b'}
                                borderRadius={'full'}
                                fontSize={'30px'}
                                fontWeight={600}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                color={'#ffffff'}
                                onClick={() => setRecipeLength(recipeLength + 1)}
                                cursor={'pointer'}
                            >
                                ＋
                            </Text>
                        </Box>
                    </Flex>
                </Box>
                <Button
                    backgroundColor={'#40414d'}
                    color={'#ffffff'}
                    width={'200px'}
                    height={'50px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    margin={'0 auto'}
                    transition={'all 0.5s'}
                    _hover={{
                        boxShadow: '0px 0px 10px #666',
                        transition: 'all 0.5s',
                    }}
                    onClick={() => onClick()}
                >
                    レシピ登録
                </Button>
            </Box>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={buttonRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            レシピを登録
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            入力されたレシピ情報を登録します。よろしいですか？
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={buttonRef} onClick={onClose}>
                                キャンセル
                            </Button>
                            <Button
                                colorScheme='blue'
                                onClick={() => {
                                    onClose();
                                    postRecipe();
                                }}
                                ml={3}
                            >
                                登録
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Box position={'fixed'} bottom={'3%'} right={'3%'}>
                <AlertComponent flag={isNameAlert} text={NO_NAME_ALERT_TEXT} />
                <AlertComponent flag={isPhotoAlert} text={NO_PHOTO_ALERT_TEXT} />
                <AlertComponent flag={isCommentAlert} text={NO_COMMENT_ALERT_TEXT} />
                <AlertComponent flag={isIngredientAlert} text={NO_INGREDIENT_ALERT_TEXT} />
                <AlertComponent flag={isRecipeAlert} text={NO_RECIPE_ALERT_TEXT} />
            </Box>
            <Footer />
        </>
    );
};

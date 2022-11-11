import { Text } from '@chakra-ui/react';

export const SectionTitle = (props: {title: string}) => {
    return (
        <Text
            width={{ base: '70%', md: '40%' }}
            color={'#40414d'}
            margin={'50px auto'}
            fontSize={{ base: '40px', md: '45px', xl: '60px' }}
            fontWeight={600}
            fontFamily={'"游明朝","YuMincho",serif'}
            position='relative'
            textAlign={'center'}
            borderBottom={'3px solid #f49f2b'}
            _after={{
                content: '""',
                display: 'inline-block',
                width: '20px',
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                height: '20px',
                borderRadius: '15px',
                backgroundColor: '#f49f2b',
            }}
        >
            {props.title}
        </Text>
    );
};

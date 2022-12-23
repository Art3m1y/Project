import React from 'react'
import { Container, Typography, Grid, Box, Button } from '@mui/material'
import { CartItem } from '../cartItem/CartItem'
import { useAppSelector} from '../../redux/hooks'

export const Cart: React.FC<{}> = () => {

    let totalCost = useAppSelector(state => state.cart.totalCost)


    return (
        <Container >
            <Typography gutterBottom variant='h4'>Корзина</Typography>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <CartItem />
                    <CartItem />
                </Grid>
                <Grid item xs={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                        <Typography gutterBottom variant="h5" component="span" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                            Итого:
                        </Typography>
                        <Typography gutterBottom variant="h5" component="span" sx={{ fontWeight: 'bold' }}>
                            {totalCost} ₽
                        </Typography>
                    </Box>
                    <Button variant='contained' fullWidth>Заказать</Button>
                </Grid>
            </Grid>


        </Container>
    )
}
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Product from './Product';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(2),
    }
}))

function Feed() {
    const classes = useStyles({  })
    const [products, setProducts] = useState([]);

    //get the products details
    useEffect(() => {
        const getProducts = async ()=>{
          await axios({
            method: "GET",
            url: "http://localhost:4000/api/v1/products",
          })
          .then((res) => {
            setProducts(res.data.data)
            
          })
          .catch((err) => {
            console.log(err)
          })
          
        }
        getProducts()
        
      }, [products ])

      
    

    return (
        <Container className={classes.container}>
            <Grid container spacing={4}>
                {products.map((productValue) => (
                    <Grid item sm={12} md={6} lg={4}> 
                        <Product product={productValue}/>
                    </Grid>
                ))}
                {products.map((productValue) => (
                    <Grid item sm={12} md={6} lg={4}> 
                        <Product product={productValue}/>
                    </Grid>
                ))}
            </Grid>

            {/* <Typography>hello</Typography> */}
        </Container>
    )
}

export default Feed

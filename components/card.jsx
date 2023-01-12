// card component

// styles
import cardStyles from "../styles/components/card.module.css";


import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 400, minHeight: 350  }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/vercel.svg"
          alt="billbook"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            BillBook
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Billbook is an inventory management web-app. By using billbook you can manage your sales-purchase transactions and keep record of your stock.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" color="primary">
          Details
        </Button>
      </CardActions>
    </Card>
  );
}

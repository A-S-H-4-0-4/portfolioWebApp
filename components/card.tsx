// card component

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


interface CardData{
  id:string,
  title:string,
  description:string,
  thumbanailUrl:string

}

export default function MultiActionAreaCard(cardData:CardData) {
  return (
    <Card sx={{ maxWidth: 400, minHeight: 350,marginLeft:"30px",marginTop:"30px",  }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/vercel.svg"
          alt="billbook"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {cardData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardData.description}
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

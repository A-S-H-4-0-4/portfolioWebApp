// card component

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useRouter } from 'next/router'

// nextLink
import Link from 'next/link'


interface CardData {
  id: string,
  title: string,
  description: string,
  thumbanailUrl: string
  date: string
  backgroundColor: string
  textColor: string
  headColor: string
  update: boolean
  projectUrl: string
}
export default function MultiActionAreaCard(cardData: CardData) {
  const date = new Date(cardData.date);
  const backgroundColor = cardData.backgroundColor
  const textColor = cardData.textColor
  const headColor = cardData.headColor
  const router = useRouter()

  return (
    <Card sx={{ width: "400px", minHeight: "auto", marginLeft: "30px", marginTop: "30px", backgroundColor: { backgroundColor } }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={cardData.thumbanailUrl}
          alt="/images/banner.jpg"
          sx={{ backgroundColor: "white !important" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" color={headColor}  >
            {cardData.title}
          </Typography>
          <Typography variant="body2" color={textColor} >
            {cardData.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "flex", justifyContent: "space-between", }}>
        <Button size="medium" color="primary" onClick={() => {
          router.push({
            pathname: '/detail',
            query: { id: cardData.id }
          }, '/detail')
        }} >
          Details
        </Button>
        {cardData.projectUrl && <Button size="medium" color="primary" onClick={() => {
         <Link href={cardData.projectUrl}/>
        }} >
          open Site
        </Button>}
        {cardData.update && <Button size="medium" color="primary" onClick={() => {
          router.push({
            pathname: '/projectScreen',
            query: {
              name: cardData.title,
              id: cardData.id
            }
          }, '/projectScreen')
        }} >
          Update
        </Button>}
        <Typography variant="body2" color={textColor} >
          {date.toLocaleDateString()}
        </Typography>
      </CardActions>
    </Card>
  );
}

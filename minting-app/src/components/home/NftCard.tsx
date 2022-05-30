import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React from 'react';

interface NftCardProps {
  imgUrl: string;
  date: string;
  location: string;
  description: string;
}

const NftCard = ({ imgUrl, date, location, description }: NftCardProps) => {
  console.log('imgrUrl', imgUrl);
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader title='Your NFT Meetup NFT' subheader={`${location} - ${date}`} />
      <CardMedia component='img' height='100%' image={imgUrl} alt='NFT' />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NftCard;

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Metadata } from '../../types/Metadata';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const NftCard = ({ name, image, date, location, description }: Metadata) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ maxWidth: 500, borderRadius: 5 }}>
      <CardMedia component='img' height='100%' image={image} alt='NFT' />
      <CardHeader
        title={name}
        subheader={`${location}, ${date}`}
        action={
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        }
      />
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default NftCard;

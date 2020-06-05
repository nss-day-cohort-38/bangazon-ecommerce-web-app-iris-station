// Made by Kurt - then copied, pasted and edited marginally by Andrew - this is just a card for the products on the My Products page using whatever the heck Kurt did

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "./homecss.css"
import { Button, Image } from "semantic-ui-react"

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

export default function MyListCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    return (
      <Card className={classes.root} id="home-card">
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.product.title}
          subheader={props.product.created_at.split("T")[0]}
        />
        <CardMedia
          className={classes.media}
          image={props.product.image_path === null 
            ? `${process.env.PUBLIC_URL}/noimage.png` 
            : props.product.image_path
          }
          title={props.product.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div">
            <p className="text">{props.product.description}</p>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <p className="text"> Stock: {props.product.quantity}</p>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            <p className="text"> Amount Sold: {props.product.amount_sold}</p>
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="prod-card-button-container">
          <Button basic color='red' onClick={()=> props.deleteThisProduct(props.product.id)}>
            Remove
          </Button>
            <button className="ui button" onClick={()=> props.history.push(`/products/${props.product.id}`)}>See More</button>
        </CardActions>
      </Card>
    );
  }

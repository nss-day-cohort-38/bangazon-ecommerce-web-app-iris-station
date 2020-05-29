// Made by Kurt this is just a card for the products on the home page  using semantic react

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./homecss.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function HomeListCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const token = sessionStorage.getItem("token");

  if (props.product.id % 5 === 0) {
    //this returns a different card to break up the same cards from displaying to the dom (same information but adds price)
    return (
      <div className="custom-card">
        <div className="cc-left">
          <div
            className="cc-img"
            style={{
              backgroundImage: `url(${props.product.image_path})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
          </div>
        </div>

        <div className="cc-right">
          <div className="cc-title">{props.product.title}</div>
          <div className="cc-price">Only ${props.product.price}</div>
          <p className="text">{props.product.description}</p>
          <div className="cc-prod-buttons">
            <IconButton
              aria-label="add to card"
              onClick={() => props.handleAddToCard(props.product.id)}
            >
              <i className="plus icon"></i>
            </IconButton>
            <button
              className="ui button"
              onClick={() =>
                props.history.push(`/products/${props.product.id}`)
              }
            >
              See More
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Card className={classes.root} id="home-card">
        <CardHeader
          //   avatar={
          //     <Avatar aria-label="recipe" className={classes.avatar}>
          //       R
          //     </Avatar>
          //   }
          
          title={props.product.title}
          subheader={props.product.created_at}
        />
        <CardMedia
          className={classes.media}
          image={props.product.image_path}
          title={props.product.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="div">
            <p className="text">{props.product.description}</p>
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="prod-card-button-container">
          {/* <IconButton aria-label="add to wishlist">
            <FavoriteIcon />
          </IconButton> */}
          <IconButton
            aria-label="add to card"
            onClick={() => props.handleAddToCard(props.product.id)}
          >
            <i className="plus icon"></i>
          </IconButton>
          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <button
            className="ui button"
            onClick={() => props.history.push(`/products/${props.product.id}`)}
          >
            See More
          </button>
        </CardActions>
      </Card>
    );
  }
}

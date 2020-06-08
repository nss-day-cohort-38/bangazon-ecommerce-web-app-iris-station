// Made by Kurt this is just a card for the products on the home page  using semantic react

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { CartSnackbar } from "../../components";

import { Link } from "react-router-dom";

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
  const [submitMessage, setSubmitMessage] = useState("");

  return (
    <>
      {props.addMessage && (
        <CartSnackbar
          negative={props.addMessage !== "Added to Cart"}
          positive={props.addMessage === "Added to Cart"}
          message={
            props.addMessage === "Added to Cart"
              ? `"${props.product.title}" was added to your cart`
              : props.addMessage
          }
        />
      )}
      {props.product.id % 5 === 0 ? (
        <div className="custom-card">
          <div className="cc-left">
            <div
              className="cc-img"
              style={{
                // If there is no image, then fill it with a dummy image
                backgroundImage: `url(${
                  props.product.image_path === null
                    ? `${process.env.PUBLIC_URL}/noimage.png` 
                    : props.product.image_path
                })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>

          <div className="cc-right">
            <div className="cc-title">{props.product.title}</div>
            <div className="cc-price">Only ${props.product.price}</div>
            <p className="text">Stock: {props.product.quantity}</p>
            <p className="text">{props.product.description}</p>
            

            <div className="cc-prod-buttons">
              <IconButton
                aria-label="add to card"
                onClick={() => props.handleAddToCard(props.product.id)}
              >
                <i className="plus icon"></i>
              </IconButton>

              <Link to={`/products/${props.product.id}`}>
                <button className="ui button">See More</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Card className={classes.root} id="home-card">
          <CardHeader
            title={props.product.title}
            subheader={props.product.created_at.split("T")[0]}
          />
          <CardMedia
            className={classes.media}
            image={
              props.product.image_path === null
                ? `${process.env.PUBLIC_URL}/noimage.png` 
                : props.product.image_path
            }
            title={props.product.title}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="div">
            <p className="text">Stock: {props.product.quantity}</p>
              <p className="text">{props.product.description}</p>
            </Typography>
          </CardContent>
          <CardActions disableSpacing className="prod-card-button-container">
            <IconButton
              aria-label="add to card"
              onClick={() => props.handleAddToCard(props.product.id)}
            >
              <i className="plus icon"></i>
            </IconButton>
            <Link to={`/products/${props.product.id}`}>
              <button className="ui button">See More</button>
            </Link>
          </CardActions>
        </Card>
      )}
    </>
  );
}
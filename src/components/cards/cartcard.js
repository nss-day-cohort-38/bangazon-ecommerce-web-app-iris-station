//Made by Kurt Krafft
import React from 'react'
import { Button, Card, Image } from "semantic-ui-react"

const CartCard = props => {
//this will just return the card item for products in the users cart
    // let image = props.product.image_path === null 
    //   ? "https://via.placeholder.com/100" 
    //   : `${props.product.image_path}`

    return(
        <Card className="ccard">
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          //if the image is null use a default image else use the user selected image
          src={props.product.product.image_path === null 
              ? "https://via.placeholder.com/100" 
              : `${props.product.product.image_path}`}
        />
        <Card.Header>{props.product.product.title}</Card.Header>
        <Card.Description>
        <p maxLength="150">{props.product.product.description}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red' onClick={()=> props.deleteProductFromOrder(props.product.id)}>
            Remove
          </Button>
        </div>
      </Card.Content>
    </Card>
    )
}
export default CartCard
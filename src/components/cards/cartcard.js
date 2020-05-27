import React from 'react'
import { Button, Card, Image } from "semantic-ui-react"

const CartCard = props => {


    return(
        <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={props.product.product.image_path}
        />
        <Card.Header>{props.product.product.title}</Card.Header>
        <Card.Description>
        <p maxlength="150">{props.product.product.description}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Add Another
          </Button>
          <Button basic color='red'>
            Remove
          </Button>
        </div>
      </Card.Content>
    </Card>
    )
}
export default CartCard
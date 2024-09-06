import React, { FC } from 'react'
import { item } from '../types/todo'


interface ItemCardProps extends React.HTMLAttributes<HTMLParagraphElement> {
    item: item
    innerRef?: React.Ref<HTMLParagraphElement>
}

const ItemCard: FC<ItemCardProps> = ({item, innerRef, ...props}) => {
  return (
    <section>
        <p key={item.id} ref={innerRef} {...props}>{item.title}</p>
    </section>
  )
}

export default ItemCard
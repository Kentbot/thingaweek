import React from 'react'

type Props = {
  onCategoryCreate: () => void
}

export function CategoryCreator({ onCategoryCreate }: Props) {
  return (
    <>
      <input id='name-input' type='text' placeholder='name' />
      <input id='budget-amt-input' type='text' placeholder='0' />
      <button onClick={() => console.log('saving category')}>Save</button>
    </>
  )
}
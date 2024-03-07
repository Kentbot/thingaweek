'use client'
import React from 'react'

import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from '@components/general/dropdown/Dropdown';

export default function Budget() {
  return (
    <div className="budget">
      <div>
        <FontAwesomeIcon icon={faScrewdriverWrench} size={'3x'} />
        This page requires some love and attention
      </div>
      <Dropdown
        onSelect={(value) => {  }}
        options={[
          { value: 'Val1', display: 'Value 1' },
          { value: 'Val2', display: 'Value 2' },
          { value: 'Val3', display: 'Value 3' },
          { value: 'Val4', display: 'Value 4', group: 'Group A' },
          { value: 'Val5', display: 'Value 5', group: 'Group A' },
          { value: 'Val6', display: 'Value 6', group: 'Group A' },
          { value: 'Val7', display: 'Value 7', group: 'Group A' },
          { value: 'Val8', display: 'Value 8', group: 'Group B' },
          { value: 'Val9', display: 'Value 9', group: 'Group B' },
          { value: 'Val10', display: 'Value 10', group: 'Group C' },
        ]}
      />
    </div>
  )
}
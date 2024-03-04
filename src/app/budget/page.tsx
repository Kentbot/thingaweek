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
        onSelect={(v) => console.log('selected', v)}
        options={
          [
            { value: 'value 1', display: 'Value #1' },
            { value: 'value 2', display: 'Value #2' },
            { value: 'value 3', display: 'Value #3' },
            { value: 'value 4', display: 'Value #4' },
            { value: 'value 5', display: 'Value #5' },
            { value: 'value 6', display: 'Value #6' },
            { value: 'value 7', display: 'Value #7' },
            { value: 'value 8', display: 'Value #8' },
            { value: 'value 9', display: 'Value #9' },
          ]
        }
      />
    </div>
  )
}
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
    </div>
  )
}
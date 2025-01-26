import React from 'react'
import { TabNavigation } from './navegation/TabNavigation'

export function Tab({route }) {
  const { user_id } = route.params || {};
  return (
    <TabNavigation route={{ params: { user_id } }} />
  )
}
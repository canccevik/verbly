import React from 'react'

import { List } from '@/types'

import { Card, CardContent } from './ui/card'
import Icon from './icon'

interface ListCardProps {
  list: List
}

export default function ListCard({ list }: ListCardProps) {
  return (
    <Card className="px-2 hover:bg-zinc-100">
      <CardContent className="flex justify-between items-center py-10">
        <div className="flex flex-col">
          <h3 className="text-xl font-medium">{list.name}</h3>
          <p className="text-lg mt-2">
            <span className="font-medium">{list.words.length} &nbsp;</span>
            <span>word{list.words.length > 1 && 's'}</span>
          </p>
        </div>

        <Icon name={list.icon} size={60} />
      </CardContent>
    </Card>
  )
}

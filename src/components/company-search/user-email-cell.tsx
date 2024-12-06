'use client'

import { PeopleModel } from '@/hooks/use-company-search'
import React from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PropsModel {
  request: (id: string) => void
  people: PeopleModel
  loading: boolean
  disabled: boolean
}

const UserEmailCell: React.FC<PropsModel> = ({ request, people, disabled, loading }) => {
  const requestEmail = () => {
    request(people.id ?? '')
  }

  return (
    <div>
      {people.email?.includes('not_unlocked') ? (
        <Button disabled={disabled} className="text-sm font-semibold relative" onClick={requestEmail}>
          {loading ? <Loader2 className="animate-spin absolute" /> : <></>}
          <div className={` ${loading ? 'opacity-0' : ''}`}> Request</div>
        </Button>
      ) : (
        <div className="text-sm">{people.email}</div>
      )}
    </div>
  )
}

export default UserEmailCell

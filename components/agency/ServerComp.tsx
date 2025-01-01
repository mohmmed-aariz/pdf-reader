import { NEXT_AUTH } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import React from 'react'

const ServerComp = async () => {
    const session = await getServerSession(NEXT_AUTH);
    console.log(session);
  return (
    <div>ServerComp
        <div>{session}</div>
    </div>
  )
}

export default ServerComp

/*
session getting called
{
  user: {
    name: 'aariz2',
    email: 'aariz2@gmail.com',
    image: undefined,
    role: 'USER'
  }
}
*/
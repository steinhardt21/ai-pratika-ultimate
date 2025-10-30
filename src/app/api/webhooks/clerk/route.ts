import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { fetchMutation } from "convex/nextjs";

import { api } from '@/../convex/_generated/api'

const CLERK_TYPE_USER_CREATED = 'user.created'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    const { id } = evt.data
    const eventType = evt.type

    if (eventType === CLERK_TYPE_USER_CREATED) {
      await fetchMutation(api.user.createUser, {
        clerkId: id!,
        email: evt.data.email_addresses[0]?.email_address,
        firstName: evt.data.first_name ?? '',
        lastName: evt.data.last_name ?? '',
      })
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import { useState } from 'react'
import { Input } from './ui/input'

export function EmptyScreen() {
  const [googleUrl, setGoogleUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [completion, setCompletion] = useState("");
  const handleSubmit = async () => {
    const response = await fetch("http://localhost:3000/generate",
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ prompt })
      }
    )
    const responseJSON = await response.json()
    setCompletion(responseJSON.generatedText)
  }
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Ark!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This is a smart chat interface for your calendar to make organizing your life 
          a lot easier.
          <br />
          <br />
          <ExternalLink href="https://sipb.mit.edu/">Built by and for MIT students :)</ExternalLink>
        </p>
        <br />
        <p className="leading-normal text-muted-foreground">
          Enter your Google Calendar url to get started. (To do so, you can go to your Google Calendar page, 
          click on settings, click on the calendar you want to embed, go to the "integrate calendar" section, 
          and get the public url for the calendar.)
          <br />
          <br />
          {googleUrl.length > 0 ?
            <iframe
              src={googleUrl}
              width="800"
              height="600"
              scrolling="no" /> :
            completion.length > 0 ?
            <p>{completion}</p>
            :
            <div><input
              value={googleUrl}
              onChange={
                (e) => setGoogleUrl(e.target.value)
              }
            />
            <input
              value={prompt}
              onChange={
                (e) => setPrompt(e.target.value)
              }
            />
            <button type="submit" onClick={handleSubmit}>generate</button>
            </div>
          }
         </p>
      </div>
    </div>
  )
}

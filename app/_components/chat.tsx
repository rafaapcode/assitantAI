"use client";
import { AudioLines, Check, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { talk } from "@/lib/ai/language";

export function Chat() {
  const [open, setOpen] = useState(false)
  const [awaitingLLMResponse, setAwaitingLLMResponse] = useState<boolean>(false);

  const [messages, setMessages] = useState([
    {
      role: "agent",
      content: "Olá, o que deseja aprender hoje ?",
      toolbox: true,
    }
  ])
  const [input, setInput] = useState("")
  const inputLength = input.trim().length

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Assis</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
                {
                  message.toolbox && (
                    <div className="border-t-[0.3px] border-slate-300 flex flex-row justify-end">
                      <Button size={"icon"} variant={"ghost"} className="w-6 h-6 pt-2 hover:bg-transparent hover:text-cyan-700">
                        <AudioLines />
                      </Button>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              if (inputLength === 0) return;
              setAwaitingLLMResponse(true);
              setMessages((prev) => {
                return [
                  ...prev,
                  {
                    role: "user",
                    content: input,
                    toolbox: false
                  },
                ]
              });
              setInput("");
              const response = await talk(input);
              setMessages((prev) => {
                return [
                  ...prev,
                  {
                    role: "agent",
                    content: response,
                    toolbox: true
                  }
                ]
              });
              setAwaitingLLMResponse(false);
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Digite o que deseja aprender..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event: any) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={awaitingLLMResponse}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}
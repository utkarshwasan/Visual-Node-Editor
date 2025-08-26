"use client"

import { BaseNode } from "./BaseNode"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ApiNodeProps {
  data: {
    label: string
    url?: string
    method?: string
    headers?: string
    body?: string
  }
}

export function ApiNode({ data }: ApiNodeProps) {
  return (
    <BaseNode data={data} inputs={["url", "body"]} outputs={["response", "error"]} className="min-w-[250px]">
      <div className="space-y-2">
        <Label htmlFor="method" className="text-xs text-muted-foreground">
          Method
        </Label>
        <Select value={data.method || "GET"}>
          <SelectTrigger className="text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="url" className="text-xs text-muted-foreground">
          URL
        </Label>
        <Input
          id="url"
          value={data.url || "{{endpoint}}"}
          placeholder="https://api.example.com/{{path}}"
          className="text-sm"
          readOnly
        />
        <Label htmlFor="body" className="text-xs text-muted-foreground">
          Request Body
        </Label>
        <Textarea
          id="body"
          value={data.body || ""}
          placeholder="JSON body with {{variables}}"
          className="text-sm min-h-[60px] resize-none"
          readOnly
        />
      </div>
    </BaseNode>
  )
}

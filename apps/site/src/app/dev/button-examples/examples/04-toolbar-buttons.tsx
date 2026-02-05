'use client'
import { useState } from 'react'
import { Group, Divider, Select } from 'ui-lab-components'
import { Bold, Italic, Underline, Strikethrough, Link as LinkIcon, List, ListOrdered, Image, Quote, MoreHorizontal } from 'lucide-react'

export const metadata = {
  title: 'Formatting Toolbar',
  description: 'Comprehensive text formatting toolbar with dropdown text style selector, text formatting buttons, list options, media insertion, and additional features. Modern design pattern for rich text editors.'
}

export default function Example() {
  const [textStyle, setTextStyle] = useState<string | number | null>('normal')

  return (
    <div className="p-4 space-y-4">
      {/* <div className="inline-flex items-center bg-background-900 rounded-lg p-1"> */}
      <Group orientation="horizontal" spacing="sm">
        <Group.Select selectedKey={textStyle} onSelectionChange={setTextStyle}>
          <Select.Trigger className='w-34 py-2'>
            <Select.Value placeholder="Text Style" />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Item value="normal" textValue="Normal">Normal</Select.Item>
              <Select.Item value="h1" textValue="Heading 1">Heading 1</Select.Item>
              <Select.Item value="h2" textValue="Heading 2">Heading 2</Select.Item>
              <Select.Item value="quote" textValue="Quote">Quote</Select.Item>
              <Select.Item value="code" textValue="Code">Code</Select.Item>
            </Select.List>
          </Select.Content>
        </Group.Select>

        <Divider orientation='vertical' />

        <Group.Button title="Bold">
          <Bold size={16} />
        </Group.Button>

        <Divider orientation='vertical' />

        <Group.Button title="Italic">
          <Italic size={16} />
        </Group.Button>

        <Divider orientation='vertical' />

        <Group.Button title="More Options">
          <MoreHorizontal size={16} />
        </Group.Button>


        <Group.Button title="Underline">
          <Underline size={16} />
        </Group.Button>
        <Group.Button title="Strikethrough">
          <Strikethrough size={16} />
        </Group.Button>

        <Group.Button title="Bullet List">
          <List size={16} />
        </Group.Button>
        <Group.Button title="Numbered List">
          <ListOrdered size={16} />
        </Group.Button>


        <Group.Button title="Insert Link">
          <LinkIcon size={16} />
        </Group.Button>
        <Group.Button title="Insert Image">
          <Image size={16} />
        </Group.Button>


        <Group.Button title="Block Quote">
          <Quote size={16} />
        </Group.Button>
      </Group>
      {/* </div> */}
    </div>
  )
}

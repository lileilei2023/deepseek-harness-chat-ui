import type { WorkspaceId } from '@deepseek-ai/dsh-api-workspace-controller/client'
import type { SessionId } from '@deepseek-ai/dsh-session/types'

export interface DSChatSidebarSlotOwner {
  readonly view: 'chats' | 'contacts' | 'automations'
  readonly workspaceId?: WorkspaceId
}

export interface DSChatRoomSlotOwner {
  readonly roomId: string
  readonly sessionId?: SessionId
}

export interface DSChatComposerSlotOwner extends DSChatRoomSlotOwner {
  readonly coordinatorId?: string
}

export interface DSChatMessageArtifactOwner extends DSChatRoomSlotOwner {
  readonly eventId: string
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface SlotMap {
    'ds-chat.sidebar.before-rooms': { kind: 'list'; scope: 'root'; owner: DSChatSidebarSlotOwner }
    'ds-chat.sidebar.after-rooms': { kind: 'list'; scope: 'root'; owner: DSChatSidebarSlotOwner }
    'ds-chat.room.header.actions': { kind: 'list'; scope: 'root'; owner: DSChatRoomSlotOwner }
    'ds-chat.room.drawer': { kind: 'list'; scope: 'root'; owner: DSChatRoomSlotOwner }
    'ds-chat.composer.before': { kind: 'list'; scope: 'root'; owner: DSChatComposerSlotOwner }
    'ds-chat.composer.actions': { kind: 'list'; scope: 'root'; owner: DSChatComposerSlotOwner }
    'ds-chat.message.artifact': { kind: 'list'; scope: 'root'; owner: DSChatMessageArtifactOwner }
    'ds-chat.settings.section': { kind: 'list'; scope: 'root'; owner: DSChatSidebarSlotOwner }
  }
}

export const DS_CHAT_SHELL_CHILDREN = {
  'ds-chat.sidebar.before-rooms': { kind: 'list', scope: 'root' },
  'ds-chat.sidebar.after-rooms': { kind: 'list', scope: 'root' },
  'ds-chat.room.header.actions': { kind: 'list', scope: 'root' },
  'ds-chat.room.drawer': { kind: 'list', scope: 'root' },
  'ds-chat.composer.before': { kind: 'list', scope: 'root' },
  'ds-chat.composer.actions': { kind: 'list', scope: 'root' },
  'ds-chat.message.artifact': { kind: 'list', scope: 'root' },
  'ds-chat.settings.section': { kind: 'list', scope: 'root' },
} as const

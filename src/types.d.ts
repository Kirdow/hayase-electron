interface SessionMetadata {
  title: string
  description: string
  image: string
}

interface AuthResponse {
  access_token: string
  expires_in: string // seconds
  token_type: 'Bearer'
}

export interface TorrentFile {
  name: string
  hash: string
  type: string
  size: number
  path: string
  url: string
  id: number
}

export interface Attachment {
  filename: string
  mimetype: string
  id: number
  url: string
}

export interface TorrentInfo {
  peers: number
  progress: number
  down: number
  up: number
  name: string
  hash: string
  seeders: number
  leechers: number
  size: number
  downloaded: number
  eta: number
}

export interface TorrentSettings {
  torrentPersist: boolean
  torrentDHT: boolean
  torrentStreamedDownload: boolean
  torrentSpeed: number
  maxConns: number
  torrentPort: number
  dhtPort: number
  torrentPeX: boolean
}

export interface Native {
  authAL: (url: string) => Promise<AuthResponse>
  restart: () => Promise<void>
  openURL: (url: string) => Promise<void>
  share: Navigator['share']
  minimise: () => Promise<void>
  maximise: () => Promise<void>
  focus: () => Promise<void>
  close: () => Promise<void>
  selectPlayer: () => Promise<string>
  selectDownload: () => Promise<string>
  setAngle: (angle: string) => Promise<void>
  getLogs: () => Promise<string>
  getDeviceInfo: () => Promise<unknown>
  openUIDevtools: () => Promise<void>
  openTorrentDevtools: () => Promise<void>
  checkUpdate: () => Promise<void>
  toggleDiscordDetails: (enabled: boolean) => Promise<void>
  setMediaSession: (metadata: SessionMetadata, mediaId: number) => Promise<void>
  setPositionState: (state?: MediaPositionState) => Promise<void>
  setPlayBackState: (paused: 'none' | 'paused' | 'playing') => Promise<void>
  setActionHandler: (action: MediaSessionAction | 'enterpictureinpicture', handler: MediaSessionActionHandler | null) => void
  checkAvailableSpace: (_?: unknown) => Promise<number>
  checkIncomingConnections: (port: number) => Promise<boolean>
  updatePeerCounts: (hashes: string[]) => Promise<Array<{ hash: string, complete: string, downloaded: string, incomplete: string }>>
  playTorrent: (id: string) => Promise<TorrentFile[]>
  attachments: (hash: string, id: number) => Promise<Attachment[]>
  tracks: (hash: string, id: number) => Promise<Array<{ number: string, language?: string, type: string, header?: string, name?: string }>>
  subtitles: (hash: string, id: number, cb: (subtitle: { text: string, time: number, duration: number }, trackNumber: number) => void) => Promise<void>
  errors: (cb: (error: Error) => void) => Promise<void>
  chapters: (hash: string, id: number) => Promise<Array<{ start: number, end: number, text: string }>>
  torrentStats: (hash: string) => Promise<TorrentInfo>
  torrents: () => Promise<TorrentInfo[]>
  setDOH: (dns: string) => Promise<void>
  cachedTorrents: () => Promise<string[]>
  downloadProgress: (percent: number) => Promise<void>
  updateSettings: (settings: TorrentSettings) => Promise<void>
  updateProgress: (cb: (progress: number) => void) => Promise<void>
  spawnPlayer: (url: string) => Promise<void>
  setHideToTray: (enabled: boolean) => Promise<void>
  transparency: (enabled: boolean) => Promise<void>
  setZoom: (scale: number) => Promise<void>
  isApp: boolean
  version: () => Promise<string>
  navigate: (cb: (data: { target: string, value: string | undefined }) => void) => Promise<void>
  defaultTransparency: () => boolean
}

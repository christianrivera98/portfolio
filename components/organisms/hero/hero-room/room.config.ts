export interface RoomTheme {
  wall: string
  floor: string
  desk: string
  deskLeg: string
  chair: string
  skin: string
  shirt: string
  shelf: string
  ambient: number
  lampColor: string
  lampIntensity: number
  fill: string
  fog: string
}

export const ROOM_DARK: RoomTheme = {
  wall: "#161519",
  floor: "#0d0d10",
  desk: "#2c241d",
  deskLeg: "#0f0f10",
  chair: "#1d1d23",
  skin: "#d6ad8b",
  shirt: "#212129",
  shelf: "#3f342a",
  ambient: 0.16,
  lampColor: "#ffb066",
  lampIntensity: 22,
  fill: "#8a90a0",
  fog: "#070708",
}

export const ROOM_LIGHT: RoomTheme = {
  wall: "#e7ded3",
  floor: "#c9b6a4",
  desk: "#caa97f",
  deskLeg: "#3a3a3a",
  chair: "#2a2a2e",
  skin: "#d8b290",
  shirt: "#3a3d44",
  shelf: "#b08a64",
  ambient: 0.9,
  lampColor: "#fff1da",
  lampIntensity: 10,
  fill: "#fff4e6",
  fog: "#efe8dd",
}

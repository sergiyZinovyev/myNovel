export interface GameInfo {
  name: string,
  id: number
}
export interface Game extends GameInfo{
  gameSources: GameSource[]
}

export interface GameSource {
  id: number;
  background: string;
  person?: string;
  gameDialog: GameDialog;
  sourceLinks: SourceLink[]
}

export  interface GameDialog {
  title?: Text,
  discription: Text
}

export  interface SourceLink {
  src: number,
  lable?: string
}

export interface Text {
  text: string;
  color?: string
}

export interface Game {
  name: string,
  id: number,
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

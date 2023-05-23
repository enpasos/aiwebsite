export enum Player {
  black = "black",
  white = "white"
}

export namespace Player {
  export function otherPlayer(player: Player): Player {
    return player == Player.black ? Player.white : Player.black;
  }
}

<script lang="ts">
  import { Styles } from "sveltestrap";
  import { Container } from "sveltestrap";
  import { Pieces } from "./Pieces";

  class SelectedPiece {
    previousPosition: number[];
    possibleMoves: number[][];
    piece: Pieces;
  }

  let chessBoard: Pieces[][] = [
    [Pieces.BlackRook,Pieces.BlackKnight,Pieces.BlackBishop,Pieces.BlackQueen,Pieces.BlackKing,Pieces.BlackBishop,Pieces.BlackKnight,Pieces.BlackRook],
    [Pieces.BlackPawn,Pieces.BlackPawn,Pieces.BlackPawn,Pieces.BlackPawn,Pieces.BlackPawn,Pieces.BlackPawn,Pieces.BlackPawn,Pieces.BlackPawn],
    [Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty],
    [Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty],
    [Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty],
    [Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty,Pieces.Empty],
    [Pieces.WhitePawn,Pieces.WhitePawn,Pieces.WhitePawn,Pieces.WhitePawn,Pieces.WhitePawn,Pieces.WhitePawn,Pieces.WhitePawn,Pieces.WhitePawn],
    [Pieces.WhiteRook,Pieces.WhiteKnight,Pieces.WhiteBishop,Pieces.WhiteQueen,Pieces.WhiteKing,Pieces.WhiteBishop,Pieces.WhiteKnight,Pieces.WhiteRook]
  ];

  const blackPieces: Pieces[] = [
    Pieces.BlackRook,
    Pieces.BlackKnight,
    Pieces.BlackBishop,
    Pieces.BlackQueen,
    Pieces.BlackKing,
    Pieces.BlackPawn
  ];
  const whitePieces: Pieces[] = [
    Pieces.WhiteRook,
    Pieces.WhiteKnight,
    Pieces.WhiteBishop,
    Pieces.WhiteQueen,
    Pieces.WhiteKing,
    Pieces.WhitePawn
  ];

  let isWhiteTurn = true;
  let selectedPiece: SelectedPiece = new SelectedPiece();
  selectedPiece.possibleMoves = [];

  function tileClick(i: number, j: number): void {
    if (selectedPiece.possibleMoves.some(x => x[0] === i && x[1] === j)) {
      chessBoard[i][j] = selectedPiece.piece;
      chessBoard[selectedPiece.previousPosition[0]][selectedPiece.previousPosition[1]] = Pieces.Empty;
      selectedPiece.possibleMoves = [];
      isWhiteTurn = !isWhiteTurn;
    }
    else {
      selectedPiece.possibleMoves = [];
      if (isWhiteTurn) {
        switch (chessBoard[i][j]) {
          case Pieces.WhitePawn:
            if (i === 6) {
              selectedPiece.possibleMoves.push([i - 2, j]);
            }
            if (i - 1 >= 0) {
              if (blackPieces.includes(chessBoard[i - 1][j - 1])) {
                selectedPiece.possibleMoves.push([i - 1, j - 1]);
              }
              if (blackPieces.includes(chessBoard[i - 1][j + 1])) {
                selectedPiece.possibleMoves.push([i - 1, j + 1]);
              }
              if (chessBoard[i - 1][j] === Pieces.Empty) {
                selectedPiece.possibleMoves.push([i - 1, j]);
              }
            }
            break;
          case Pieces.WhiteKnight:
            selectedPiece.possibleMoves = getPossibleKnightMoves(i, j, whitePieces);
            break;
          case Pieces.WhiteBishop:
            selectedPiece.possibleMoves = getPossibleBishopMoves(i, j, whitePieces);
            break;
          case Pieces.WhiteRook:
            selectedPiece.possibleMoves = getPossibleRookMoves(i, j, whitePieces);
            break;
          case Pieces.WhiteQueen:
            selectedPiece.possibleMoves = getPossibleBishopMoves(i, j, whitePieces).concat(getPossibleRookMoves(i, j, whitePieces));
            break;
          case Pieces.WhiteKing:
            selectedPiece.possibleMoves = getPossibleKingMoves(i, j, whitePieces);
            break;
        }
      }
      else {
        switch (chessBoard[i][j]) {
          case Pieces.BlackPawn:
            if (i === 1) {
              selectedPiece.possibleMoves.push([i + 2, j]);
            }
            if (whitePieces.includes(chessBoard[i + 1][j + 1])) {
              selectedPiece.possibleMoves.push([i + 1, j + 1]);
            }
            if (whitePieces.includes(chessBoard[i + 1][j - 1])) {
              selectedPiece.possibleMoves.push([i + 1, j - 1]);
            }
            if (chessBoard[i + 1][j] === Pieces.Empty) {
              selectedPiece.possibleMoves.push([i + 1, j]);
            }
            break;
          case Pieces.BlackKnight:
            selectedPiece.possibleMoves = getPossibleKnightMoves(i, j, blackPieces);
            break;
          case Pieces.BlackBishop:
            selectedPiece.possibleMoves = getPossibleBishopMoves(i, j, blackPieces);
            break;
          case Pieces.BlackRook:
            selectedPiece.possibleMoves = getPossibleRookMoves(i, j, blackPieces);
            break;
          case Pieces.BlackQueen:
            selectedPiece.possibleMoves = getPossibleBishopMoves(i, j, blackPieces).concat(getPossibleRookMoves(i, j, blackPieces));
            break;
          case Pieces.BlackKing:
            selectedPiece.possibleMoves = getPossibleKingMoves(i, j, blackPieces);
            break;
        }
      }

      selectedPiece.previousPosition = [i, j];
      selectedPiece.piece = chessBoard[i][j];
    }
  }

  function getPossibleKnightMoves(i: number, j: number, pieces: Pieces[]): number[][] {
    let possibleMoves: number[][] = [];
    for (let position of [[i - 2, j - 1], [i + 2, j + 1], [i - 1, j - 2], [i + 1, j + 2], [i + 2, j - 1], [i - 2, j + 1], [i - 1, j + 2], [i + 1, j - 2]]) {
      if (chessBoard[position[0]] && !pieces.includes(chessBoard[position[0]][position[1]])) {
        possibleMoves.push(position);
      }
    }
    return possibleMoves;
  }

  function getPossibleBishopMoves(i: number, j: number, pieces: Pieces[]): number[][] {
    let k = i, l = j;
    let possibleMoves: number[][] = [];

    while (--k >= 0 && --l >= 0) { // top left
      if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
        break;
      }
    }
    k = i, l = j;
    while (--k >= 0 && ++l < 8) { // top right
      if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
        break;
      }
    }

    k = i, l = j;
    while (++k < 8 && --l >= 0) { // bottom left
      if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
        break;
      }
    }
    k = i, l = j;
    while (++k < 8 && ++l < 8) { // bottom right
      if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
        break;
      }
    }
    return possibleMoves;
  }

  function getPossibleRookMoves(i: number, j: number, pieces: Pieces[]): number[][] {
    let possibleMoves: number[][] = [];

    let k = i, l = j;
    while (--k >= 0) { // up
      if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
        break;
      }
    }
    k = i, l = j;
    while (++k < 8) { // down
      if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
        break;
      }
    }

    k = i, l = j;
    while (--l >= 0) { // left
      if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
        break;
      }
    }
    k = i, l = j;
    while (++l < 8) { // right
      if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
        break;
      }
    }

    return possibleMoves;
  }

  function getPossibleKingMoves(i: number, j: number, pieces: Pieces[]): number[][] {
    let possibleMoves: number[][] = [];

    if (i - 1 >= 0) { // above row
      if (!pieces.includes(chessBoard[i - 1][j - 1])) {
        possibleMoves.push([i - 1, j - 1]);
      }
      if (!pieces.includes(chessBoard[i - 1][j])) {
        possibleMoves.push([i - 1, j]);
      }
      if (!pieces.includes(chessBoard[i - 1][j + 1])) {
        possibleMoves.push([i - 1, j - 1]);
      }
    }

    // current row
    // if () {

    // }
    if (!pieces.includes(chessBoard[i][j - 1])) {
      possibleMoves.push([i, j - 1]);
    }
    if (!pieces.includes(chessBoard[i][j + 1])) {
      possibleMoves.push([i, j + 1]);
    }

    if (i + 1 < 8) { // below row
      if (!pieces.includes(chessBoard[i + 1][j - 1])) {
        possibleMoves.push([i + 1, j - 1]);
      }
      if (!pieces.includes(chessBoard[i + 1][j])) {
        possibleMoves.push([i + 1, j]);
      }
      if (!pieces.includes(chessBoard[i + 1][j + 1])) {
        possibleMoves.push([i + 1, j + 1]);
      }
    }

    return possibleMoves;
  }

  function tryAddPossibleMove(i: number, j: number, pieces: Pieces[], possibleMoves: number[][]): boolean {
    if (!pieces.includes(chessBoard[i][j])) {
      possibleMoves.push([i, j]);
    }
    else {
      return false;
    }
    return true;
  }
</script>

<style>
  .possible-move {
    background-color: #81a7e4;
  }
</style>

<Styles />

<Container>
  <table class="chess-board">
    <tbody>
      {#each chessBoard as _, i}
        <tr>
          {#each chessBoard[i] as _, j}
            <td class={j % 2 === (i % 2 === 0 ? 0 : 1) ? 'light' : 'dark'}
              class:possible-move={selectedPiece.possibleMoves.some(x => x[0] === i && x[1] === j)}
              on:click={() => tileClick(i, j)}>
              {chessBoard[i][j]}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</Container>

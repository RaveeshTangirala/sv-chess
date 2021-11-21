<script lang="ts">
  import { Styles } from "sveltestrap";
  import { Container } from "sveltestrap";
  import Box from "./box/Box.svelte";

  enum BlackPieces {
    Rook = '♜',
    Knight = '♞',
    Bishop = '♝',
    Queen = '♛',
    King = '♚',
    Pawn = '♟︎'
  };

  enum WhitePieces {
    Rook = '♖',
    Knight = '♘',
    Bishop = '♗',
    Queen = '♕',
    King = '♔',
    Pawn = '♙'
  };

  const chessBoard = [[BlackPieces.Rook,BlackPieces.Knight,BlackPieces.Bishop,BlackPieces.Queen,BlackPieces.King,BlackPieces.Bishop,BlackPieces.Knight,BlackPieces.Rook],
                      [BlackPieces.Pawn,BlackPieces.Pawn,BlackPieces.Pawn,BlackPieces.Pawn,BlackPieces.Pawn,BlackPieces.Pawn,BlackPieces.Pawn,BlackPieces.Pawn],
                      ['','','','','','','',''],
                      ['','','','','','','',''],
                      ['','','','','','','',''],
                      ['','','','','','','',''],
                      [WhitePieces.Pawn,WhitePieces.Pawn,WhitePieces.Pawn,WhitePieces.Pawn,WhitePieces.Pawn,WhitePieces.Pawn,WhitePieces.Pawn,WhitePieces.Pawn],
                      [WhitePieces.Rook,WhitePieces.Knight,WhitePieces.Bishop,WhitePieces.Queen,WhitePieces.King,WhitePieces.Bishop,WhitePieces.Knight,WhitePieces.Rook]];

</script>

<Styles />

<Container>
  <table class="chess-board">
    <tbody>
      <tr>
        <th />
        <th>a</th>
        <th>b</th>
        <th>c</th>
        <th>d</th>
        <th>e</th>
        <th>f</th>
        <th>g</th>
        <th>h</th>
      </tr>
      {#each chessBoard as _, i}
        <tr>
          <th>{8 - i}</th>
          {#each chessBoard[i] as _, j}
            <Box className={j % 2 === (i % 2 === 0 ? 0 : 1) ? 'light' : 'dark'} piece={chessBoard[i][j]} />
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</Container>

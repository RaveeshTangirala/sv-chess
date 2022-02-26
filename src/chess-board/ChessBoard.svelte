<script lang="ts">
	import { Container } from 'sveltestrap';
	import { chessBoard } from './chess-board';
	import { Pieces } from './Pieces';
	import { SelectedPiece } from './selected-piece';

	let isWhiteTurn = true;
	SelectedPiece.possibleMoves = [];

	function tileClick(row: number, column: number): void {
		if (isValidMoveSelected(row, column)) {
			movePiece(row, column);
		} else {
			updateCurrentSelectedPiece(row, column);
		}
	}

	function isValidMoveSelected(row: number, column: number): boolean {
		return SelectedPiece.possibleMoves.some(
			(x: number[]) => x[0] === row && x[1] === column
		);
	}

	function movePiece(row: number, column: number): void {
		chessBoard[row][column] = SelectedPiece.piece;
		chessBoard[SelectedPiece.previousPosition[0]][
			SelectedPiece.previousPosition[1]
		] = Pieces.Empty;
		SelectedPiece.possibleMoves = [];
		isWhiteTurn = !isWhiteTurn;
	}

	function updateCurrentSelectedPiece(row: number, column: number): void {
		SelectedPiece.calculatePossibleMoves(isWhiteTurn, row, column);
		SelectedPiece.previousPosition = [row, column];
		SelectedPiece.piece = chessBoard[row][column];
	}
</script>

<Container>
	<table class="chess-board">
		<tbody>
			{#each chessBoard as _, row}
				<tr>
					{#each chessBoard[row] as _, column}
						<td
							class={column % 2 === (row % 2 === 0 ? 0 : 1) ? 'light' : 'dark'}
							class:possible-move={SelectedPiece.possibleMoves.some(
								(x) => x[0] === row && x[1] === column
							)}
							on:click={() => tileClick(row, column)}
						>
							{chessBoard[row][column]}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</Container>

<style>
	.possible-move {
		background-color: #81a7e4;
	}
</style>

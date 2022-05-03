<script lang="ts">
	import { Container } from 'sveltestrap';
	import { chessBoard } from './chess-board';
	import { SelectedPiece } from './selected-piece';

	let board = chessBoard;
	let possibleMoves = [];

	function tileClick(row: number, column: number): void {
		if (isValidMoveSelected(row, column)) {
			SelectedPiece.move(row, column);
			possibleMoves = [];
			board = [...chessBoard];
		} else {
			updateCurrentSelectedPiece(row, column);
		}
	}

	function isValidMoveSelected(row: number, column: number): boolean {
		return possibleMoves.some(
			(x: number[]) => x[0] === row && x[1] === column
		);
	}

	function updateCurrentSelectedPiece(row: number, column: number): void {
		possibleMoves = SelectedPiece.getPossibleMoves(row, column);
		SelectedPiece.updatePreviousPosition(row, column);
		SelectedPiece.updateCurrentPiece(chessBoard[row][column]);
	}
</script>

<Container>
	<table class="chess-board">
		<tbody>
			{#each board as _, row}
				<tr>
					{#each board[row] as _, column}
						<td
							class={column % 2 === (row % 2 === 0 ? 0 : 1) ? 'light' : 'dark'}
							class:possible-move={possibleMoves.some(
								(x) => x[0] === row && x[1] === column
							)}
							on:click={() => tileClick(row, column)}
						>
							{board[row][column]}
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

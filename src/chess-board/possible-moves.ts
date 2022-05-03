import { BlackPieces, chessBoard, WhitePieces } from './chess-board';
import { Pieces } from './Pieces';

export module Castling {
	// eslint-disable-next-line prefer-const
	export let isWhiteShortCastleAllowed = true;
	// eslint-disable-next-line prefer-const
	export let isWhiteLongCastleAllowed = true;

	// eslint-disable-next-line prefer-const
	export let isBlackShortCastleAllowed = true;
	// eslint-disable-next-line prefer-const
	export let isBlackLongCastleAllowed = true;
}

export module PossibleMoves {
	export function getWhitePawnMoves(row: number, column: number): number[][] {
		const possibleMoves: number[][] = [];
		if (row === 6) {
			possibleMoves.push([row - 2, column]);
		}
		if (row - 1 >= 0) {
			if (BlackPieces.includes(chessBoard[row - 1][column - 1])) {
				possibleMoves.push([row - 1, column - 1]);
			}
			if (BlackPieces.includes(chessBoard[row - 1][column + 1])) {
				possibleMoves.push([row - 1, column + 1]);
			}
			if (chessBoard[row - 1][column] === Pieces.Empty) {
				possibleMoves.push([row - 1, column]);
			}
		}
		return possibleMoves;
	}

	export function getBlackPawnMoves(row: number, column: number): number[][] {
		const possibleMoves: number[][] = [];
		if (row === 1) {
			possibleMoves.push([row + 2, column]);
		}
		if (WhitePieces.includes(chessBoard[row + 1][column + 1])) {
			possibleMoves.push([row + 1, column + 1]);
		}
		if (WhitePieces.includes(chessBoard[row + 1][column - 1])) {
			possibleMoves.push([row + 1, column - 1]);
		}
		if (chessBoard[row + 1][column] === Pieces.Empty) {
			possibleMoves.push([row + 1, column]);
		}
		return possibleMoves;
	}

	export function getKnightMoves(
		row: number,
		column: number,
		pieces: Pieces[]
	): number[][] {
		const possibleMoves: number[][] = [];
		for (const position of [
			[row - 2, column - 1],
			[row + 2, column + 1],
			[row - 1, column - 2],
			[row + 1, column + 2],
			[row + 2, column - 1],
			[row - 2, column + 1],
			[row - 1, column + 2],
			[row + 1, column - 2],
		]) {
			if (
				chessBoard[position[0]] &&
				!pieces.includes(chessBoard[position[0]][position[1]])
			) {
				possibleMoves.push(position);
			}
		}
		return possibleMoves;
	}

	export function getBishopMoves(
		i: number,
		j: number,
		pieces: Pieces[]
	): number[][] {
		let k = i;
		let l = j;
		const possibleMoves: number[][] = [];

		// top left
		while (--k >= 0 && --l >= 0) {
			if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
				break;
			}
		}
		(k = i), (l = j);
		// top right
		while (--k >= 0 && ++l < 8) {
			if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
				break;
			}
		}
		(k = i), (l = j);
		// bottom left
		while (++k < 8 && --l >= 0) {
			if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
				break;
			}
		}
		(k = i), (l = j);
		// bottom right
		while (++k < 8 && ++l < 8) {
			if (!tryAddPossibleMove(k, l, pieces, possibleMoves)) {
				break;
			}
		}
		return possibleMoves;
	}

	export function getRookMoves(
		row: number,
		column: number,
		pieces: Pieces[]
	): number[][] {
		const possibleMoves: number[][] = [];
		let i = row;
		let j = column;
		// up
		while (--i >= 0) {
			if (!tryAddPossibleMove(i, j, pieces, possibleMoves)) {
				break;
			}
		}
		(i = row), (j = column);
		// down
		while (++i < 8) {
			if (!tryAddPossibleMove(i, j, pieces, possibleMoves)) {
				break;
			}
		}
		(i = row), (j = column);
		// left
		while (--j >= 0) {
			if (!tryAddPossibleMove(i, j, pieces, possibleMoves)) {
				break;
			}
		}
		(i = row), (j = column);
		// right
		while (++j < 8) {
			if (!tryAddPossibleMove(i, j, pieces, possibleMoves)) {
				break;
			}
		}
		return possibleMoves;
	}

	export function getKingMoves(
		row: number,
		column: number,
		pieces: Pieces[],
		isWhiteTurn: boolean
	): number[][] {
		const possibleMoves: number[][] = [];
		const prevRow = row - 1;
		const nextRow = row + 1;
		const prevColumn = column - 1;
		const nextColumn = column + 1;

		if (prevRow >= 0) {
			if (!pieces.includes(chessBoard[prevRow][prevColumn])) {
				possibleMoves.push([prevRow, prevColumn]);
			}
			if (!pieces.includes(chessBoard[prevRow][column])) {
				possibleMoves.push([prevRow, column]);
			}
			if (!pieces.includes(chessBoard[prevRow][nextColumn])) {
				possibleMoves.push([prevRow, nextColumn]);
			}
		}

		// current row
		if (!pieces.includes(chessBoard[row][prevColumn])) {
			possibleMoves.push([row, prevColumn]);
		}
		if (!pieces.includes(chessBoard[row][nextColumn])) {
			possibleMoves.push([row, nextColumn]);
		}

		if (nextRow < 8) {
			if (!pieces.includes(chessBoard[nextRow][prevColumn])) {
				possibleMoves.push([nextRow, prevColumn]);
			}
			if (!pieces.includes(chessBoard[nextRow][column])) {
				possibleMoves.push([nextRow, column]);
			}
			if (!pieces.includes(chessBoard[nextRow][nextColumn])) {
				possibleMoves.push([nextRow, nextColumn]);
			}
		}

		// possible moves for castling
		if (isWhiteTurn) {
			if (
				Castling.isWhiteShortCastleAllowed &&
				chessBoard[row][nextColumn] === Pieces.Empty &&
				chessBoard[row][nextColumn + 1] === Pieces.Empty
			) {
				possibleMoves.push([row, nextColumn + 1]);
			}
			if (
				Castling.isWhiteLongCastleAllowed &&
				chessBoard[row][prevColumn] === Pieces.Empty &&
				chessBoard[row][prevColumn - 1] === Pieces.Empty
			) {
				possibleMoves.push([row, prevColumn - 1]);
			}
		} else {
			if (
				Castling.isBlackShortCastleAllowed &&
				chessBoard[row][nextColumn] === Pieces.Empty &&
				chessBoard[row][nextColumn + 1] === Pieces.Empty
			) {
				possibleMoves.push([row, nextColumn + 1]);
			}
			if (
				Castling.isBlackLongCastleAllowed &&
				chessBoard[row][prevColumn] === Pieces.Empty &&
				chessBoard[row][prevColumn - 1] === Pieces.Empty
			) {
				possibleMoves.push([row, prevColumn - 1]);
			}
		}
		return possibleMoves;
	}
}

function tryAddPossibleMove(
	row: number,
	column: number,
	pieces: Pieces[],
	possibleMoves: number[][]
): boolean {
	if (!pieces.includes(chessBoard[row][column])) {
		possibleMoves.push([row, column]);
	} else {
		return false;
	}
	return true;
}
